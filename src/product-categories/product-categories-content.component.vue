<script>

import ProductCategory from "./components/product-category.component.vue";

export default {
  name: "product-categories-content",
  components: {ProductCategory},

}
</script>

<template>
  <div class="product-category-content" style="background-color: #F8F7F4">
    <product-category></product-category>
  </div>
</template>

<style scoped>

.product-category-content{
  justify-content: center;
  padding-top: 10rem;
  padding-bottom: 5rem;
  padding-left: 4rem;
  padding-right: 4rem;
}

@media screen and (max-width: 900px){
  .product-category-content{
    justify-content: center;
    padding-top: 8rem;
    padding-bottom: 5rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>