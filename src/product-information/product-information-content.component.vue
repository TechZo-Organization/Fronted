<script>
import ProductInformation from "./components/product-information.component.vue";

export default {
  name: 'product-information-content',
  components: {ProductInformation},
}
</script>

<template>
  <div class="product-info-content" style="background-color: #F8F7F4">
    <product-information></product-information>
  </div>
</template>

<style scoped>
.product-info-content{
  justify-content: center;
  padding-top: 10rem;
  padding-bottom: 5rem;
  padding-left: 4rem;
  padding-right: 4rem;
}

@media screen and (max-width: 900px){
  .product-info-content{
    justify-content: center;
    padding-top: 8rem;
    padding-bottom: 5rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>