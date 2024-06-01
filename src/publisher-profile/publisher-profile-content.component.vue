<script>
import PublisherProfile from "./components/publisher-profile.component.vue";

export default {
  name: "publisher-profile-content",
  components: {PublisherProfile},
}
</script>

<template>
  <div class="publisher-content" style="background-color: #F8F7F4">
    <publisher-profile></publisher-profile>
  </div>
</template>

<style scoped>

.publisher-content{
  justify-content: center;
  padding-top: 10rem;
  padding-bottom: 5rem;
  padding-left: 4rem;
  padding-right: 4rem;
}

@media screen and (max-width: 900px){
  .publisher-content{
    justify-content: center;
    padding-top: 8rem;
    padding-bottom: 5rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>