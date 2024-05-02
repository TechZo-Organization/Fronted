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

.b-post{
  border: 1.5px solid #FFD146;
  border-radius: 20px;
  margin: 0px 2.5px 0px 2.5px;
  padding: 0.25rem 1rem 0.25rem 1rem;
  color: #FFD146;
  transition: 0.43s;
}

.b-post:hover{
  background-color: #fff;
}

.b-login{
  background-color: #fff;
  border: 1.5px solid #fff;
  border-radius: 20px;
  margin: 0px 2.5px 0px 2.5px;
  padding: 0.25rem 1rem 0.25rem 1rem;
  transition: 0.43s;
}

.b-login:hover{
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

.b-post-sidebar{
  border: 1.5px solid #FFD146;
  border-radius: 20px;
  margin: 0px 2.5px 0px 2.5px;
  padding: 0.25rem 1rem 0.25rem 1rem;
  color: #FFD146;
  transition: 0.43s;
}

.b-post-sidebar:hover{
  background-color: #fdf4e2;
}

.b-login-sidebar{
  background-color: #ffd146;
  border: 1.5px solid #fff;
  border-radius: 20px;
  margin: 0px 2.5px 0px 2.5px;
  padding: 0.25rem 1rem 0.25rem 1rem;
  transition: 0.43s;
}

.b-login-sidebar:hover{
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