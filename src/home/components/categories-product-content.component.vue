<script>
export default {
  name: "categories-product",
  props: {
    category_products: {
      type: Array,
      required: true
    }
  },
  methods: {
    filterByCategory(categoryName) {
      this.$emit("category-selected", categoryName);
    }
  }
}
</script>

<template>
  <div v-for="category_product in category_products" :key="category_product.id">
    <pv-button class="b-category" @click="filterByCategory(category_product.name)">
      {{category_product.name}}
    </pv-button>
  </div>
</template>


<style scoped>
.b-category{
  background-color: #fff;
  border: 2px solid #FFD146;
  color: #FFD146;
  font-weight: bolder;
  border-radius: 20px;
  padding: 0.25rem 1rem 0.25rem 1rem;
  transition: 0.43s;
}

.b-category:hover{
  background-color: #000;
}
</style>