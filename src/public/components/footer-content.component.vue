<script>
export default {
  name:"footer-content",
}
</script>

<template>
  <div class="footer">
    <div class="f-row1">
      <div class="image-section">
        <img src="../../../public/logo/cambiazo-logo.png" height="45" width="220"/>
      </div>
      <div class="link-section">
        <router-link to="/home" class="yellow-link">Inicio</router-link><br><br>
        <router-link to="/donations" class="yellow-link">Donaciones</router-link><br><br>
        <router-link to="/memberships" class="yellow-link">Membresías</router-link><br><br>
      </div>
      <div class="media-section">
        <h4>Redes sociales:</h4>
        <div class="social-media">
          <div class="circle-media">
            <a href="https://www.instagram.com/" target="_blank"><img src="../../../public/social-media-logos/logo-instagram.png" alt="instagram-logo" width="25"></a>
          </div>
          <div class="circle-media">
            <a href="https://youtube.com/" target="_blank"><img src="../../../public/social-media-logos/logo-youtube.png" alt="youtube-logo" width="25"></a>
          </div>
          <div class="circle-media">
            <a href="https://www.linkedin.com/home" target="_blank"><img src="../../../public/social-media-logos/logo-linkedin.png" alt="linkedin-logo" width="25"></a>
          </div>
          <div class="circle-media">
            <a href="https://es-la.facebook.com/" target="_blank"><img src="../../../public/social-media-logos/logo-facebook.png" alt="facebook-logo" width="25"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="f-row2">
      <div class="help-links">
        <router-link to="/help" class="gray-link">Ayuda</router-link>
        <router-link to="/contact-us" class="gray-link">Contacto</router-link>
        <router-link to="/terms-use" class="gray-link">Condiciones de uso</router-link>
        <router-link to="/privacy-policies" class="gray-link">Políticas de privacidad</router-link>
      </div>
      <h4 style="color: #FFD146">&copy; TechZo 2024. Todos los derechos reservados.</h4>
    </div>
    <br>
    <br>
  </div>
</template>

<style scoped>
.footer{
  background-color: #000;
  color: #fff;
  padding: 2.5rem;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.f-row1{
  display: flex;
  padding-top: 1rem;
  justify-content: space-between;
}

.f-row1 a{
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}

.yellow-link{
  transition: 0.43s;
  font-size: 18px;
}

.yellow-link:hover{
  color: #FFD146;
}

.gray-link{
  color: #989898;
  transition: 0.43s;
}

.gray-link:hover{
  color: #ffffff;
}

.social-media{
  display:flex;
  padding-top: 1rem;
}

.circle-media {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin: 3px;
  transition: 0.43s;
}
.circle-media:hover{
  background-color: #FFD146;
  box-shadow: 0px 0px 8px 0px #FFD146;
}

.f-row2{
  margin: 1rem;
  padding-top: 1.5rem;
}

.help-links{
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-bottom: 1.5rem;
}

.help-links a{
  text-decoration: none;
  font-weight: bold;
}

@media screen and (max-width: 750px) {
  .f-row1{
    display: grid;
    justify-content: center;
    padding-bottom: 0;
  }

  .image-section,
  .link-section{
    padding-bottom: 2rem;
  }

  .social-media a{
    margin: 8px;
  }

  .help-links{
    display: grid;
    padding-bottom: 3rem;
  }
}

</style>