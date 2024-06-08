<script>
import { userApiService } from './services/user-api.service.js';

export default {
  name: "login-content",
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      showPassword: false,
      userService: new userApiService(),
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleLogin() {
      this.emailError = '';
      this.passwordError = '';

      try {
        const response = await this.userService.getUser();
        const users = response.data;
        const user = users.find(u => u.email === this.email);

        if (user && user.password === this.password) {
          localStorage.setItem('user', user.id);
          this.$router.push('/home');
          this.$emit('userLoggedIn', user);
        } else {
          if (!user) {
            this.emailError = 'Correo inválido';
          } else if (user.password !== this.password) {
            this.passwordError = 'Contraseña inválida';
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
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
        <form @submit.prevent="handleLogin" class="form-container">
          <img src="../../public/login/cambiazo-logo.png"  height="50%" />
          <div class="inputs-login">
            <h1 style="font-size: 25px; font-weight: 1000px; margin-bottom: 15px;">Iniciar Sesión</h1>
            <router-link to="/home">
              <pv-button class="b-login-google">
                <img src="../../public/login/google-icon.png" alt="Google image" width="18px" style="margin-right: 5px;">Iniciar Sesión con Google
              </pv-button>
            </router-link>
            <div class="hr-container">
              <hr class="hr-line">
              <h1>o inicia sesión con correo</h1>
              <hr class="hr-line">
            </div>
            <div class="input-content">
              <div>
                <label><b>Correo</b></label><br>
                <pv-input v-model="email" required class="input i-login" type="text" />
                <p v-if="emailError" class="error-message">{{ emailError }}</p>
              </div>
              <div>
                <label style="justify-content: space-between; display: flex;"><b>Contraseña</b>
                  <router-link to="/verify-email"><pv-button style="color: #ffd146;font-size:14px;font-weight:bold">¿Olvidaste tu contraseña?</pv-button></router-link>
                </label>
                <div class="input-group">
                  <pv-input v-model="password" required class="show-hide-text" :type="showPassword ? 'text' : 'password'"></pv-input>
                  <div class="show-hide">
                    <img :src="showPassword ? '../../public/login/show-icon.png' : '../../public/login/hide-icon.png'" @click="togglePasswordVisibility" class="show-hide-password"/>
                  </div>
                </div>
                <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
              </div>
              <div style="margin-top: 1.5rem">
                <pv-button type="submit" class="submit">Iniciar sesión</pv-button>
                <router-link to="/register">
                  <pv-button class="create-account">¿No tienes una cuenta? <span style="color:#ffd146; margin-left: 10px;">Crea tu cuenta</span></pv-button>
                </router-link>
              </div>
            </div>
          </div>
        </form>
      </div>
      <img src="../../public/login/background-image.png" class="main-image" />
    </div>
    <footer>
      <p>&copy TechZo 2024. All Rights Reserved</p>
      <div class="footer-links">
        <a href="/terms-use">Condiciones de Uso</a>
        <a href="/privacy-policies">Política de privacidad</a>
      </div>
    </footer>
  </div>
</template>

<style>
.login-container {
  width: 100%;
  height: 100%;
}

.login-content {
  width: 100%;
  display: flex;
}

.login-form {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: auto;
  height: 100%
}

.main-image {
  width: 50%;
  height: 100vh;
  object-fit: cover;
}
footer {
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

.footer-links {
  display: flex;
  gap: 60px;
  color: white;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inputs-login {
  width: 60%;
  margin: 1rem;
}

.b-login-google {
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 0.35rem;
  justify-content: center;
  font-weight: bolder;
  width: 100%;
  transition: 0.43s;
}

.b-login-google:hover {
  border: 1px solid #ffd146;
  color: #ffd146;
}

.hr-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.hr-container h1 {
  color: #ccc;
}

.hr-line {
  flex-grow: 1;
  margin: 0 10px;
}

.input {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0.25rem;
}

.input:focus {
  border: 1px solid #FFD146;
}

.submit {
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

.submit:hover {
  background-color: #000;
  color: #ffd146;
}

.input:focus {
  outline: none;
}

.create-account {
  width: 100%;
  justify-content: center;
  padding-top: 1rem;
}

.error-message {
  color: red;
  font-size: 0.875em;
  margin-top: 0.25rem;
}

.input-content{
  gap: 1rem;
  display: grid;
}

@media (max-width: 960px) {
  .main-image {
    display: none;
  }

  .login-form {
    width: 100%;
    padding-bottom: 3rem;
  }

  footer {
    padding: 10px 0;
    height: auto;
    flex-direction: column-reverse;
    gap: 20px;
    text-align: center;
  }

  .footer-links {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
}
</style>