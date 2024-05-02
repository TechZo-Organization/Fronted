<script>
export default {
  name: "register-content",

}
</script>

<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-form">
        <form action="" class="form-container">
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
              <label><b>Nombre</b></label><br>
              <pv-input required class="input" type="text"></pv-input>
              <br>
              <label><b>Contraseña</b></label><br>
              <pv-input required class="input" type="text"></pv-input>
              <br>
              <label><b>Repetir contraseña</b></label><br>
              <pv-input required class="input" type="text"></pv-input>
              <br>
              <label><b>Correo electrónico</b></label><br>
              <pv-input required class="input" type="text"></pv-input>
              <br>
              <label><b>Número de celular</b></label><br>
              <pv-input required class="input" type="text"></pv-input>
              <br>
              <div class="checkbox-terms">
                <label for="terms&conditions"><input id="terms&conditions" type="checkbox"> Aceptar <span style="color:#ffd146;">terminos y condiciones</span></label>
              </div>
              <router-link to="/log-in" type="submit">
                <pv-button  class="submit">Registrarse</pv-button>
              </router-link>
              <router-link to="/log-in">
                <pv-button class="create-account">¿Ya tienes una cuenta? <span style="color:#ffd146; margin-left: 10px;">Inicia sesión</span></pv-button>
              </router-link>
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
.login-container{
  width:100%;
  height: 100%;
}

.login-content{
  width:100%;
  display: flex;
}

.login-form{
  width: 55%;
}

.main-image-register{
  width: 45%;
  height: 115vh;
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

@media (max-width: 960px){

  .main-image{
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