<script>
import ToolbarAdmin from "./components/toolbar-admin.component.vue";

export default {
  name : "admin-content",
  components: {ToolbarAdmin},
}
</script>

<template>
  <toolbar-admin></toolbar-admin>
  <div style="text-align:center; padding: 2rem;">
    <h1>¡Bienvenido a la plataforma de Administrador!</h1>
    <h3>En esta vista usted como administrador podrá gestionar toda la información registrada en CambiaZo, sé responsable</h3>
  </div>
</template>

<style scoped>
h1{
  font-size: 60px;
  font-weight: bolder;
  padding-top: 8rem;
  color: #ffd146;
}

h3{
  font-size: 30px;
  padding-top: 2rem;
  margin: 3rem;
}
</style>