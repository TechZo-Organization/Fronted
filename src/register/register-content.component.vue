<script>
import { userApiService } from "../login/services/user-api.service.js";

export default {
  name: "register-content",
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      userService: new userApiService(),
      errorMessage: '',
    };
  },
  methods: {
    async handleRegister() {
      if (!this.validatePhone(this.phone)) {
        this.errorMessage = 'El número de celular debe tener 9 dígitos';
        return;
      }

      if (!this.validatePassword(this.password)) {
        this.errorMessage = 'La contraseña debe incluir al menos 2 números, un carácter especial y una letra mayúscula';
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
        return;
      }

      try {
        const response = await this.userService.getUser();
        const users = response.data;
        const newUser = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          password: this.password,
          membership: "1",
          membership_date: '',
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6lqpQj3oAmc1gtyM78oJCbTaDrD7Fj9NRlceOPDZiHA&s",
          id: (users.length + 1).toString(),
          favorites: []
        };

        await this.userService.registerUser(newUser);
        this.$router.push('/log-in');
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Error al registrar el usuario';
      }
    },
    validatePhone(phone) {
      const phoneRegex = /^\d{9}$/;
      return phoneRegex.test(phone);
    },
    validatePassword(password) {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*\d.*\d).{8,}$/;
      return passwordRegex.test(password);
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
    <div class="login-content">
      <div class="login-form">
        <form @submit.prevent="handleRegister" class="form-container">
          <br>
          <img src="../../public/login/cambiazo-logo.png" height="95" width="250"/>
          <div class="inputs-register">
            <h1 style="font-size: 20px; font-weight: bolder; margin-bottom: 15px;">Registrarse</h1>
            <router-link to="/home">
              <pv-button class="b-register-google">
                <img src="../../public/login/google-icon.png" alt="Google image" width="18px" style="margin-right: 5px;">Registrarse con Google
              </pv-button>
            </router-link>
            <div class="hr-container">
              <hr class="hr-line">
              <h1>o registrarse con correo</h1>
              <hr class="hr-line">
            </div>
            <div class="input-content">
              <div>
                <label><b>Nombre</b></label><br>
                <pv-input v-model="name" required class="input" type="text"></pv-input>
              </div>
              <div>
                <label><b>Correo electrónico</b></label><br>
                <pv-input v-model="email" required class="input" type="text"></pv-input>
              </div>
              <div>
                <label><b>Número de celular</b></label><br>
                <pv-input v-model="phone" required class="input" type="text"></pv-input>
              </div>
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
              <div class="checkbox-terms">
                <label for="terms&conditions"><input id="terms&conditions" type="checkbox" required> Aceptar <span style="color:#ffd146;">terminos y condiciones</span></label>
              </div>
              <pv-button type="submit" class="submit">Registrarse</pv-button>
              <router-link to="/log-in">
                <pv-button class="create-account">¿Ya tienes una cuenta? <span style="color:#ffd146; margin-left: 10px;">Inicia sesión</span></pv-button>
              </router-link>
              <br>
            </div>
          </div>
        </form>
      </div>
      <img src="../../public/login/background-register-image.png" class="main-image-register"/>
    </div>
    <footer>
      <p>&copy TechZo 2024. All Rights Reserved</p>
      <div class="footer-links">
        <a href="">Condiciones de Uso</a>
        <a href="">Política de privacidad</a>
      </div>
    </footer>
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
  width: 55%;
  margin: auto;
  height: 100%
}

.main-image-register{
  width: 45%;
  height: 132vh;
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

  .footer-links{
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

}
</style>