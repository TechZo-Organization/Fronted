<template>
  <div class="profile-content">
    <div style="margin: 2rem;position:absolute; z-index: 10;">
      <router-link to="/profile">
        <pv-button class="button-return">
          <img src="../../../public/membership-payment/return-icon.png" height="25" width="25"/>
        </pv-button>
      </router-link>
    </div>
    <div class="background-profile">
      <img src="../../../public/profile/profile-background.png" class="background-image" />
      <div class="user-info" v-if="user">
        <img :src="user.img" alt="User Image" class="user-image" />
        <div class="user-options">
          <h1 class="user-name">{{ user.name }}</h1>
        </div>
      </div>
    </div>
  </div>
  <div style="background-color: #F8F7F4">
    <div class="edit-title">
      <p>Configuración de Perfil:</p>
    </div>
    <div class="edit-profile-content">
      <div class="line-text">
        <div class="line"></div>
      </div>
      <div class="edit-profile-container">
        <div class="container-edit-profile">
          <div class="content-edit">
            <div class="boxB col1">
              <form @submit.prevent="updateProfile" class="form-container-edit-profile">
                <div class="form-outline mb-4">
                  <label><b>Nombre</b></label>
                  <pv-input v-model="editProfileForm.name" required class="mat-input-element-edit-profile" type="text"></pv-input>
                  <div v-if="submitted && !editProfileForm.name" class="required">Nombre es requerido.</div>
                </div>

                <div class="form-outline mb-4">
                  <label><b>Correo electrónico</b></label>
                  <pv-input v-model="editProfileForm.email" required class="mat-input-element-edit-profile" type="email"></pv-input>
                  <div v-if="submitted && !editProfileForm.email" class="required">Correo electrónico es requerido.</div>
                  <div v-if="submitted && !isValidEmail(editProfileForm.email)" class="required">Por favor, introduce un correo electrónico válido.</div>
                </div>

                <div class="form-outline mb-4">
                  <label><b>Teléfono</b></label>
                  <pv-input v-model="editProfileForm.phone" required class="mat-input-element-edit-profile" type="tel" maxlength="9"></pv-input>
                  <div v-if="submitted && !editProfileForm.phone" class="required">Teléfono es requerido.</div>
                  <div v-if="submitted && !isValidPhone(editProfileForm.phone)" class="required">Ingrese un teléfono válido.</div>
                </div>

                <pv-button type="submit" class="button-save-changes">
                  <div class="save-changes">
                    <span>
                      Guardar Cambios
                    </span>
                  </div>
                </pv-button>
                <div style="padding-top:1rem;">
                  <pv-button type="button" @click="forgotPassword" class="button-change-password">
                    <div class="change-password">
                    <span>
                      Olvidé mi contraseña
                    </span>
                    </div>
                  </pv-button>
                </div>
              </form>
            </div>

            <div class="boxB col2">
              <pv-button type="button" @click="logout" class="button-close-session">
                <div class="close-session">
                  <i class="pi pi-sign-out"></i>
                  <span>Cerrar Sesión</span>
                </div>
              </pv-button>
              <div v-if="membership && membership.name" class="card-container">
                <div class="card-membership-profile">
                  <div class="card-membership-profile-header">
                    <h1 class="card-membership-profile-title">Mi suscripción</h1>
                  </div>
                  <div class="card-membership-profile-content">
                    <div class="card-membership-profile-subtitle">
                      <p class="card-membership-profile-membership-name">{{ membership.name }}</p>
                      <p class="card-membership-profile-membership-price" v-if="membership.price === 0">GRATIS</p>
                      <p v-else class="card-membership-profile-membership-price">${{ membership.price }}<span class="info-price">c/mes</span></p>
                      <p class="card-membership-profile-membership-date" v-if="membership.price !== 0">Tu plan se renueva el {{ user.membership_date }}</p>
                    </div>
                  </div>
                  <div v-if="membership.price !== 0" class="card-membership-profile-footer">
                    <button type="button" @click="cancelMembership" class="cancel-membership">
                      <div class="delete-account">
                        <span>Anular Suscripción</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <pv-button type="button" @click="deleteAccount" class="button-delete-account">
                <div class="delete-account">
                  <i class="pi pi-trash"></i>
                  <span>Eliminar mi Cuenta</span>
                </div>
              </pv-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <dialog-delete-account
        :visible="dialogVisibleDeleteAccount"
        @close="dialogVisibleDeleteAccount = false"
        @confirm="confirmDeleteAccount"
    />
    <dialog-cancel-membership
        :visible="dialogVisibleCancelMembership"
        @close="dialogVisibleCancelMembership = false"
        @confirm="confirmCancelMembership"
    />
    <dialog-change-succesfully :visible="showSuccessDialog" @close="closeSuccessDialog" />
  </div>
