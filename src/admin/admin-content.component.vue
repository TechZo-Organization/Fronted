<script>
import ToolbarAdmin from "./components/toolbar-admin.component.vue";

export default {
  name : "admin-content",
  components: {ToolbarAdmin},
}
</script>

<template>
  <div class="full-height">
    <toolbar-admin></toolbar-admin>
    <div class="centered-content">
      <h1>¡Bienvenido a la plataforma de Administrador!</h1>
      <h3>En esta vista usted como administrador podrá gestionar toda la información registrada en CambiaZo, sé responsable</h3>
    </div>
  </div>
</template>

<style scoped>
.full-height {
  height: 100vh;
}

.centered-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}

h1 {
  font-size: 60px;
  font-weight: bolder;
  color: #ffd146;
  padding-top: 5rem;
}

h3 {
  font-size: 30px;
  margin: 3rem;
}

@media screen and (max-width: 980px){
  h1{
    font-size: 40px;
  }
}
</style>
