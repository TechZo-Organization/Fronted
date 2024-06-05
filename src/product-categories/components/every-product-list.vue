<script>
import CardEveryProduct from "./card-every-product.vue";

export default {
  name: "every-product-list",
  components: {
    CardEveryProduct,
  },
  props: {
    products: Array,
    categories: Array,
  }
}
</script>

<template>
  <div class="list-products">
    <card-every-product v-for="product in products" :key="product.id" :product="product" :categories="categories"></card-every-product>
  </div>
</template>

<style scoped>
.list-products{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  padding-top: 3rem;
  padding-bottom: 3rem;
}
</style>