<script>
import { userApiService } from "./services/user-api.service.js";
import TabMenuProfile from "./components/tab-menu-profile.component.vue";

export default {
  name: "profile-content",
  components: {
    TabMenuProfile
  },
  data() {
    return {
      user: null,
      apiService: new userApiService(),
      userId: null,
    };
  },
  async mounted() {
    this.userId = this.getUserIdFromLocalStorage();
    if (this.userId) {
      await this.fetchUserData();
    } else {
      console.error('User ID not found in local storage');
    }
  },
  methods: {
    getUserIdFromLocalStorage() {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user).id : null;
    },
    async fetchUserData() {
      try {
        const response = await this.apiService.getUserById(this.userId);
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    logout() {
      localStorage.removeItem('user');
      this.user = null;
      this.$router.push('/log-in');
    }
  }
};
</script>

<template>
  <div class="profile-content" >
    <div class="background-profile">
      <img src="../../public/profile/profile-background.png" class="background-image" />
      <div class="user-info" v-if="user">
        <img :src="user.img" alt="User Image" class="user-image" />
        <div class="user-options">
          <h1 class="user-name">{{ user.name }}</h1>
          <pv-button @click="logout" class="b-logout"><b>Cerrar sesión</b></pv-button>
        </div>
      </div>
    </div>
    <div class="navigation-info-profile" style="background-color: #F8F7F4">
      <tab-menu-profile></tab-menu-profile>
    </div>
  </div>
</template>

<style scoped>
.profile-content {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 5rem;
}

.background-profile {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 100%;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  gap: 2rem;
}

.user-image {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.user-name {
  margin-top: 10px;
  font-size: 34px;
  font-weight: bolder;
}

.user-options {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.b-logout {
  background-color: #fff;
  border-radius: 20px;
  margin: 10px 0 0 0;
  padding: 0.25rem 1rem;
  transition: 0.43s;
  color: #000;
}

.b-logout:hover {
  color: #bf1419;
}

@media screen and (max-width: 500px){
  .user-info{
    flex-direction: column;
  }
}

</style>