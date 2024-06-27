<template>
  <div class="user-offers-title">
    <p>Intercambios Completados con Éxito:</p>
  </div>
  <div class="line-text">
    <div class="line"></div>
  </div>
  <div class="exchange__container">
    <div v-for="(offer, index) in offersMade" :key="index" class="list__of_exchanges">
      <div v-if="offer.state === 'Accepted'" class="example__card__exchanges">
        <div class="exchange__info">
          <div class="product__offer">
            <img class="card__img__exchanges" :src="offer.setProductGet.photo">
            <p class="offer__text">Ofreciste un {{ offer.setProductGet.name }}</p>
          </div>
          <img class="arrows" src="../../../public/products/exchange.icon.png" alt="">
          <div class="product__get">
            <img class="card__img__exchanges" :src="offer.setProductOffers.photo">
            <p class="get__text">Conseguiste un {{ offer.setProductOffers.name }}</p>
          </div>
        </div>
        <div class="review__info">
          <p class="question">¿Quieres puntuar la comunicación con {{ offer.setUserGet.name }}?</p>
          <div class="qualification">
            <p class="point">Puntuación:</p>
            <div class="star-rating">
              <i v-for="icon in maxRatingArr"
                 :key="icon"
                 @mouseenter="HandleMouseEnter(icon, index, 'made')"
                 @mouseleave="HandleMouseLeave(index, 'made')"
                 @click="Rating(icon, index, 'made')"
                 :class="{ 'pi pi-star-fill': true, 'checked': selectedStar.made[index] > icon }">
              </i>
            </div>
          </div>
          <p class="suggest">Deja una reseña y comparte tu experiencia con {{ offer.setUserGet.name }}:</p>
          <textarea v-model="inputs.made[index]" class="review__text" placeholder="Escribe aquí..."></textarea>
          <button class="send__review" @click="sendReview(index, offer.setUserGet.id, 'made',offer.id)">Publicar</button>
        </div>
      </div>
    </div>
    <div v-for="(offer, index) in offersReceived" :key="index" class="list__of_exchanges">
      <div v-if="offer.state === 'Accepted'" class="example__card__exchanges">
        <div class="exchange__info">
          <div class="product__offer">
            <img class="card__img__exchanges" :src="offer.setProductGet.photo">
            <p class="offer__text">Ofreciste un {{ offer.setProductGet.name }}</p>
          </div>
          <img class="arrows" src="../../../public/profile/arrows.svg" alt="">
          <div class="product__get">
            <img class="card__img__exchanges" :src="offer.setProductOffers.photo">
            <p class="get__text">Conseguiste un {{ offer.setProductOffers.name }}</p>
          </div>
        </div>
        <div class="review__info">
          <p class="question">¿Quieres puntuar la comunicación con {{ offer.setUserGet.name }}?</p>
          <div class="qualification">
            <p class="point">Puntuación:</p>
            <div class="star-rating">
              <i v-for="icon in maxRatingArr"
                 :key="icon"
                 @mouseenter="HandleMouseEnter(icon, index, 'received')"
                 @mouseleave="HandleMouseLeave(index, 'received')"
                 @click="Rating(icon, index, 'received')"
                 :class="{ 'pi pi-star-fill': true, 'checked': selectedStar.received[index] > icon }">
              </i>
            </div>
          </div>
          <p class="suggest">Deja una reseña y comparte tu experiencia con {{ offer.setUserGet.name }}:</p>
          <textarea v-model="inputs.received[index]" class="review__text" placeholder="Escribe aquí..."></textarea>
          <button class="send__review" @click="sendReview(index, offer.setUserGet.id, 'received',offer.id)">Publicar</button>
        </div>
      </div>
    </div>
    <DialogReviewComponent :visible="dialogVisible" @close="dialogVisible = false" />
  </div>
</template>

<script>
import { offerApiService } from "../../publisher-profile/services/offers-api.service.js";
import { homeApiService } from "../../home/services/home-api.service.js";
import { userApiService } from "../services/user-api.service.js";
import { reviewApiService } from "../../publisher-profile/services/reviews-api.service.js";
import DialogReviewComponent from "./dialog-review.component.vue";

