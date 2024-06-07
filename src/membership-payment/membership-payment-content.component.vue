<script>
import MembershipPayment from "./components/membership-payment.component.vue";

export default {
  name: "membership-payment-content",
  components: {MembershipPayment},
  methods:{
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
  }
}
</script>

<template>
  <div class="memberships-content" style="background-color: #F8F7F4">
    <div class="return-content">
      <router-link to="/memberships" @click.native="scrollToTop">
        <pv-button class="button-return">
          <img src="../../public/membership-payment/return-icon.png" height="25" width="25"/>
        </pv-button>
      </router-link>
    </div>
    <membership-payment></membership-payment>
  </div>
</template>

<style scoped>

.memberships-content{
  padding: 1rem 1.5rem 2rem 1.5rem;
}

.button-return{
  background-color: #FFD146;
  border-radius: 10px;
  padding: 0.3rem 1rem;
  transition: 0.43s;
  border: 4px solid #FFD146;
}

.button-return:hover{
  background-color: #fff;
}

</style>