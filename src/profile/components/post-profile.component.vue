<script>
import { homeApiService } from "../../home/services/home-api.service.js";
import { Product } from "../../home/model/product.entity.js";

export default {
  name: 'post-profile',
  data() {
    return {
      products: [],
      categories: [],
      loading: true,
      error: null
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    async fetchProducts() {
      const loggedUserId = localStorage.getItem('user');
      console.log('Logged User ID:', loggedUserId); // Debugging statement
      if (!loggedUserId) {
        this.error = 'No logged-in user found';
        this.loading = false;
        return;
      }
      try {
        const response = await new homeApiService().getProduct();
        console.log('Products fetched:', response.data); // Debugging statement
        const allProducts = response.data;
        this.products = allProducts
            .filter(product => product.user_id === loggedUserId)
            .map(product => new Product(
                product.id,
                product.product_name,
                product.description,
                product.change_for,
                product.price,
                product.images,
                product.category_id,
                product.boost,
                product.user_id,
                product.location
            ));
        console.log('Filtered Products:', this.products); // Debugging statement
        this.loading = false;
      } catch (err) {
        this.error = err;
        console.error('Error fetching products:', err); // Debugging statement
        this.loading = false;
      }
    },
    async fetchCategories() {
      try {
        const response = await new homeApiService().getCategoriesProduct();
        console.log('Categories fetched:', response.data); // Debugging statement
        this.categories = response.data;
      } catch (err) {
        this.error = err;
        console.error('Error fetching categories:', err); // Debugging statement
      }
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : 'Unknown Category';
    }
  },
  async created() {
    await this.fetchCategories();
    await this.fetchProducts();
  }
}
</script>

<template>
  <div class="post-content">
    <h1>IntercambioZ Publicados</h1>
    <hr>
    <div class="post-list">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error.message }}</div>
      <div v-else>
        <div class="post-cards-container">
          <div v-for="product in products" :key="product.product_name" class="card-post">

            <div class="card-content">
              <div class="image-post">
                <img :src="product.images[0]" />
              </div>
              <div class="post-info">
                <router-link :to="`/product-information/${product.id}`" @click.native="scrollToTop">
                  <div class="post-title">
                    <h1>{{ product.product_name }}</h1>
                    <h2>{{ getCategoryName(product.category_id) }}</h2>
                  </div>
                </router-link>
                <div class="post-details">
                  <p>{{ product.description }}</p>
                  <div class="icon-detail">
                    <img src="../../../public/donations/location-icon.png"/>
                    <p>{{ product.location.district }}, {{ product.location.departament }}</p>
                  </div>
                  <div class="icon-detail">
                    <img src="../../../public/products/exchange.icon.png"/>
                    <p>{{ product.change_for }}</p>
                  </div>
                  <h2>Valor aproximado s/.{{ product.price }}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-content{
  padding: 1.5rem;
  justify-content: center;
}

.post-content h1{
  text-align: left;
  font-weight: bolder;
  font-size: 25px;
  padding-bottom: 1rem;
}

.post-list{
  padding-top: 2rem;
  justify-content: center;
  text-align: center;
  display: flex;
}

.post-cards-container {
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
}

.card-post {
  background-color: #fff;
  display: flex;
  margin-bottom: 2.5rem;
  width: 100%;
  cursor: pointer;
  transition: 0.43s;
}

.card-post:hover{
  box-shadow: 0px 0px 20px 0px #857d7d;
}

.card-content{
  display: flex;
  width: 100%;
}

.image-post{
  width: 30%;
}

.image-post img{
  width: 100%;
  height: 350px;
}

.post-info{
  width: 70%;
}

.post-title{
  background-color: #000;
  color: #fff;
  text-align: left;
  padding: 0.5rem;
}

.post-title h1{
  transition: 0.43s;
}

.post-title h1:hover{
  color: #FFD146;
}

.post-title h2{
  font-size: 20px;
}

.icon-detail{
  display: flex;
  gap: 0.5rem;
}

.icon-detail img{
  width: 20px;
  height: 20px;
  padding-top: 0.1rem;
}

.post-details {
  padding: 1rem;
  text-align: justify;
}

.post-details p{
  padding-bottom: 1rem;
}

.post-details h2{
  font-weight: bolder;
}

@media only screen and (max-width: 650px) {
  .post-cards-container{
    display: grid;
    grid-template-columns: 1fr;
  }
  .card-post, .card-content{
    display: grid;
    grid-template-columns: 1fr;
  }
  .image-post{
    width: 100%;
  }
  .post-info{
    width: 100%;
  }

  .post-cards-container {
    max-width: 300px;
  }
}

</style>
