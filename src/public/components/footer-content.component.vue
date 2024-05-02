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
  </div>
</template>

<style scoped>


</style>