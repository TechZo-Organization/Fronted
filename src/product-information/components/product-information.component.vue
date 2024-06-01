<script>
import { homeApiService } from "../../home/services/home-api.service.js";
import { userApiService } from "../../profile/services/user-api.service.js";

export default {
  name: "product-information",
  data() {
    return {
      product: null,
      user: null,
      categories: [],
    };
  },
  async created() {
    const productId = this.$route.params.id; // Obtener el ID del producto desde los parámetros de la ruta
    try {
      const homeService = new homeApiService();
      const productResponse = await homeService.getProductById(productId);
      this.product = productResponse.data;

      const userId = this.product.user_id;
      const userService = new userApiService();
      const userResponse = await userService.getUserById(userId);
      this.user = userResponse.data;

      // Obtener las categorías
      const categoriesResponse = await homeService.getCategoriesProduct();
      this.categories = categoriesResponse.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  },
  computed: {
    categoryName() {
      const category = this.categories.find(cat => cat.id === this.product.category_id);
      return category ? category.name : 'Unknown';
    }
  }
};
</script>

<template>
  <div class="product-information" v-if="product && user">
    <h1 class="product-title">{{ product.product_name }}</h1>
    <br />
    <div class="product-container">
      <div class="product-content">
        <div class="product-image">
          <img :src="product.images[0]" alt="Product Image" />
        </div>
        <div class="product-text">
          <h1>s/. {{ product.price }} valor aprox.</h1>
          <div class="product-details">
            <h4>ID#{{ product.id }}</h4>
            <p>{{ product.description }}</p>
          </div>
        </div>
        <div class="product-exchange">
          <h2>Detalles:</h2>
          <h4>¿Dónde puedo intercambiar este objeto?</h4>
          <p>{{ product.location.district }}</p>
          <h4>¿Cambio por?</h4>
          <p>{{ product.change_for }}</p>
          <div class="category-exchange">
            <p>Categoría:</p>
            <p class="category-text">{{ categoryName }}</p>
          </div>
        </div>
      </div>
      <div class="user-content">
        <div class="user-image">
          <img :src="user.img" alt="User Image" />
        </div>
        <div class="user-details">
          <h1>{{ user.name }}</h1>
          <pv-button class="show-profile">
            Ver Perfil
          </pv-button>
          <hr />
          <div class="offer-profile">
            <h2>¿Estás interesado?</h2>
            <pv-button class="offer-product">
              <img
                  src="../../../public/product-information/offer-icon.png"
                  height="30"
                  width="30"
                  alt="Offer Icon"
              />
              Ofertar
            </pv-button>
          </div>
          <hr />
          <div class="favorite-profile">
            <pv-button class="favorite-product">
              <img src="../../../public/product-information/favorite-icon.png" alt="Favorite Icon" />
            </pv-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.product-title{
  background-color: #FFD146;
  padding: 1rem 0.5rem 1rem 1.5rem;
  font-weight: bolder;
  font-size: 30px;
  border-radius: 30px 0px 0px 0px;
  box-shadow: 0px 0px 20px 0px #cccccc;
}

.product-container{
  display: flex;
  gap: 1rem;
}

.product-content{
  width: 70%;
  height: 100%;
}

.product-image {
  background-color: #fff;
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 20px 0px #cccccc;
  margin-bottom: 1rem;
}

.product-image img {
  width: 50%;
  height: auto;
}

.product-text{
  background-color: #fff;
  box-shadow: 0px 0px 20px 0px #cccccc;
  margin-bottom: 1rem;
}

.product-text h1{
  background-color: #000;
  color: #FFD146;
  padding: 1rem;
  font-weight: bolder;
  font-size: 30px;
}

.product-details{
  padding: 1.5rem;
}

.product-details h4{
  font-weight: bolder;
  font-size: 25px;
  padding-bottom: 1rem;
}

.product-details p{
  font-size: 18px;
  padding-bottom: 1rem;
  text-align: justify;
}

.product-exchange{
  background-color: #fff;
  box-shadow: 0px 0px 20px 0px #cccccc;
  padding: 1.5rem;
}

.product-exchange h2{
  font-weight: bolder;
  font-size: 25px;
}

.product-exchange h4{
  font-weight: bolder;
  font-size: 18px;
  padding-bottom: 0.5rem;
  padding-top: 1rem;
}

.product-exchange p{
  font-size: 18px;
}

.category-exchange{
  display: flex;
  padding-top: 1rem;
  padding-bottom: 1rem;
  align-items: center;
  gap: 1rem;
}

.category-text{
  color: #FFD146;
  padding: 0.3rem;
  border: 2px solid #FFD146;
  font-weight: bolder;
  border-radius: 10px;
}

.user-content{
  width: 30%;
  height: 100%;
  box-shadow: 0px 0px 20px 0px #cccccc;
}

.user-image{
  background-color: #FFD146;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-image img{
  border-radius: 50%;
  border: 4px solid #fff;
  width: 120px;
  height: 120px;
}

.user-details{
  text-align: center;
  background-color: #fff;
  padding: 1rem;
}

.user-details h1{
  font-weight: bolder;
  font-size: 25px;
  padding-bottom: 1rem;
}

.show-profile{
  background-color: #FFD146;
  color: #000;
  font-weight: bolder;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: 0.43s;
  margin-bottom: 1rem;
}

.show-profile:hover{
  background-color: #000;
  color: #FFD146;
}

.offer-profile{
  padding: 1rem;
  margin-bottom: 1rem;
}

.offer-profile h2{
  text-align: left;
  font-size: 18px;
  font-weight: bolder;
  margin-bottom: 1rem;
}

.offer-product{
  background-color: #fff;
  border: 2px solid #FFD146;
  width: 100%;
  text-align: center;
  justify-content: center;
  padding: 0.3rem;
  border-radius: 10px;
  font-weight: bolder;
  transition: 0.43s;
  gap: 0.25rem;
}

.offer-product:hover{
  color: #FFD146;
}

.favorite-product{
  background-color: #FFD146;
  padding: 1rem;
  border-radius: 50%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  transition: 0.43s;
}

.favorite-product:hover{
  box-shadow: 0px 0px 20px 0px #f8cc00;
}

.favorite-product img{
  width: 40px;
  height: 40px;
}

@media screen and (max-width: 900px){
  .product-information h1{
    font-size: 25px;
  }

  .product-container{
    display: grid;
    grid-template-columns: 1fr;
  }

  .product-content{
    width: 100%;
  }
  




  .user-content{
    width: 100%;
  }
}
</style>