<script>
import { membershipsApiService } from "../../memberships/services/membership-api.service.js";
import { userApiService } from "../../login/services/user-api.service.js";
import DialogPayMembership from "./dialog-pay-membership.component.vue";

export default {
  name: "membership-payment",
  components: {DialogPayMembership},
  data() {
    return {
      membership: null,
      errors: [],
      membershipsApi: new membershipsApiService(),
      userService: new userApiService(),
      userData: {
        name: '',
        email: '',
        phone: '',
        photo: '',
        membershipId: 1,
      },
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      showDialog: false
    };
  },
  created() {
    this.getMembership();
  },
  methods: {
    getMembership() {
      const membershipId = this.$route.params.id;
      this.membershipsApi.getMemberships()
          .then((response) => {
            this.membership = response.data.find(m => m.id.toString() === membershipId);
            if (!this.membership) {
              this.errors.push("Membresía no encontrada");
            }
          })
          .catch((error) => {
            this.errors.push(error);
          });
    },
    async fetchUserData() {
      try {
        const response = await this.userService.getUser();
        const userId = localStorage.getItem('user');
        const user = response.data.find(user => Number(user.id) === Number(userId));
        this.userData = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          photo: user.photo,
          membershipId: user.membershipId,
        };
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    async submitForm() {
      if (this.validateForm()) {
        try {
          const userId = localStorage.getItem('user');
          this.showDialog = true;
          document.body.classList.add('no-scroll');
          const newMembership = {
            name: this.userData.name,
            email:this.userData.email,
            phone: this.userData.phone,
            photo: this.userData.photo,
            membershipId: Number(this.membership.id),
          }
          console.log(newMembership)
          await this.userService.updateUser(Number(userId), newMembership);
        } catch (error) {
          console.error('Error actualizando la membresía del usuario:', error);
        }
      }
    },
    validateForm() {
      this.errors = [];
      if (!this.cardNumber || this.cardNumber.length !== 16) {
        this.errors.push('Número de tarjeta inválido');
      }
      if (!this.expiryMonth || !this.expiryYear || this.expiryMonth.length !== 2 || this.expiryYear.length !== 2) {
        this.errors.push('Fecha de expiración inválida');
      }
      if (!this.cvv || this.cvv.length !== 3) {
        this.errors.push('CVV inválido');
      }
      return this.errors.length === 0;
    },
  },
  async mounted() {
    await this.fetchUserData();
  }
};
</script>

<template>
  <div class="membership-payment-content">
    <div class="memberships-container">
      <div class="payment-gateway">
        <h1>Información de la Tarjeta</h1>
        <form class="payment-form" @submit.prevent="submitForm">
          <div style="overflow: auto;">
            <img src="../../../public/membership-payment/cards-icon.png" height="60" width="130" style="float: right;"/>
          </div>
          <div>
            <label><b>Número de tarjeta</b></label><br>
            <pv-input required v-model="cardNumber" placeholder="XXXX-XXXX-XXXX-XXXX" class="input payment-input" type="text" maxlength="16"></pv-input>
          </div>
          <div>
            <label><b>Nombre</b></label><br>
            <pv-input required class="input payment-input" type="text" v-model="userData.name" disabled></pv-input>
          </div>
          <div style="display: flex; justify-content: space-between">
            <div>
              <label><b>Valido hasta</b></label><br>
              <div style="display: flex; align-items: center; gap: 0.2rem;">
                <pv-input required v-model="expiryMonth" placeholder="--" class="input payment-input confidential-input" type="text" maxlength="2"></pv-input>
                <label><b>/</b></label>
                <pv-input required v-model="expiryYear" placeholder="--" class="input payment-input confidential-input" type="text" maxlength="2"></pv-input>
              </div>
            </div>
            <div style="padding-bottom: 1rem;">
              <label><b>CVV</b></label><br>
              <pv-input required v-model="cvv" placeholder="XXX" class="input payment-input confidential-input" type="password" maxlength="3"></pv-input>
            </div>
          </div>
          <div v-if="errors.length">
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </div>
        </form>
      </div>
      <div class="membership-data">
        <div class="img-container">
          <img src="../../../public/logo/cambiazo-logo-2.png"/>
        </div>
        <div class="details">
          <h1>Datos de Facturación</h1>
          <div style="display: flex; gap: 0.5rem; ">
            <h3>Nombre: </h3>
            <p>{{userData.name}}</p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <h3>Correo Electrónico: </h3>
            <p>{{userData.email}}</p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <h3>Número Telefónico </h3>
            <p>{{userData.phone}}</p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <h3>Membresía: </h3>
            <p>{{ membership ? membership.name : '' }}</p>
          </div>
          <div style="display: flex; gap: 0.5rem; padding-bottom: 1rem;">
            <h3>A pagar: </h3>
            <p>${{ membership ? membership.price : '' }}</p>
          </div>
          <div class="submit-form-container">
            <pv-button type="submit" @click="submitForm" class="submit b-publish">Pagar</pv-button>
          </div>
        </div>
      </div>
    </div>
    <dialog-pay-membership :visible="showDialog"></dialog-pay-membership>
  </div>
</template>

<style scoped>

.membership-payment-content {
  padding: 4rem 6rem 2rem 6rem;
}

.memberships-container {
  display: flex;
  gap: 1rem;
}

.payment-gateway {
  width: 50%;
}

.payment-gateway h1 {
  font-size: 23px;
  font-weight: bolder;
  padding-bottom: 1rem;
}

.payment-form {
  border: 1px solid #ccc;
  border-radius: 30px;
  box-shadow: 0px 0px 20px 0px #c6c6c6;
  padding: 1.5rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-form label {
  color: #a3a0a0;
}

.payment-input {
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-radius: 0px;
  color: #a3a0a0;
}

.confidential-input {
  width: 50px;
}

.membership-data {
  width: 50%;

}

.img-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.membership-data img{
  width: 65%;
}

.details{
  padding: 2rem;
}

.details h1{
  font-size: 20px;
  font-weight: bolder;
  padding-bottom: 1rem;
}

.details h3{
  font-size: 15px;
  font-weight: bolder;
  padding-bottom: 1rem;
}

@media only screen and (max-width: 900px) {
  .membership-payment-content{
    padding: 4rem 1rem 1rem 1rem;
  }
  .memberships-container{
    flex-direction: column;
  }
  .payment-gateway{
    width: 100%;
  }
  .membership-data{
    width: 100%;
  }
}

</style>