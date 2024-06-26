<script>
import PublishFormComponent from "./components/publish-form.component.vue";

export default {
  name: 'publish-content',
  components: {
    PublishFormComponent
  }
};
</script>

<template>
  <div class="publish-content" style="background-color: #F8F7F4">
    <div class="publish-title">
      <h1>Publicar producto</h1>
    </div>
    <publish-form-component />
  </div>
</template>

<style scoped>

.publish-content {
  justify-content: center;
  padding-top: 12rem;
  padding-bottom: 3rem;
  padding-left: 4rem;
  padding-right: 4rem;
}
.publish-title {
  background-color: #FFD146;
  font-size: 30px;
  font-weight: bolder;
  padding: 1rem;
  border-radius: 40px 0px 0px 0px;
  box-shadow: 0px 0px 20px 0px #c6c6c6;
}

@media only screen and (max-width: 900px) {
  .publish-content {
    justify-content: center;
    padding-top: 8rem;
    padding-bottom: 3rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .publish-title {
    font-size: 25px;
  }
}
</style>