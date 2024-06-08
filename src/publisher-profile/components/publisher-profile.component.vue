<script>
import { userApiService } from "../../profile/services/user-api.service.js";
import { homeApiService } from "../../home/services/home-api.service.js";
import { reviewApiService } from "../services/reviews-api.service.js";
import { offerApiService } from "../services/offers-api.service.js"; // Import the new service
import { Review } from "../model/review.entity.js";

export default {
  name: "publisher-profile",
  data() {
    return {
      user: {},
      products: [],
      categories: [],
      reviews: [],
      reviewers: {},
      isLoading: true,
      averageScore: 0, // Agregar averageScore al estado
      acceptedOffersCount: 0, // New state for counting accepted offers
    };
  },
  created() {
    const userId = this.$route.params.id;
    this.fetchUserData(userId);
    this.fetchUserProducts(userId);
    this.fetchCategories();
    this.fetchUserReviews(userId); // Llamada para obtener las reseñas del usuario
    this.fetchUserAcceptedOffers(userId); // Call to fetch the user's accepted offers
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
    async fetchUserReviews(userId) {
      try {
        const response = await new reviewApiService().getReviewsByUserId(userId);
        this.reviews = response.data.map(review => new Review(
            review.id,
            review.content,
            review.score,
            review.get_user_id,
            review.give_user_id
        ));
        await this.fetchReviewerNames();
        this.calculateAverageScore();
      } catch (error) {
        console.error("Error fetching user reviews:", error);
      }
    },
    async fetchReviewerNames() {
      const uniqueUserIds = [...new Set(this.reviews.map(review => review.give_user_id))];
      for (const userId of uniqueUserIds) {
        try {
          const response = await new userApiService().getUserById(userId);
          this.reviewers = { ...this.reviewers, [userId]: response.data.name };
        } catch (error) {
          console.error(`Error fetching reviewer name for user ID ${userId}:`, error);
        }
      }
    },
    calculateAverageScore() {
      if (this.reviews.length === 0) return;
      const totalScore = this.reviews.reduce((acc, review) => acc + review.score, 0);
      this.averageScore = totalScore / this.reviews.length;
    },
    async fetchUserAcceptedOffers(userId) {
      try {
        const response = await new offerApiService().getOffers();
        this.acceptedOffersCount = response.data.filter(offer =>
            (offer.id_user_offers === userId || offer.id_user_get === userId) && offer.status === "Aceptado"
        ).length;
      } catch (error) {
        console.error("Error fetching user accepted offers:", error);
      }
    },
    getStarRating(score) {
      const starRating = [];
      const fullStars = Math.floor(score);
      const decimalPart = score - fullStars;
      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          starRating.push({ icon: 'star' });
        } else if (i === fullStars && decimalPart >= 0.5) {
          starRating.push({ icon: 'star_half' });
        } else {
          starRating.push({ icon: 'stars' });
        }
      }
      return starRating;
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : "Unknown";
    },
    copyProfileLink() {
      const profileLink = `${window.location.origin}/publisher-profile/${this.$route.params.id}`;
      navigator.clipboard.writeText(profileLink)
          .then(() => {
            alert("Profile link copied to clipboard!");
          })
          .catch(err => {
            console.error("Failed to copy: ", err);
          });
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<template>
  <div class="publisher-information" v-if="!isLoading">
    <div class="publisher-content">
      <div class="publisher-products">
        <h1>Perfil de {{ user.name }}</h1>
        <h2 class="subtitle-products">Últimos trueques publicados</h2>
        <div class="list-products">
          <router-link v-for="product in products" :key="product.id" :to="`/product-information/${product.id}`" @click.native="scrollToTop">
            <pv-card class="card-container" >
              <template #title>
                <img v-if="product.images && product.images.length" :src="product.images[0]" alt="Imagen del producto" class="product-image">
                <div v-else class="no-image-placeholder">No image available</div>
                <div class="location-content" v-if="product.location">
                  <img src="../../../public/donations/location-icon.png" style="width: 20px; height: 20px;"/>
                  <h4>{{ product.location.district || 'Unknown' }}, {{ product.location.departament || 'Unknown' }}</h4>
                </div>
              </template>
              <template #content>
                <div class="main-content">
                  <div class="card-content">
                    <h2 class="product-name">{{ product.product_name }}</h2>
                    <h3>{{ getCategoryName(product.category_id) }}</h3>
                    <p class="product-description">{{ product.description }}</p>
                  </div>
                  <hr class="separation-line">
                  <div class="exchange-content">
                    <img src="../../../public/products/exchange.icon.png" style="width: 16px; height: 16px;"/>
                    <p class="product-changefor">{{ product.change_for }}</p>
                  </div>
                </div>
              </template>
              <template #footer>
                <div class="footer-content">
                  <h3>s/.{{ product.price }} valor apróx.</h3>
                </div>
              </template>
            </pv-card>
          </router-link>
        </div>
      </div>
      <div class="publisher-data">
        <div class="contact-information">
          <div class="publisher-image">
            <img :src="user.img" alt="User Image"/>
          </div>
          <div class="publisher-details">
            <h1>{{ user.name }}</h1>
            <h3>{{ user.email }}</h3>
            <div class="publisher-rating">
              <div class="rating-list">
                <div v-for="star in getStarRating(averageScore)" :key="star.icon">
                  <img :src="star.icon === 'star' ? '/public/publisher-profile/full-star-icon.png' : star.icon === 'star_half' ? '/public/publisher-profile/half-star-icon.png' : '/public/publisher-profile/none-star-icon.png'" height="20" width="20" alt="Star">
                </div>
              </div>
              <p>{{ reviews.length }} Reseña(s)</p>
            </div>
            <hr>
            <div class="publisher-exchanged">
              <img src="../../../public/products/exchange.icon.png" height="20" width="20" alt="Exchange Icon"/>
              <p>Trueques realizados: {{ acceptedOffersCount }}</p>
            </div>
            <pv-button class="share-profile" @click="copyProfileLink">
              Compartir perfil
            </pv-button>
          </div>
        </div>
        <div class="reviews-information">
          <h1>Reseñas</h1>
          <div v-for="review in reviews" :key="review.id" class="reviews-content">
            <h2> {{ reviewers[review.give_user_id] }}</h2> <!-- Aquí se muestra el nombre del usuario -->
            <div class="review-rating">
              <div class="stars-list">
                <div v-for="star in getStarRating(review.score)" :key="star.icon">
                  <img :src="star.icon === 'star' ? '/publisher-profile/full-star-icon.png' : star.icon === 'star_half' ? '/publisher-profile/half-star-icon.png' : '/publisher-profile/none-star-icon.png'" height="20" width="20" alt="Star">
                </div>
              </div>
            </div>
            <p>{{ review.content }}</p>
            <hr>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<style scoped>

.publisher-content{
  display: flex;
  gap: 1rem;
}

.publisher-products{
  width: 75%;
}

.list-products{
  display: flex;
  flex-wrap: wrap;
}

.card-container {
  background-color: #fff;
  width: 280px;
  box-shadow: 0px 0px 20px 0px #cccccc;
  height: auto;
  margin: 0.8rem;
  cursor: pointer;
  transition: 0.3s;
}

.card-container:hover {
  box-shadow: 0px 0px 20px 0px #636363;
}

.product-image {
  width: 100%;
  height: 40vh;
  object-fit: cover;
  object-position: center;
}

.no-image-placeholder {
  width: 100%;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #aaa;
  font-size: 1.2em;
}

.location-content {
  background-color: #000;
  color: #fff;
  padding: 0.8rem;
  font-size: 13px;
  font-weight: bolder;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
}

.card-content {
  padding: 0.6rem;
}

.product-name {
  font-weight: bolder;
  font-size: 16.5px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-content h3 {
  font-weight: bolder;
  font-size: 14px;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  color: #989898;
}

.product-description {
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
}

.separation-line {
  border: none;
  height: 1.5px;
  background-color: #ffd146;
  margin-left: 15px;
  margin-right: 15px;
}

.exchange-content {
  padding: 1rem 0.6rem 0.6rem 0.6rem;
  display: flex;
  gap: 5px;
}

.product-changefor {
  font-size: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.5rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.footer-content {
  background-color: #ffd146;
  font-weight: bolder;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  text-align: center;
}


.publisher-products h1{
  background-color: #FFD146;
  padding: 1rem 0.5rem 1rem 1.5rem;
  font-weight: bolder;
  font-size: 30px;
  border-radius: 30px 0px 0px 0px;
  box-shadow: 0px 0px 20px 0px #cccccc;
  margin-bottom: 1rem;
}

.subtitle-products{
  background-color: #000;
  color: #fff;
  padding: 1rem;
  font-weight: bolder;
  font-size: 25px;
  box-shadow: 0px 0px 20px 0px #cccccc;
  text-align: center;
}

.publisher-data{
  width: 25%;
}

.contact-information{
  box-shadow: 0px 0px 20px 0px #cccccc;
  margin-bottom: 1rem;
}

.publisher-image{
  background-color: #FFD146;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.publisher-image img{
  border-radius: 50%;
  border: 4px solid #fff;
  width: 120px;
  height: 120px;
  object-position: center;
  object-fit:cover;
}

.publisher-details{
  padding: 1.5rem;
  text-align: center;
  background-color: #fff;
}

.publisher-details h1{
  font-weight: bolder;
  font-size: 20px;
  padding-bottom: 0.5rem;
}

.publisher-details h3{
  font-weight: bolder;
  padding-bottom: 0.5rem;
}

.publisher-exchanged{
  display:flex;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1.5rem;
  gap: 0.5rem;
  font-weight: bold;
}

.share-profile{
  padding: 0.5rem;
  background-color: #FFD146;
  border-radius: 10px;
  font-weight: bolder;
  transition: 0.43s;
}

.share-profile:hover{
  background-color: #000;
  color: #FFD146;
}

.reviews-information{
  padding: 1.5rem;
  background-color: #fff;
  box-shadow: 0px 0px 20px 0px #cccccc;
}

.reviews-information h1{
  text-align: center;
  font-weight: bolder;
  font-size: 20px;
}

.reviews-content{
  text-align: justify;
  padding-top: 1rem;
}

.reviews-content h2{
  font-weight: bolder;
  font-size: 15px;
  padding-bottom: 0.5rem;
}

.reviews-content p{
  padding-bottom: 1rem;
}

.stars-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 0.5rem;
}

.publisher-rating p{
  padding-bottom: 1rem;
}

.publisher-rating .rating-list img,
.review-rating .stars-list img {
  margin-right: 4px;
}

.rating-list{
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding-bottom: 0.5rem;
  padding-top: 0.25rem;
}

@media screen and (max-width: 900px){
  .publisher-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .publisher-products {
    width: 100%;
  }

  .list-products {
    display: flex;
    flex-direction: column;
    align-items: center;
  }


  .publisher-data {
    width: 100%;
  }
}

</style>