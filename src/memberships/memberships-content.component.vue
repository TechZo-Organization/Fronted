<script>
import { membershipsApiService } from "./services/membership-api.service.js";
import MembershipList from "./components/membership-list.component.vue";

export default {
  name: "memberships-content",
  components:{
    MembershipList,
  },
  data(){
    return{
      memberships: [],
      errors: [],
      membershipsApi: new membershipsApiService(),
    }
  },
  created() {
    this.getAllMemberships();
  },
  methods: {
    getAllMemberships() {
      this.membershipsApi.getMemberships()
          .then((response) => {
            this.memberships = response.data;
          })
          .catch((error) => {
            this.errors.push(error);
          });
    },
  },
}
</script>

<template>
  <div class="memberships-content" style="background-color: #F8F7F4">
    <br>
    <br>
    <br>
    <div class="title-container">
      <h1>¡Sé parte de nuestra comunidad premium</h1>
      <h2>y obten beneficios exclusivos para ti!</h2>
    </div>
    <div class="main-container">
      <div class="memberships-container" >
        <membership-list v-if="errors" :memberships="memberships"></membership-list>
      </div>
    </div>
    <div class="footer-container">
      <h3>Todos nuestros planes se renuevan automáticamente según el período elegido inicialmente.</h3>
    </div>
  </div>
</template>

<style scoped>

.title-container{
  padding: 5rem 3rem 3rem 3rem;
  font-size: 40px;
  font-weight: bolder;
  text-align: center;
}

.title-container h1{
  font-size: 50px;
  color: #FFD146;
}

.main-container{
  padding: 0rem 4rem 0rem 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.memberships-container{
  display: flex;
  gap: 1rem;
}

.footer-container{
  text-align: center;
  font-size: 20px;
  font-weight: bolder;
  padding: 1.5rem 1.5rem 6rem 1.5rem;
}

@media screen and (max-width: 900px){
  .title-container{
    font-size: 30px;
  }

  .title-container h1{
    font-size: 40px;
  }
  .memberships-container{
    display: grid;
  }
}

</style>