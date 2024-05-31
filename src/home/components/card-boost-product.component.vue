<script>
export default {
  name: "card-boost-product",
  props: {
    boost_products: {
      type: Array,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  methods: {
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : 'Unknown';
    }
  }
}
</script>

<template>
  <div v-for="boost_product in boost_products" :key="boost_product.id" class="boost-products-container">
    <pv-card class="card-boost-container" v-if="boost_product.boost">
      <template #content>
        <div class="card-main">
          <div>
            <img :src="boost_product.images[0]" class="boost_product">
          </div>
          <div class="card-content">
            <div class="card-location">
              <img src="../../../public/donations/location-icon.png" style="width: 15px; height: 15px"/>
              <p>{{ boost_product.location.departament }}</p>
            </div>
            <div class="card-title">
              <h1>{{ boost_product.product_name }}</h1>
              <h2>{{ getCategoryName(boost_product.category_id) }}</h2> <!-- Uso de la función getCategoryName -->
            </div>
            <div class="card-exchange">
              <h3>{{ boost_product.change_for }}</h3>
              <h4>s/.{{ boost_product.price }} valor apróx</h4>
            </div>
          </div>
        </div>
      </template>
    </pv-card>
  </div>
</template>

<style scoped>

.card-boost-container {
  height: auto;
  width: 260px;
  margin-left: 1rem;
}

.boost_product{
  height: 60vh;
  filter: brightness(0.5);
  object-fit: cover;
  object-position: center;
}

.card-main {
  height: 55vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20px;
  color: white;
}

.card-location{
  display: flex;
  text-align: right;
  align-items: center;
  justify-content: right;
  gap: 5px;
  margin-bottom: 2rem;
}

.card-title h1{
  text-align: justify;
  font-size: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2rem;
  font-weight: bolder;
}

.card-title h2{
  margin-bottom: 10px;
  border: 1px solid #ffd146;
  border-radius: 10px;
  text-align: center;
  width: 130px;
}

.card-exchange h3{
  font-size: 13px;
  text-align: justify;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.5rem;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  font-weight: bolder;
}

.card-exchange h4{
  font-weight: bolder;
  color: #ffd146;
}

.card-exchange{
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  padding: 10px;
}

</style>