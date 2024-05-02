<script>
import CardOng from "./card-ong.component.vue";

export default {
  name: "ong-list",
  components:{
    CardOng,
  },
  props: {
    ongs: Object,
  }
}
</script>

<template>
  <div v-for="ong in ongs">
    <card-ong :ong="ong" ></card-ong>
  </div>
</template>

<style scoped>

</style>