</template>

<script>
import { userApiService } from "../services/user-api.service.js";
import { membershipsApiService } from "../../memberships/services/membership-api.service.js";
import DialogDeleteAccount from "./dialog-delete-account.component.vue";
import DialogCancelMembership from "./dialog-cancel-membership.component.vue";
import DialogChangeSuccesfully from "./dialog-change-succesfully.vue";

export default {
  name: "edit-profile",
  components: {DialogChangeSuccesfully, DialogCancelMembership, DialogDeleteAccount },
  data() {
    return {
      user: null,
      membershipService: new membershipsApiService(),
      userService: new userApiService(),
      userId: null,
      membership: {},
      dialogVisibleDeleteAccount: false,
      dialogVisibleCancelMembership: false,
      showSuccessDialog: false,
      editProfileForm: {
        name: '',
        email: '',
        phone: ''
      },
      submitted: false
    };
  },
  async mounted() {
    this.userId = this.getUserIdFromLocalStorage();
    if (this.userId) {
      await this.fetchUserData();
    } else {
      console.error('User ID not found in local storage');
    }
  },
  methods: {
    getUserIdFromLocalStorage() {
      return localStorage.getItem('user');
    },
    async fetchUserData() {
      try {
        const response = await this.userService.getUserById(this.userId);
        this.user = response.data;
        if (this.user) {
          this.editProfileForm = {
            name: this.user.name,
            email: this.user.email,
            phone: this.user.phone
          };
          if (this.user.membership) {
            await this.getMembership();
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    closeSuccessDialog() {
      this.showSuccessDialog = false;
    },
    async getMembership() {
      try {
        const response = await this.membershipService.getMembershipsById(this.user.membership);
        this.membership = response.data;
      } catch (error) {
        console.error('Error fetching membership:', error);
      }
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    isValidPhone(phone) {
      const phoneRegex = /^\d{9}$/;
      return phoneRegex.test(phone);
    },
    async updateProfile() {
      this.submitted = true;
      if (this.editProfileForm.name && this.isValidEmail(this.editProfileForm.email) && this.isValidPhone(this.editProfileForm.phone)) {
        try {
          const updatedUser = {
            ...this.user,
            ...this.editProfileForm
          };
          await this.userService.putUser(this.userId, updatedUser);
          this.user = updatedUser;
          this.showSuccessDialog = true; // Set flag to show success dialog
        } catch (error) {
          console.error('Error updating profile:', error);
        }
      }
    },
    forgotPassword() {
      localStorage.removeItem('user');
      this.$router.push('/verify-email').then(() => {
        window.location.reload();
      });
    },
    cancelMembership() {
      this.dialogVisibleCancelMembership = true;
    },
    confirmCancelMembership() {
      this.userService.changeMembership(this.userId, 1).then(() => {
        window.location.reload();
      }).catch(error => {
        console.error('Error canceling membership:', error);
      });
    },
    logout() {
      localStorage.removeItem('user');
      this.user = null;
      this.$router.push('/log-in');
    },
    deleteAccount() {
      this.dialogVisibleDeleteAccount = true;
    },
    confirmDeleteAccount() {
      this.userService.deleteUser(this.userId).then(() => {
        localStorage.removeItem('user');
        this.$router.push('/log-in').then(() => {
          window.location.reload();
        });
      }).catch(error => {
        console.error('Error deleting account:', error);
      });
    },
  }
};
</script>


<style>
.edit-title{
  font-size: 1.5rem;
  line-height: 1.25;
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  padding-top: 4rem;
  padding-left: 3rem;
  padding-bottom: 1rem;
}
.line-text{
  display: flex;
  align-items: center;
  align-content: center;
}
.line {
  margin-bottom: 0.5rem;
  flex: 1;
  height: 1px;
  background-color: #C2C2C2;
  margin-left: 3rem;
  margin-right: 3rem;
}


.user-name{
  max-width: 300px;
  text-align: center;
}

.edit-profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
}
.container-edit-profile{
  max-width: 1100px;
  width: 100%;
}
.edit-profile-title p{
  padding-bottom: 10px;
}
.content-edit {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
}

.boxB {
  flex: 1;
  min-width: 250px;
}

.col1 {
  order: 1;
}

.col2 {
  order: 2;
}

.form-container-edit-profile {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.mat-input-element-edit-profile{
  border: 1px solid #C2C2C2;
  width: 100%;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
  padding: 10px 1.5% 10px 1.5%;
  margin: 5px 0 5px 0;
}
.mat-input-element-edit-profile:focus{
  outline: none;
  border: 1px solid #FFD146;
}
.required{
  color: rgb(255, 0, 0);
  position:absolute;
}

.button-save-changes{
  background-color: #FFD146;
  width: 100%;
  padding: 6px;
  font-size: 16px;
  font-weight:bold;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-save-changes:hover{
  cursor: pointer;
  background-color: #000000;
}
.button-save-changes:hover span{
  color:white;
}
.button-change-password{
  background-color: #000000;
  width: 100%;
  padding: 6px;
  font-size: 16px;
  font-weight:bold;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-change-password span{
  color: #FFD146;
}
.button-change-password:hover{
  cursor: pointer;
  background-color: #000000;
}
.button-change-password:hover span{
  color:white;
}
.close-session,
.delete-account
{
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.button-close-session {
  background-color: transparent;
  border: solid 3px #000000;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-close-session:hover {
  background-color: #000000;
  color: #ffffff;
  border: solid 3px #000000;
}

.close-session i {
  margin-right: 20px;
}
.delete-account i{
  margin-right: 20px;
}

.button-delete-account,
.cancel-membership{
  background-color: transparent;
  border: solid 3px #ff0000;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cancel-membership{
  font-size: 16px;
}

.delete-account span,
.delete-account i {
  color: #ff0000;
}

.button-delete-account:hover,
.cancel-membership:hover{
  background-color: #ff0000;
  color: #ffffff;
  border: solid 3px #ff0000;
  .delete-account span,
  .delete-account i {
    color: #ffffff;
  }
}



.card-membership-profile {
  background: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  padding: 20px;
  border-radius:10px;
  box-shadow: 0 0 4px #cccccc;
}

.card-membership-profile-title {
  color: #FFD146;
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 15px;
}
.card-membership-profile-content{
  text-align: center;
}
.card-membership-profile-membership-name,
.card-membership-profile-membership-price{
  color: #000000;
  font-weight: bold;
  margin: 10px 0 10px 0;
}
.card-membership-profile-membership-name{
  font-size: 25px;
}
.card-membership-profile-membership-price {
  font-size: 30px;
}
.info-price,
.card-membership-profile-membership-date {
  margin: 10px 0 10px 0;
  font-size: 18px;
  font-weight:bold;
  color: #000000;
}

.button-edit-profile-image{
  all: initial;
  right: 10%;
  top: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  width:1.5rem;
  height: 2rem;
  position: absolute;
  padding:0 1rem;
  margin:0;
  background-color: #FFD146;
  border-radius: 7px;
}
.button-edit-profile-image mat-icon{
  margin:0;
}

@media (max-width: 450px) {
  .content-edit {
    flex-direction: column;
    align-items: center;
  }

  .mat-card-content{
    margin-left: 0;
  }
  .col1, .col2 {
    width: 100%;
    order: unset;
  }
  .delete-account mat-icon{
    margin-right: 10px;
  }
}

@media (max-width: 768px) {
  .container-profile{
    width: 100%;
    text-align: center;
  }

  .container-avatar {
    height: 8rem;
    width: 8rem;
  }

  h1{
    font-size: 1.5rem;
    padding-top: 1rem;
  }

  mat-card{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .mat-mdc-card-content:last-child{
    margin-left: 0;
  }

  .button-edit-profile-image{
    width: 1rem;
    height: 1.5rem;
  }
  .button{
    width: 100%;
  }
}

</style>

