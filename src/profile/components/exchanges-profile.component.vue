<template>
  <div>
    <div class="exchanges__title">
      <p>Intercambios Completados con Éxito:</p>
    </div>
    <div class="line-text">
      <div class="line"></div>
    </div>
    <div class="complete__container">
      <div v-for="(offer, index) in offers" :key="index">
        <div v-if="offer.status === 'Aceptado'" class="example-card">
          <div class="exchange__info">
            <div class="product__offer">
              <img class="card__img" :src="offer.setProductOffers.images">
              <p class="offer__text">Ofreciste un {{ offer.setProductOffers.product_name }}</p>
            </div>
            <img class="arrows" src="../../../public/products/exchange.icon.png" alt="">
            <div class="product__get">
              <img class="card__img" :src="offer.setProductGet.images">
              <p class="get__text">Conseguiste un {{ offer.setProductGet.product_name }}</p>
            </div>
          </div>
          <div class="review__info">
            <p class="question">¿Quieres puntuar la comunicación con {{ offer.setUserGet.name }}?</p>
            <div class="qualification">
              <p class="point">Puntuación:</p>
              <div class="star-rating">
                <i v-for="icon in maxRatingArr" :key="icon" @mouseenter="HandleMouseEnter(icon, index)" @mouseleave="HandleMouseLeave(index)" @click="Rating(icon, index)" :class="{ checked: selectedStar[index] > icon }">star</i>
              </div>
            </div>
            <p class="suggest">Deja una reseña y comparte tu experiencia con {{ offer.setUserGet.name }}:</p>
            <textarea v-model="inputs[index]" class="review__text" placeholder="Escribe aquí..."></textarea>
            <button class="send__review" @click="sendReview(index, offer.setUserGet.id)">Publicar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { offerApiService } from "../../publisher-profile/services/offers-api.service.js";
import { homeApiService } from "../../home/services/home-api.service.js";
import { userApiService } from "../services/user-api.service.js"
import { reviewApiService } from "../../publisher-profile/services/reviews-api.service.js";

export default {
  name: 'CompleteExchanges',
  data() {
    return {
      offers: [],
      userMe: {},
      maxRating: 5,
      selectedStar: [],
      maxRatingArr: [],
      previousSelection: [],
      inputs: [],
      offersService: new offerApiService(),
      postService: new homeApiService(),
      userService: new userApiService(),
      reviewService: new reviewApiService(),
    };
  },
  created() {
    this.maxRatingArr = Array(this.maxRating).fill(0);
    this.getUser();
    this.getAllOffers();
    this.getAllOffers2();
  },
  methods: {
    async getUser() {
      try {
        const userId = Number(localStorage.getItem('user'));
        console.log('User ID:', userId);
        const response = await this.userService.getUserById(userId);
        console.log('User data:', response.data);
        this.userMe = response.data;
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
    async getAllOffers() {
      try {
        const response = await this.offersService.getOffers();
        const data = response.data;
        if (Array.isArray(data)) {
          for (const offer of data) {
            if (offer.id_user_offers === localStorage.getItem('user')) {
              const setProductOffers = await this.getProductById(offer.id_product_offers);
              const setProductGet = await this.getProductById(offer.id_product_get);
              const setUserGet = await this.userService.getUserById(offer.id_user_get);
              this.offers.push({ ...offer, setProductOffers, setProductGet, setUserGet });
            }
          }
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    },
    async getAllOffers2() {
      try {
        const response = await this.offersService.getOffers();
        const data = response.data;
        if (Array.isArray(data)) {
          for (const offer of data) {
            if (offer.id_user_get === localStorage.getItem('user')) {
              const setProductOffers = await this.getProductById(offer.id_product_offers);
              const setProductGet = await this.getProductById(offer.id_product_get);
              const setUserGet = await this.userService.getUserById(offer.id_user_offers);
              this.offers.push({ ...offer, setProductOffers, setProductGet, setUserGet });
            }
          }
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    },
    async getProductById(productId) {
      try {
        const response = await this.postService.getProductById(productId);
        return response.data;
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    },
    HandleMouseEnter(indexRate, indexOffer) {
      this.selectedStar[indexOffer] = indexRate + 1;
    },
    HandleMouseLeave(indexOffer) {
      if (this.previousSelection[indexOffer] !== 0) {
        this.selectedStar[indexOffer] = this.previousSelection[indexOffer];
      } else {
        this.selectedStar[indexOffer] = 0;
      }
    },
    Rating(indexRate, indexOffer) {
      this.selectedStar[indexOffer] = indexRate + 1;
      this.previousSelection[indexOffer] = this.selectedStar[indexOffer];
    },
    async sendReview(indexOffer, otherId) {
      if (this.selectedStar[indexOffer] === 0) {
        alert("Por favor seleccione una puntuación de estrellas");
        return;
      }
      const review = {
        content: this.inputs[indexOffer],
        score: this.selectedStar[indexOffer],
        get_user_id: otherId,
        give_user_id: this.userMe.id
      };
      console.log(review);
      try {
        await this.reviewService.postReview(review);
        // Aquí puedes realizar alguna acción adicional después de que la revisión sea enviada exitosamente
      } catch (error) {
        console.error('Error posting review:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Your CSS styles here */
</style>
