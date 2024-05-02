<script>
export default {
  name: "toolbar-admin",
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
        <router-link to="/admin">
          <img src="../../../public/admin/cambiazo-admin-logo.png" height="100" width="280"/>
        </router-link>
      </div>
    </template>
    <template #center >
      <div class="center">
        <router-link to="/admin/users" class="yellow-link">Usuarios</router-link>
        <router-link to="/admin/ongs" class="yellow-link">Ongs</router-link>
        <router-link to="/admin/memberships" class="yellow-link">Membresías</router-link>
        <router-link to="/admin/categories-product" class="yellow-link">C. Producto</router-link>
        <router-link to="/admin/categories-ong" class="yellow-link">C. Ong</router-link>
      </div>
    </template>
    <template #end>
      <div class="end">
        <router-link to="/home"><pv-button class="b-admin"><b>Inicio</b></pv-button></router-link>
      </div>
      <pv-button class="p-button-text text-white burger" icon="pi pi-bars" @click="toggleDrawer" />
    </template>
  </pv-toolbar>
  <pv-sidebar v-model:visible="visibleRight" header="Right Sidebar" position="right" class="top-sidebar bg-white p-4">
    <div class="sidebar-content">
      <router-link to="/admin/users" class="yellow-link"><h1>Usuarios</h1></router-link><br>
      <router-link to="/admin/ongs" class="yellow-link"><h1>Ongs</h1></router-link><br>
      <router-link to="/admin/memberships" class="yellow-link"><h1>Membresías</h1></router-link><br>
      <router-link to="/admin/categories-product" class="yellow-link"><h1>C. Producto</h1></router-link><br>
      <router-link to="/admin/categories-ong" class="yellow-link"><h1>C. Ong</h1></router-link><br>

      <div style="padding-top: 2rem;">
        <router-link to="/home">
          <pv-button class="b-admin-sidebar"><b>Inicio</b></pv-button>
        </router-link>
      </div>
    </div>
  </pv-sidebar>
</template>


<style scoped>

</style>