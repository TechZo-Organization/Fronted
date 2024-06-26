<script>
import { Membership } from "../model/membership.entity.js";
import DialogContent from "../../public/components/dialog-content.component.vue";

export default {
  name: "card-membership",
  components: {
    DialogContent
  },
  props: {
    membership: Membership,
  },
  data() {
    return {
      user: null,
      showDialog: false,
    };
  },
  mounted() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  },
  methods: {
    handleStart() {
      if (!this.user) {
        this.showDialog = true;
        document.body.classList.add('no-scroll');
      } else {
        // Lógica para cuando el usuario está logueado
      }
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
  }
};
</script>

<template>
  <div>
    <pv-card class="main-card" v-bind:class="{ 'yellow': membership.price === 2.99 }">
      <template #header><h2>{{ membership.name }}</h2></template>
      <template #title>
        <h1 v-if="membership.price === 0">GRATIS</h1>
        <h1 v-else>${{ membership.price }}<span>c/mes</span></h1>
      </template>
      <template #subtitle><p>{{ membership.description }}</p>
        <div style="text-align: center;">
          <router-link :to="`/membership-payment/${membership.id}`" @click.native="scrollToTop">
            <pv-button @click="handleStart" class="b-start"><b>¡Empieza ahora!</b></pv-button>
          </router-link>
        </div>
      </template>
      <template #content>
        <div v-for="benefit in membership.benefits" :key="benefit">
          <div class="benefits"><img src="../../../public/memberships/check.png" alt="" style="margin-right: 10px; width: 4vh; height: 4vh">{{benefit}}</div>
        </div>
      </template>
      <template #footer>
      </template>
    </pv-card>
    <dialog-content :visible="showDialog" @close="closeDialog"/>
  </div>
</template>

<style scoped>

.main-card{
  background-color: #fff;
  width: 100%;
  height: 100%;
  border: 3px solid #FFD146;
  border-radius: 10px;
  padding: 2rem 1.5rem 2rem 1.5rem;
}

.main-card h2{
  font-size: 30px;
  font-weight: bolder;
}

.main-card h1{
  font-size: 45px;
  font-weight: bolder;
}

.main-card span{
  font-size: 25px;
  font-weight: bolder;
}

.b-start{
  background-color: #000;
  color: #fff;
  justify-content: center;
  padding: 0.5rem 0rem 0.5rem 0rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  width: 95%;
  transition: 0.43s;
}

.b-start:hover{
  background-color: #FFD146;
  color: #000;
}

.yellow .b-start:hover{
  background-color: #fff;
  color: #000;
}

.yellow{
  background-color: #FFD146;
  border: none;
}

.benefits{
  display: flex;
  margin-top: 1rem;
}

</style>