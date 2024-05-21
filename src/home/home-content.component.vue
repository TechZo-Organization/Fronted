<script>
import { homeApiService } from "./services/home-api.service.js";
import CategoriesProduct from "./components/categories-product-content.component.vue";
import ProductList from "./components/product-list.component.vue";
import CardBoostProduct from "./components/card-boost-product.component.vue";

export default {
  name: "home-content",
  components: {
    CardBoostProduct,
    ProductList,
    CategoriesProduct
  },
  data(){
    return{
      category_products: [],
      products: [],
      boost_products: [],
      errors: [],
      homeApi: new homeApiService(),
      searchProduct: "",
      selectedCategory: ""
    }
  },
  created() {
    this.getAllProductCategories();
    this.getAllProducts();
  },
  methods: {
    getAllProductCategories() {
      this.homeApi.getCategoriesProduct()
          .then((response) => {
            this.category_products = response.data;
          })
          .catch((error) => {
            this.errors.push(error);
          });
    },
    getAllProducts() {
      this.homeApi.getProduct()
          .then((response) => {
            this.products = response.data;
            this.boost_products = response.data.filter(product => product.boost);
          })
          .catch((error) => {
            this.errors.push(error);
          });
    },
    filterByCategory(categoryName) {
      this.selectedCategory = categoryName;
    },
  },
  computed: {
    filteredProducts() {
      if (this.selectedCategory) {
        return this.products.filter(product =>
            product.category && product.category.name &&
            product.category.name.toLowerCase().includes(this.selectedCategory.toLowerCase())
        );
      } else {
        return this.products.filter(product =>
            product.product_name &&
            product.product_name.toLowerCase().includes(this.searchProduct.toLowerCase())
        );
      }
    }
  }
}
</script>

<template>
  <div class="home-content" style="background-color: #F8F7F4">
    <br>
    <br>
    <br>
    <div class="search-form">
      <pv-input v-model="searchProduct" class="input-search" placeholder="Buscar..."></pv-input>
    </div>
    <div class="categories-container">
      <categories-product :category_products="category_products" @categorySelected="filterByCategory"></categories-product>
    </div>
    <div class="boost-container">
      <div class="boost-container-slide">
        <card-boost-product :boost_products="boost_products"></card-boost-product>
      </div>
      <div class="boost-container-slide">
        <card-boost-product :boost_products="boost_products"></card-boost-product>
      </div>
    </div>
    <div class="title-container">
      <h1>Últimos trueques publicadoss</h1>
    </div>
    <div class="products-container">
      <product-list v-if="filteredProducts.length" :products="filteredProducts"></product-list>
    </div>
    <div class="more-products-container">
      <router-link to="/admin">
        <pv-button class="b-more-products">Ver más</pv-button>
      </router-link>
    </div>
  </div>
</template>
<style scoped>

.search-form{
  padding: 5rem 20rem 1rem 20rem;
  text-align: center;
  display: flex;
  gap: 10px;
}

.input-search{
  width: 100%;
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid #cccccc;
  background-color: #fff;
  box-shadow: 0px 0px 8px 0px #cccccc;
}

.input-search:focus{
  outline: none;
}


.categories-container {
  padding: 1rem 10rem 3rem 10rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 7px;
  max-width: 100%;
}


@keyframes slide{
  from{
    transform: translateX(0);
  }
  to{
    transform: translateX(-100%);
  }
}

.boost-container{
  padding-top: 2rem;
  padding-bottom: 6rem;
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
}

.boost-container-slide{
  display: flex;
  flex-wrap: nowrap;
  animation: 20s slide infinite linear;
}

.title-container{
  background-color: #FFD146;
  text-align: center;
  font-weight: bolder;
  font-size: 25px;
  padding: 0.8rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  box-shadow: 0px 0px 15px 0px #cccccc;
}

.products-container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.more-products-container{
  justify-content: center;
  text-align: center;
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.b-more-products{
  background-color: #fff;
  padding: 0.5rem 4rem 0.5rem 4rem;
  font-size: 18px;
  border: 1px solid #cccccc;
  font-weight: bold;
  color: #ccc;
  border-radius: 20px;
  transition: 0.43s;
}

.b-more-products:hover{
  background-color: #fff6e3;
  color: #FFD146;
  border: 1px solid #FFD146;
}

@media screen and (max-width: 1200px){
  .search-form{
    padding: 5rem 3rem 1rem 3rem;
  }
  .categories-container {
    padding: 1rem 3rem 3rem 3rem;
  }
}

</style>