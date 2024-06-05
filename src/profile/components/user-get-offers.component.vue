<template>
  <div class="sent-offers-cards-container">
    <div v-for="offer in offers" :key="offer.id" class="container-get-offers">
      <div class="get-offers-card">
        <div class="header-product-name">
          <h1>{{ offer.product_get.product_name }}</h1>
        </div>
        <div class="content">
          <div class="column col1">
            <div class="card-get">
              <div class="header-card-get">
                <h1>¿Qué solicitas?</h1>
                <div class="change-for">
                  <img src="../../../public/products/exchange.icon.png" style="height: 20px; width: 20px;">
                  <p>{{offer.product_get.change_for}}</p>
                </div>
              </div>
                <div class="content-card-get">
                  <p>{{ offer.product_get.description }}</p>
                </div>
                <div class="footer-card-get">
                  <img :src="offer.product_get.images" alt="Product Image">
                </div>
            </div>
          </div>
          <div class="column col2">
            <div class="card-offer">
              <div class="offer-content">
                <div class="col11">
                  <div class="avatar-card-get">
                    <img v-if="offer.user_offer" :src="offer.user_offer.img" alt="User Image">
                    <h1 v-if="offer.user_offer">{{ offer.user_offer.name }}</h1>
                  </div>
                  <h1>¿Qué te han ofrecido?</h1>
                  <div class="content-image">
                    <img :src="offer.product_offers.images" alt="Offered Product Image">
                  </div>
                </div>
                <div class="col22">
                  <h1>{{ offer.product_offers.product_name }}</h1>
                  <div class="content-description">
                    <h1>Datos:</h1>
                    <p>{{ offer.product_offers.description }}</p>
                    <div class="content-more-info">
                      <p> Valor estimado: s/.{{ offer.product_offers.price }}</p>
                      <p> {{ offer.product_offers.location?.district }}, {{ offer.product_offers.location?.departament }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="footer-card-offer">
                <div class="footer-title">
                  <h1>¿Qué opinas?</h1>
                </div>
                <div class="status">
                  <button class="btn-accepted" @click="setStatusAccepted(offer.id)">Aceptar</button>
                  <button class="btn-denied" @click="setStatusDenied(offer.id)">Declinar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { homeApiService } from "../../home/services/home-api.service";
import { userApiService } from "../services/user-api.service";
import { offerApiService } from "../../publisher-profile/services/offers-api.service";
import { Offer } from "../../publisher-profile/model/offer.entity";

export default {
  name: 'user-get-offers',
  data() {
    return {
      offers: [],
      postsService: new homeApiService(),
      usersService: new userApiService(),
      offerService: new offerApiService()
    };
  },
  created() {
    this.getAllOffers();
  },
  methods: {
    async getAllOffers() {
      try {
        const response = await this.offerService.getOffers();
        const data = response.data;
        if (Array.isArray(data)) {
          const userId = localStorage.getItem('user');
          const offerPromises = data.map(async (offer) => {
            if (offer.id_user_get === userId && offer.status === "Pendiente") {
              const newOffer = new Offer(
                  offer.id,
                  offer.id_user_offers,
                  offer.id_product_offers,
                  offer.id_user_get,
                  offer.id_product_get,
                  offer.status
              );

              const [productGet, productOffers, userGet] = await Promise.all([
                this.postsService.getProductById(offer.id_product_get),
                this.postsService.getProductById(offer.id_product_offers),
                this.usersService.getUserById(offer.id_user_offers)
              ]);

              newOffer.setProductGet = productGet.data;
              newOffer.setProductOffers = productOffers.data;
              newOffer.setUserOffers = userGet.data;

              return newOffer;
            }
          });

          this.offers = (await Promise.all(offerPromises)).filter(Boolean);
        } else {
        }
      } catch (error) {
      }
    },
    setStatusAccepted(offerId) {
      this.offerService.updateOfferStatus(offerId, 'Aceptado').then(() => {
        const offer = this.offers.find(offer => offer.id === offerId);
        if (offer) {
          this.offers = this.offers.filter(offer => offer.id !== offerId);
          this.$root.$emit('bv::show::modal', 'dialog-successful-exchange', {
            data: {
              name: offer.user_offer.name,
              img: offer.user_offer.img,
              phone: offer.user_offer.phone,
              email: offer.user_offer.email
            }
          });
        }
      });
    },
    setStatusDenied(offerId) {
      this.$root.$emit('bv::show::modal', 'dialog-denied-offer', {
        callback: (result) => {
          if (result) {
            this.offerService.updateOfferStatus(offerId, 'Denegado').then(() => {
              this.offers = this.offers.filter(offer => offer.id !== offerId);
            });
          }
        }
      });
    }
  }
};
</script>

<style>


</style>
