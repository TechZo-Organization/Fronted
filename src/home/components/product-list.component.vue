<script>
import CardProduct from "./card-product.component.vue";

export default {
  name: "product-list",
  components: {
    CardProduct,
  },
  props: {
    products: Array,
    categories: Array,
  }
}
</script>

<template>
  <div class="list-products">
    <card-product v-for="product in products" :key="product.id" :product="product" :categories="categories"></card-product>
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
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>