<template>
  <div class="login-container">
    <div style="margin: 1rem; position: absolute;">
      <router-link to="/log-in">
        <pv-button class="button-return">
          <img src="../../public/membership-payment/return-icon.png" height="25" width="25"/>
        </pv-button>
      </router-link>
    </div>
    <div class="login-content">
      <div class="login-form">
        <form @submit.prevent="handleLogin" class="form-container">
          <img src="../../public/login/cambiazo-logo.png" height="50%"/>
          <div class="inputs-login">
            <h1 style="font-size: 25px; font-weight: 1000px; margin-bottom: 15px; text-align: center;">¿Has olvidado tu contraseña?</h1>
            <p style="font-size: 14px; font-weight: 1000px; margin-bottom: 15px">Ingrese la dirección de correo electrónico que utilizó cuando se registró y le enviaremos un código de verificación de 4 dígitos para restablecer su contraseña.</p>
            <div class="input-content">
              <div>
                <label><b>Correo electrónico</b></label><br>
                <pv-input v-model="email" required class="input i-login" type="text"/>
                <p v-if="emailError" class="error-message">{{ emailError }}</p>
              </div>
              <div style="margin-top: 1.5rem">
                <pv-button type="submit" class="submit" :disabled="!!emailError">Enviar</pv-button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <img src="../../public/login/background-image.png" class="main-image"/>
    </div>
    <footer>
      <p>&copy TechZo 2024. All Rights Reserved</p>
      <div class="footer-links">
        <a href="/terms-use">Condiciones de Uso</a>
        <a href="/privacy-policies">Política de privacidad</a>
      </div>
    </footer>
    <dialog-validate-code
        :visible="showDialog"
        @close="showDialog = false"
        @validate="handleCodeValidation"
        :error-message="errorMessage"
    />
  </div>
</template>

<script>
import { userApiService } from "../login/services/user-api.service.js";
import emailjs from "emailjs-com";
import DialogValidateCode from "./components/dialog-validate-code.component.vue";

export default {
  name: "verify-email",
  components: {
    DialogValidateCode
  },
  data() {
    return {
      email: '',
      emailError: '',
      userService: new userApiService(),
      users: [],
      showError: false,
      showDialog: false,
      verificationCode: '',
      errorMessage: '',
      userId: ''
    };
  },
  async created() {
    emailjs.init('rl49lxhRhnbFkQ0Ol');
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await this.userService.getUser();
        this.users = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    validateEmail() {
      const user = this.users.find(u => u.email === this.email);
      if (!user) {
        this.emailError = 'Correo inválido';
        return false;
      } else {
        this.emailError = '';
        this.userId = user.id;
        return true;
      }
    },
    generateVerificationCode() {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      return code;
    },
    async sendEmail(verificationCode) {
      const user = this.users.find(u => u.email === this.email);
      const templateParams = {
        name: user.name,
        verification_code: verificationCode,
        email: user.email,
      };
      try {
        await emailjs.send('service_mwkwbme', 'template_kjdnrui', templateParams);
      } catch (error) {
        console.error(error);
      }
    },
    async handleLogin() {
      if (this.validateEmail()) {
        this.verificationCode = this.generateVerificationCode();
        await this.sendEmail(this.verificationCode);
        this.showDialog = true;
      } else {
      }
    },
    handleCodeValidation(enteredCode) {
      if (enteredCode === this.verificationCode) {
        localStorage.setItem('id-temporal', this.userId);
        this.$router.push('/change-password');
        this.showDialog = false;
      } else {
        this.errorMessage = 'Código incorrecto';
      }
    }
  },
  watch: {
    email(newEmail) {
      this.validateEmail();
    }
  }
};
</script>

<style>
.button-return {
  background-color: #FFD146;
  border-radius: 10px;
  padding: 2px 2px;
  transition: 0.43s;
  border: 4px solid #FFD146;
}

.error-message {
  color: red;
}

.submit:disabled {
  background-color: grey;
  cursor: not-allowed;
}
</style>
