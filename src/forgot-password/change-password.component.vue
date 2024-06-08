<script>
import { userApiService } from "../profile/services/user-api.service.js";
import DialogChangePasswordSuccesfully from "./components/dialog-change-password-succesfully.component.vue";

export default {
  name: "change-password",
  components: {DialogChangePasswordSuccesfully},
  data() {
    return {
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      userService: new userApiService(),
      errorMessage: '',
      showDialog: false
    };
  },
  methods: {
    handleChangePassword() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
      }

      this.errorMessage = '';

      const userId = localStorage.getItem('id-temporal');
      this.userService.changePassword(userId, this.password)
          .then(() => {
            this.showDialog = true;
            this.password = '';
            this.confirmPassword = '';
            localStorage.removeItem('id-temporal');
          })
          .catch((error) => {
            this.errorMessage = 'Error al cambiar la contraseña';
          });
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
};
</script>

<template>
  <div class="login-container">
    <div style="margin: 1rem;position:absolute;">
      <router-link to="/home">
        <img src="../../public/login/home-icon.png" height="45" width="45" />
      </router-link>
    </div>
    <div class="login-content">
      <div class="login-form">
        <form @submit.prevent="handleChangePassword" class="form-container">
          <br>
          <img src="../../public/login/cambiazo-logo.png" height="50%"/>
          <div class="inputs-register">
            <h1 style="font-size: 25px; font-weight: 1000px; margin-bottom: 15px;">Cambiar Contraseña</h1>

            <div class="input-content">
              <div>
                <label><b>Contraseña</b></label><br>
                <div class="input-group">
                  <pv-input v-model="password" required class="show-hide-text" :type="showPassword ? 'text' : 'password'"></pv-input>
                  <div class="show-hide">
                    <img :src="showPassword ? '../../public/login/show-icon.png' : '../../public/login/hide-icon.png'" @click="togglePasswordVisibility" class="show-hide-password"/>
                  </div>
                </div>
              </div>
              <div>
                <label><b>Repetir contraseña</b></label><br>
                <div class="input-group">
                  <pv-input v-model="confirmPassword" required class="show-hide-text" :type="showConfirmPassword ? 'text' : 'password'"></pv-input>
                  <div class="show-hide">
                    <img :src="showConfirmPassword ? '../../public/login/show-icon.png' : '../../public/login/hide-icon.png'" @click="toggleConfirmPasswordVisibility" class="show-hide-password"/>
                  </div>
                </div>
              </div>
              <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
              <pv-button type="submit" class="submit">Cambiar</pv-button>
              <br>
            </div>
          </div>
        </form>
      </div>
      <img src="../../public/login/background-register-image.png" class="main-image-change-password"/>
    </div>
    <footer>
      <p>&copy TechZo 2024. All Rights Reserved</p>
      <div class="footer-links">
        <a href="/terms-use">Condiciones de Uso</a>
        <a href="/privacy-policies">Política de privacidad</a>
      </div>
    </footer>
    <dialog-change-password-succesfully :visible="showDialog" @close="showDialog = false" />

  </div>
</template>


<style>

.show-hide{
  padding: 0.43rem;
  background-color: #FFD146;
  border-radius: 0px 5px 5px 0px;
}

.show-hide-password{
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.show-hide-text{
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px 0px 0px 5px;
  padding: 0.25rem;
}

.show-hide-text:focus{
  outline: none;
}

.show-hide-text:focus{
  border: 1px solid #FFD146;
}

.login-container{
  width:100%;
  height: 100%;
}

.login-content{
  width:100%;
  display: flex;
}

.login-form{
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: auto;
  height: 100%
}

.main-image-change-password{
  width: 50%;
  height: 100vh;
}

footer{
  font-family: 'JetBrains Mono', monospace;
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: black;
  color: #FFD146;
  font-size: 1em;
}

.footer-links{
  display: flex;
  gap: 60px;
  color: white;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}

.inputs-register{
  width: 60%;
  margin: 1rem;
}

.b-register-google{
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0.35rem;
  justify-content: center;
  font-weight: bolder;
  width: 100%;
  transition: 0.43s;
}

.b-register-google:hover{
  border: 1px solid #ffd146;
  color: #ffd146;
}


.hr-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.hr-container h1{
  color: #ccc;
  text-align:center;
}

.hr-line {
  flex-grow: 1;
  margin: 0 10px;
}

.input{
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.25rem;
}

.checkbox-terms{
  align-items: center;
  padding-top: 7px;
  padding-bottom: 7px;
}

.submit{
  width: 100%;
  background-color: #ffd146;
  font-weight: bold;
  padding: 0.25rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: 0.43s;
  justify-content: center;
  border-radius: 20px;
}

.submit:hover{
  background-color: #000;
  color: #ffd146;
}

.input:focus{
  outline: none;
}

.create-account{
  width: 100%;
  justify-content: center;
  padding-top: 1rem;
}

.input-group{
  display: flex;
  align-items: center;
}

@media (max-width: 960px){

  .form-container {
    padding-top: 4rem;
  }

  .main-image-register{
    display: none;
  }

  .login-form{
    width: 100%;
    padding-bottom: 3rem;
  }

  footer{
    padding: 10px 0;
    height: auto;
    flex-direction: column-reverse;
    gap: 20px;
    text-align: center;
  }
  .create-account{
    display: flex;
    flex-direction:column;
  }

  .footer-links{
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

}
</style>