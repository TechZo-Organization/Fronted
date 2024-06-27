<script>
import {userApiService} from "../../profile/services/user-api.service.js";
import DialogContent from "./dialog-content.component.vue";

export default {
  name: 'ToolbarContent',
  components: {
    DialogContent
  },
  data() {
    return {
      visibleRight: false,
      showDialog: false,
      user: null,
      apiService: new userApiService(),
      userId: null,
    };
  },
  async mounted() {
    this.userId = this.getUserIdFromLocalStorage();
    if (this.userId) {
      await this.fetchUserData();
    }
  },
  methods: {
    getUserIdFromLocalStorage() {
      return localStorage.getItem('user');
    },
    async fetchUserData() {
      try {
        const response = await this.apiService.getUserById(this.userId);
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    toggleDrawer() {
      this.visibleRight = !this.visibleRight;
    },
    handlePublish() {
      if (this.user) {
        this.$router.push('/publish');
      } else {
        this.showDialog = true;
        document.body.classList.add('no-scroll');
      }
    },
    handlePublishSidebar() {
      this.handlePublish();
      this.closeSidebar();
    },
    closeSidebar() {
      this.visibleRight = false;
    },
    closeDialog() {
      this.showDialog = false;
      document.body.classList.remove('no-scroll');
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    closeSidebarAndScrollToTop() {
      this.closeSidebar();
      this.scrollToTop();
    }
  }
};
</script>

<template>
  <div>
    <pv-toolbar class="toolbar">
      <template #start>
        <div>
          <img src="../../../public/logo/cambiazo-logo.png" height="45" width="220" />
        </div>
      </template>
      <template #center>
        <div class="center">
          <router-link to="/home" class="yellow-link" @click.native="scrollToTop">Inicio</router-link>
          <router-link to="/donations" class="yellow-link" @click.native="scrollToTop">Donaciones</router-link>
          <router-link to="/memberships" class="yellow-link" @click.native="scrollToTop">Membresías</router-link>
        </div>
      </template>
      <template #end>
        <div class="end">
          <pv-button @click="handlePublish" class="b-post" @click.native="scrollToTop"><b>Publicar</b></pv-button>
          <div v-if="user">
            <router-link to="/profile" @click.native="scrollToTop">
              <pv-button class="user-img-button">
                <img :src="user.photo" alt="User Image" class="user-img" />
              </pv-button>
            </router-link>
          </div>
          <router-link to="/log-in" v-else @click.native="scrollToTop">
            <pv-button class="b-login"><b>Iniciar sesión</b></pv-button>
          </router-link>
        </div>
        <pv-button class="p-button-text text-white burger" icon="pi pi-bars" @click="toggleDrawer" />
      </template>
    </pv-toolbar>
    <pv-sidebar v-model:visible="visibleRight" header="Right Sidebar" position="right" class="top-sidebar bg-white p-4">
      <div class="sidebar-content">
        <router-link to="/home" class="yellow-link" @click.native="closeSidebarAndScrollToTop"><h1>Inicio</h1></router-link><br>
        <router-link to="/donations" class="yellow-link" @click.native="closeSidebarAndScrollToTop"><h1>Donaciones</h1></router-link><br>
        <router-link to="/memberships" class="yellow-link" @click.native="closeSidebarAndScrollToTop"><h1>Membresías</h1></router-link><br>
        <div style="padding-top: 2rem;">
          <pv-button @click="handlePublishSidebar" class="b-post-sidebar"><b>Publicar</b></pv-button>
          <router-link to="/log-in" v-if="!user" @click.native="closeSidebarAndScrollToTop">
            <pv-button class="b-login-sidebar"><b>Iniciar sesión</b></pv-button>
          </router-link>
          <div v-else>
            <router-link to="/profile" @click.native="closeSidebarAndScrollToTop">
              <pv-button class="b-profile-sidebar"><b>Ver perfil</b></pv-button>
            </router-link>
          </div>
        </div>
      </div>
    </pv-sidebar>
    <dialog-content :visible="showDialog" @close="closeDialog"/>
  </div>
</template>

<style scoped>
.toolbar {
  background-color: #000;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0px 0px 50px 0px #707070;
}

.center {
  display: flex;
  color: #fff;
  gap: 1.5rem;
}

.yellow-link {
  transition: 0.43s;
  font-size: 17px;
  font-family: 'Montserrat';
}

.yellow-link:hover {
  color: #FFD146;
}

.b-post {
  border: 1.5px solid #FFD146;
  border-radius: 20px;
  margin: 0px 2.5px 0px 2.5px;
  padding: 0.25rem 1rem 0.25rem 1rem;
  color: #FFD146;
  transition: 0.43s;
  height: 40px;
}

.b-post:hover {
  background-color: #fff;
}

.b-login {
  background-color: #fff;
  border: 1.5px solid #fff;
  border-radius: 20px;
  margin: 0px 2.5px 0px 2.5px;
  padding: 0.25rem 1rem 0.25rem 1rem;
  transition: 0.43s;
  height: 40px;
}

.b-login:hover {
  background-color: #FFD146;
  border: 1.5px solid #FFD146;
}

.burger {
  display: none;
}

.user-img {
  border-radius: 50%;
  width: 65px;
  height: 65px;
  border: 3px solid #FFD146;
  object-fit:cover;
  object-position:center;
}

.user-img-button {
  display: inline-flex;
}

.end {
  display: flex;
  gap: 10px;
  align-items: center;
}

.sidebar-content {
  padding-top: 3rem;
}

.b-post-sidebar {
  border: 1.5px solid #FFD146;
  border-radius: 20px;
  padding: 0.25rem 1rem 0.25rem 1rem;
  color: #FFD146;
  transition: 0.43s;
}

.b-post-sidebar:hover {
  background-color: #fff;
}

.b-login-sidebar {
  background-color: #fff;
  border: 1.5px solid #fff;
  border-radius: 20px;
  padding: 0.25rem 1rem 0.25rem 1rem;
  transition: 0.43s;
}

.b-login-sidebar:hover {
  background-color: #FFD146;
  border: 1.5px solid #FFD146;
}

.b-profile-sidebar {
  background-color: #000;
  border-radius: 20px;
  padding: 0.25rem 1rem 0.25rem 1rem;
  transition: 0.43s;
  margin-top: 1rem;
  color: #fff;
}

.b-profile-sidebar:hover {
  background-color: #FFD146;
  border: 1.5px solid #FFD146;
  color: #000;
}

.dialog-container h1 {
  font-size: 30px;
  font-weight: bolder;
  padding-bottom: 1rem;
}

.dialog-container p {
  font-size: 20px;
  padding-bottom: 2rem;
}

@media screen and (max-width: 820px) {
  .center {
    display: none;
  }

  .b-post {
    display: none;
  }

  .b-login {
    display: none;
  }

  .burger {
    display: block;
  }

  .user-img-button {
    display: none;
  }
}
</style>
