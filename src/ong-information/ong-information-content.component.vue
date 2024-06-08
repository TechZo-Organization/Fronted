<script>
import OngInformation from "./components/ong-information.component.vue";

export default {
  name: "ong-information-content",
  components: {OngInformation},
}
</script>

<template>
  <div class="ong-info-content" style="background-color: #F8F7F4">
    <ong-information></ong-information>
  </div>
</template>

<style scoped>
.ong-info-content{
  justify-content: center;
  padding-top: 10rem;
  padding-bottom: 5rem;
  padding-left: 2rem;
  padding-right: 2rem;
}

@media screen and (max-width: 900px){

}
</style>