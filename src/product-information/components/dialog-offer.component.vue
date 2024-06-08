<script>
import { userApiService } from "../../profile/services/user-api.service.js";
import { homeApiService } from "../../home/services/home-api.service.js";
import {offerApiService} from "../../publisher-profile/services/offers-api.service.js";
import DialogOfferAccepted from "./dialog-offer-accepted.component.vue";

export default {
  name: 'dialog-offer-content',
  components: {DialogOfferAccepted},
  props: {
    visible: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      user: {},
      products: [],
      categories: [],
      visibleAccepted: false,
      productName: '',
      userName: ''
    };
  },
  created() {
    const userId = localStorage.getItem('user');
    this.fetchUserData(userId);
    this.fetchUserProducts(userId);
    this.fetchCategories();
  },
  methods: {
    async fetchUserData(userId) {
      try {
        const response = await new userApiService().getUserById(userId);
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    async fetchUserProducts(userId) {
      try {
        const response = await new homeApiService().getProduct();
        this.products = response.data.filter(product => product.user_id === userId);
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching user products:", error);
        this.isLoading = false;
      }
    },
    async fetchCategories() {
      try {
        const response = await new homeApiService().getCategoriesProduct();
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : "Unknown";
    },
    closeDialog() {
      this.$emit('close');
      document.body.classList.remove('no-scroll');
    },
    closeOfferConfirmation() {
      this.visibleAccepted = false;
      document.body.classList.remove('no-scroll');
    },
    async handleClick(productId) {
      try {
        const productToGetId = window.location.pathname.split('/').pop();
        const productToGetResponse = await new homeApiService().getProductById(productToGetId);
        const productToGet = productToGetResponse.data;

        const userToGetResponse = await new userApiService().getUserById(productToGet.user_id);
        const userToGet = userToGetResponse.data;

        this.createOffer(productId, productToGet);
        document.body.classList.add('no-scroll');
        this.productName = this.products.find(product => product.id === productId).product_name;
        this.userName = userToGet.name;// Asegúrate de que el nombre del usuario está en la propiedad 'name'
        this.visibleAccepted = true;
      } catch (error) {
        console.error("Error fetching product to get data:", error);
      }
    },
    async createOffer(productId, productToGet) {
      const userId = localStorage.getItem('user');
      try {
        const response = await new offerApiService().getOffers();
        const allOffers = response.data;
        const newOfferId = allOffers.length + 1;

        const offerData = {
          id: newOfferId,
          id_user_offers: userId,
          id_product_offers: productId,
          id_user_get: productToGet.user_id,
          id_product_get: productToGet.id,
          status: "Pendiente"
        };

        await new offerApiService().createOffer(offerData);

        this.$emit('close');
      } catch (error) {
        console.error("Error creating offer:", error);
      }
    }
  }
};
</script>

<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog">
      <div style="display: flex; justify-content: flex-end;">
        <pv-button @click="closeDialog">
          <img src="../../../public/toolbar/close-icon.png" height="30" width="30"/>
        </pv-button>
      </div>
      <div class="dialog-container">
        <h1>¿Qué ofreces a cambio?</h1>
        <div class="product-offer-list" v-for="product in products" :key="product.id">
          <div class="product-offer-card">
            <div class="product-offer-image">
              <img v-if="product.images && product.images.length" :src="product.images[0]" />
              <pv-button @click="handleClick(product.id)" class="b-confirm-offer"><b>Confirmar</b></pv-button>
            </div>
            <div class="product-offer-details">
              <h1>{{ product.product_name }}</h1>
              <h3>{{ getCategoryName(product.category_id) }}</h3>
              <p class="detail-description">{{ product.description }}</p>
              <div class="icon-details">
                <img src="../../../public/donations/location-icon.png" height="20" width="20"/>
                <p>{{ product.location.district || 'Unknown' }}, {{ product.location.departament || 'Unknown' }}</p>
              </div>
              <div class="icon-details">
                <img src="../../../public/products/exchange.icon.png" height="20" width="20"/>
                <p>{{ product.change_for }}</p>
              </div>
              <div class="price-details">
                <h2>Valor aproximado s/.{{ product.price }}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <dialog-offer-accepted
      :visible="visibleAccepted"
      @close="closeOfferConfirmation()"
      :productName="productName"
      :userName="userName"
  />
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.dialog {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  width: 100%;
  margin: 1rem;
  max-height: 100vh;
  overflow: hidden;
}

.dialog-container {
  padding: 1rem;
  text-align: center;
  max-height: 90vh;
  overflow-y: auto;
}

.dialog-container h1 {
  font-size: 30px;
  font-weight: bolder;
  padding-bottom: 1rem;
  text-align: left;
  padding-top: 0.5rem;
  padding-left: 1rem;
  border-radius: 30px 0px 0px 0px;
  background-color: #FFD146;
}

.product-offer-list {
  display: flex;
  flex-direction: column;
}

.product-offer-card{
  display: flex;
  background-color: #fff;
  box-shadow: 0px 0px 20px 0px #c6c6c6;
  margin-top: 1.5rem;
}

.product-offer-image{
  width: 30%;
  padding: 1rem;
  text-align: center;
  justify-content: center;
}

.product-offer-image img{
  max-width: 100%;
  min-height: 300px;
  object-fit: cover;
  object-position: center;
}


.b-confirm-offer{
  background-color: #000;
  color: #fff;

  padding: 0.5rem 1rem;
  justify-content: center;
  margin-top: 1rem;
  border-radius: 10px;
  transition: 0.43s;
}

.b-confirm-offer:hover{
  color: #FFD146;
}

.product-offer-details{
  width: 70%;
  padding: 2rem;
}

.product-offer-details h1{
  background-color: #fff;
  padding: 0rem;
}

.product-offer-details h3{
  font-weight: bolder;
  text-align: left;
  color: #7c7777;
}

.product-offer-details p{
  text-align: left;
}

.detail-description{
  padding-top: 1rem;
  font-weight: normal;
}

.icon-details{
  padding-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
}

.icon-details p{
  font-weight: normal;
}

.price-details h2{
  text-align: left;
  font-weight: bolder;
  font-size: 20px;
  padding-top: 2rem;
}

@media only screen and (max-width: 750px) {
  .dialog-container h1 {
    font-size: 25px;
  }

  .product-offer-card{
    display: grid;
  }
  .product-offer-image{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .product-offer-image img{
    height: auto;
    max-width: 200px;
  }

  .product-offer-details{
    width: 100%;
  }
  .product-offer-details h1{
    font-size: 20px;
  }
}

</style>
