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
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
  }
}
</script>

<template>
  <div v-for="boost_product in boost_products" :key="boost_product.id" class="boost-products-container">
    <router-link :to="`/product-information/${boost_product.id}`" @click.native="scrollToTop">
      <pv-card class="card-boost-container" v-if="boost_product.boost">
        <template #content>
          <div class="card-main">
            <div>
              <img :src="boost_product.photo" class="boost_product">
            </div>
            <div class="card-content-boost">
              <div class="card-location">
                <img src="../../../public/donations/location-icon.png" style="width: 18px; height: 18px"/>
                <p>{{ boost_product.district.name}}</p>
              </div>
              <div class="card-title-boost">
                <h1>{{ boost_product.name }}</h1>
                <h2>{{ getCategoryName(boost_product.categoryId) }}</h2>
              </div>
              <div class="card-exchange-boost">
                <h3>{{ boost_product.objectChange }}</h3>
                <h4>s/.{{ boost_product.price }} valor apróx</h4>
              </div>
            </div>
          </div>
        </template>
      </pv-card>
    </router-link>
  </div>
</template>

<style scoped>

.card-boost-container {
  height: 340px;
  width: 280px;
  margin-left: 1rem;
  cursor: pointer;
}

.boost_product{
  height: 340px;
  width: 280px;
  filter: brightness(0.8);
  object-fit: cover;
  object-position: center;
}

.card-main {
  height: 340px;
  width: 280px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.card-content-boost {
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
  font-weight: bold;
  justify-content: right;
  gap: 5px;
  margin-bottom: 100px;
}

.card-title-boost h1{
  text-align: left;
  font-size: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2rem;
  font-weight: bolder;
}

.card-title-boost h2{
  margin-bottom: 10px;
  border: 2px solid #ffd146;
  color:#ffd146;
  font-weight:bold;
  border-radius: 10px;
  text-align: center;
  width: 130px;
}

.card-exchange-boost h3{
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

.card-exchange-boost h4{
  font-weight: bolder;
  color: #ffd146;
}

.card-exchange-boost{
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  padding: 10px;
}

@media (max-width: 768px) {
  .card-title-boost h1{
    padding-top:0;
  }
}

</style>