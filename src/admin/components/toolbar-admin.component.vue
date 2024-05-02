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

.toolbar{
  background-color: #000;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.center{
  display: flex;
  color: #fff;
  gap: 1.5rem;
}

.yellow-link{
  transition: 0.43s;
  font-size: 17px;
  font-family: 'Montserrat';
}

.yellow-link:hover{
  color: #FFD146;
}

.b-admin{
  background-color: #fff;
  border: 1.5px solid #fff;
  border-radius: 20px;
  margin: 0px 2.5px 0px 2.5px;
  padding: 0.25rem 1rem 0.25rem 1rem;
  transition: 0.43s;
}

.b-admin:hover{
  background-color: #FFD146;
  border: 1.5px solid #FFD146;
}

.burger{
  display:none;
}

.sidebar-content{
  padding-top: 3rem;
}

.sidebar-content h1{
  font-size: 20px;
}

.b-admin-sidebar{
  background-color: #ffd146;
  border: 1.5px solid #fff;
  border-radius: 20px;
  margin: 0px 2.5px 0px 2.5px;
  padding: 0.25rem 4rem 0.25rem 4rem;
  transition: 0.43s;
}

.b-admin-sidebar:hover{
  background-color: #000;
  color: #ffd146;
}

@media screen and (max-width: 980px) {
  .center,
  .end{
    display:none;
  }

  .burger{
    display:block;
  }
}

</style>