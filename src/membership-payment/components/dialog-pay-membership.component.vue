<script>
import { membershipsApiService } from "../../memberships/services/membership-api.service.js";

export default {
  name: "dialog-pay-membership",
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data(){
    return{
      membership: null,
      errors: [],
      membershipsApi: new membershipsApiService(),
    }
  },
  created() {
    this.getMembership();
  },
  methods: {
    handleClick() {
      this.$emit('close');
      document.body.classList.remove('no-scroll');
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    scrollToTopAndHandle(){
      this.scrollToTop();
      this.handleClick();
    },
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
  }
}
</script>

<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog">
      <div class="dialog-container">
        <h1>¡Pago exitoso!</h1>
        <p>
          Muchas gracias por ser ahora miembro {{membership.name.toUpperCase()}} de CambiaZo, disfruta de los beneficios.
        </p>
        <div style="display: grid;">
          <router-link to="/profile" @click.native="scrollToTopAndHandle" >
            <pv-button class="b-login-dialog"><b>Confirmar</b></pv-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.dialog {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 100%;
  margin: 1rem;
}

.dialog-container {
  padding: 1rem;
  text-align: center;
}

.dialog-container h1 {
  font-size: 30px;
  font-weight: bolder;
  padding-bottom: 1rem;
}

.dialog-container p {
  font-size: 20px;
  padding-bottom: 2rem;
}

.b-login-dialog {
  background-color: #FFD146;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  width: 200px;
  color: #000;
  transition: 0.43s;
  justify-content: center;
  margin-bottom: 1rem;
}

.b-login-dialog:hover {
  background-color: #000;
  color: #FFD146;
}

.b-register-dialog {
  background-color: #fff;
  border: 4px solid #FFD146;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  width: 200px;
  color: #000;
  transition: 0.43s;
  justify-content: center;
}

.b-register-dialog:hover {
  color: #FFD146;
}
</style>