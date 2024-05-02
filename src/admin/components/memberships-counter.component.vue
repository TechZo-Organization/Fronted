<script>
import axios from "axios";

export default {
  name: "card-plan-users",
  data() {
    return {
      countLite: 0,
      countPlus: 0,
      countPremium: 0,
      Users: [],
    }
  },
  mounted() {
    axios.get('https://662adbcede35f91de15695c4.mockapi.io/cambiazo/users')
        .then((response)=> {
          this.Users=response.data;
          console.log(this.Users);
          for(let i=0;i<this.Users.length;i++){
            if(this.Users[i].membership === '1'){
              this.incrementLite();
            }else if(this.Users[i].membership === '2'){
              this.incrementPlus();
            }else if(this.Users[i].membership === '3'){
              this.incrementPremium();
            }
          }
          console.log(this.countLite);
          console.log(this.countPlus);
          console.log(this.countPremium);
        })
        .catch((error)=>{
          console.log(error);
        });
  },
  methods: {
    incrementLite() {
      this.countLite++;
    },
    incrementPlus() {
      this.countPlus++;
    },
    incrementPremium() {
      this.countPremium++;
    },
  },
}
</script>

<template>
  <div class="counter-container">
    <pv-card class="counter">
      <template #title><b>Lite Users:</b></template>
      <template #content>
        <p>Plan: Lite</p>
        <p>Users: {{this.countLite}}</p>
      </template>
    </pv-card>
    <pv-card class="counter">
      <template #title><b>Plus Users:</b></template>
      <template #content>
        <p>Plan: Plus</p>
        <p>Users: {{this.countPlus}}</p>
      </template>
    </pv-card>
    <pv-card class="counter">
      <template #title><b>Premium Users:</b></template>
      <template #content>
        <p>Plan: Premium</p>
        <p>Users: {{this.countPremium}}</p>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>
</style>