export default {
  name: 'CompleteExchanges',
  components: {
    DialogReviewComponent
  },
  data() {
    return {
      offersMade: [],
      offersReceived: [],
      userMe: {},
      maxRating: 5,
      selectedStar: {
        made: [],
        received: []
      },
      maxRatingArr: [],
      previousSelection: {
        made: [],
        received: []
      },
      inputs: {
        made: [],
        received: []
      },
      dialogVisible: false,
      offersService: new offerApiService(),
      postService: new homeApiService(),
      userService: new userApiService(),
      reviewService: new reviewApiService(),
    };
  },
  created() {
    this.maxRatingArr = Array.from({ length: this.maxRating }, (_, index) => index);
    this.getUser();
    this.getAllOffers();
    this.getAllOffers2();
  },
  methods: {
    async getUser() {
      try {
        const userId = Number(localStorage.getItem('user'));
        const response = await this.userService.getUserById(userId);
        this.userMe = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getAllOffers() {
      try {
        const response = await this.offersService.getOffersByUserOwnId(Number(localStorage.getItem('user')));
        const data = response.data;
        if (Array.isArray(data)) {
          for (const offer of data) {
            console.log(offer);
            const setProductOffers = await this.getProductById(offer.productExchangeId);
            console.log(setProductOffers);
            const setProductGet = await this.getProductById(offer.productOwnerId);
            const { data: setUserGet } = await this.userService.getUserById(setProductGet.userId);
            console.log("primera parte", setUserGet);
            this.offersMade.push({ ...offer, setProductOffers, setProductGet, setUserGet });
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getAllOffers2() {
      try {
        const response = await this.offersService.getOffersByUserChangeId(Number(localStorage.getItem('user')));
        const data = response.data;
        if (Array.isArray(data)) {
          for (const offer of data) {
            const setProductOffers = await this.getProductById(offer.productOwnerId);
            const setProductGet = await this.getProductById(offer.productExchangeId);
            const { data: setUserGet } = await this.userService.getUserById(setProductOffers.userId);
            console.log("la otra parte", setUserGet);
            this.offersReceived.push({ ...offer, setProductOffers, setProductGet, setUserGet });
          }
        } else {
          console.error('Data is not an array');
        }
      } catch (error) {
        console.error(error);
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
    HandleMouseEnter(icon, index, type) {
      this.selectedStar[type][index] = icon + 1;
    },
    HandleMouseLeave(index, type) {
      if (this.previousSelection[type][index] !== 0) {
        this.selectedStar[type][index] = this.previousSelection[type][index];
      } else {
        this.selectedStar[type][index] = 0;
      }
    },
    Rating(icon, index, type) {
      this.selectedStar[type][index] = icon + 1;
      this.previousSelection[type][index] = this.selectedStar[type][index];
    },
    async sendReview(index, otherId, type, offerId) {
      if (this.selectedStar[type][index] === 0) {
        return;
      }
      const review = {
        message: this.inputs[type][index],
        score: this.selectedStar[type][index],
        state: "Accepted",
        profileAuthorId: this.userMe.id,
        profileReceptorId: otherId,
        offerId: offerId
      };
      try {
        await this.reviewService.postReview(review);
        this.dialogVisible = true;
      } catch (error) {
        console.error('Error posting review:', error);
      }
    },
  }
};
</script>
s

<style>
.list__of_exchanges{
  width: 100%;
}
.line-text{
  display: flex;
  align-items: center;
  align-content: center;
}
.line {
  margin-bottom: 0.5rem;
  flex: 1;
  height: 1px;
  background-color: #C2C2C2;
  margin-left: 3rem;
  margin-right: 3rem;
}
.exchange__container{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
.example__card__exchanges{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 20px;
  gap: 20px;
  background-color: #fff;
  box-shadow: 0 0 20px 0 #cccccc;
  margin-bottom: 2.5rem;
}

.product__offer{
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 10px;
}

.product__get{
  display: flex;
  flex-direction: column-reverse;
  width: fit-content;
  gap: 10px;
}
.card__img__exchanges{
  width: 385px;
  height: 300px;
  aspect-ratio: 1/1;
  object-fit: cover;

  object-position: center;
}

.arrows{
  width: 10%;
  height: 200px;
  margin: auto 0;
}

.offer__text{
  background-color: #FFD146;
  border-radius: 0 0 25px 0;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: bolder;
  margin: 0;
  padding: 10px;
  text-align: center;
}

.get__text{
  background-color: #FFD146;
  border-radius: 25px 0 0 0;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: bolder;
  margin: 0;
  padding: 10px;
  text-align: center;
}

.exchange__info{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.review__info{
  width: 25%;
  height: 100%;
  display: flex;
  text-align:left;
  flex-direction: column;
  gap: 15px;
  padding: 5px 10px;
}

.question{
  margin: 0;
  font-weight: bolder;
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
}

.point{
  margin: 0 10px 0 0;
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
}

.qualification{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}

.suggest{
  margin: 0;
  font-weight: bolder;
  font-family: "Montserrat", sans-serif;
  font-size: 20px;
}

.checked{
  color: #FFD146;
  cursor: pointer;
}

.review__text{
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  resize: none;
  height: 50px;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #C2C2C2;
}

.send__review{
  background-color: black;
  color: #FFD146;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: bolder;
  width: 40%;
  padding: 10px 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
.send__review:hover{
  background-color: #FFD146;
  color: black;
}
@media (max-width: 1268px) {
  .example__card__exchanges{
    flex-direction: column;
    gap: 20px;
  }

  .review__text{
    width: 50%;
  }

  .review__info{
    width: 100%;
    text-align: center;
    align-items: center;
  }
}

@media (max-width: 900px) {


  .exchange__info{
    width: 100%;
    height: 390px;
  }

  .card__img__exchanges{
    width: 200px;
    height: 80%;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: center;
  }

  .offer__text{
    width: 180px;
    height: 20%;
    background-color: #FFD146;
    border-radius: 0 0 25px 0;
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    font-weight: bolder;
    margin: 0;
    padding: 10px;
    text-align: center;
    display: flex;
    align-items: center;
  }

  .example__card__exchanges{
    width: 100%;
    padding: 20px;
    gap: 20px;
  }
  .get__text{
    height: 20%;
    width: calc(100%);
    background-color: #FFD146;
    border-radius: 25px 0 0 0;
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    font-weight: bolder;
    margin: 0;
    padding: 10px;
    text-align: center;
    display: flex;
    align-items: center;
  }
}

@media (max-width: 900px){
  .exchange__info{
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: column;
  }
  .product__offer{
    width: fit-content;
  }
  .review__info{
    width: 100%;
    display: flex;
  }
  .card__img__exchanges{
    max-width:100% ;
    width: 800px;
    object-fit: cover;
    object-position: center;
  }

  .offer__text{
    width: calc(100%);
    background-color: #FFD146;
    border-radius: 0 0 25px 0;
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    font-weight: bolder;
    margin: 0;
    padding: 10px;
    text-align: center;
    display: flex;
    align-items: center;
  }

  .get__text{
    width: calc(100%);
    background-color: #FFD146;
    border-radius: 25px 0 0 0;
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    font-weight: bolder;
    margin: 0;
    padding: 10px;
    text-align: center;
    display: flex;
    align-items: center;
  }

  .arrows{
    align-items: center;
    text-align: center;
    align-content: center;
    align-self: center;
    width: 100%;
    max-width: 150px;
    max-height: 150px;
    transform: rotate(90deg);
  }
  .product__get{
    height: auto;
    width: fit-content;
  }
  .review__text, .send__review{
    width: 80%;
  }

}

@media (max-width: 340px) {
  .qualification{
    flex-direction: column;
  }

  .point{
    margin: 0;
    padding-bottom: 5px;
  }
}

</style>
