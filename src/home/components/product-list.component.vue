<script>
import CardProduct from "./card-product.component.vue";

export default {
  name: "product-list",
  components: {
    CardProduct,
  },
  props: {
    products: Object,
  }
}
</script>

<template>
  <div v-for="product in products">
    <card-product :product="product" ></card-product>
  </div>
</template>

<style scoped>

</style>