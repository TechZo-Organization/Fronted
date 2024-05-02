<script>
export default {
  name: 'toolbar-content',
  data() {
    return {
      visibleRight: false,
      showBurger: false,
    };
  },
  methods: {
    toggleDrawer() {
      this.visibleRight = !this.visibleRight;
    },
  },
}
</script>

<template>
  <pv-toolbar class="toolbar">
    <template #start>
      <div>
        <img src="../../../public/logo/cambiazo-logo.png" height="45" width="220"/>
      </div>
    </template>
    <template #center >
      <div class="center">
        <router-link to="/home" class="yellow-link">Inicio</router-link>
        <router-link to="/donations" class="yellow-link">Donaciones</router-link>
        <router-link to="/memberships" class="yellow-link">Membresías</router-link>
      </div>
    </template>
    <template #end>
      <div class="end">
        <pv-button class="b-post"><b>Publicar</b></pv-button>
        <router-link to="/log-in"><pv-button class="b-login"><b>Iniciar sesión</b></pv-button></router-link>
      </div>
      <pv-button class="p-button-text text-white burger" icon="pi pi-bars" @click="toggleDrawer" />
    </template>
  </pv-toolbar>
  <pv-sidebar v-model:visible="visibleRight" header="Right Sidebar" position="right" class="top-sidebar bg-white p-4">
    <div class="sidebar-content">
      <router-link to="/home" class="yellow-link"><h1>Inicio</h1></router-link><br>
      <router-link to="/donations" class="yellow-link"><h1>Donaciones</h1></router-link><br>
      <router-link to="/memberships" class="yellow-link"><h1>Membresías</h1></router-link><br>
      <div style="padding-top: 2rem;">
        <pv-button class="b-post-sidebar"><b>Publicar</b></pv-button>
        <router-link to="/log-in">
          <pv-button class="b-login-sidebar"><b>Iniciar sesión</b></pv-button>
        </router-link>
      </div>
    </div>
  </pv-sidebar>
</template>


<style scoped>
</style>