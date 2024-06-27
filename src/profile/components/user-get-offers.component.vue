<template>
  <div class="offers-container">
    <div v-for="offer in offers" :key="offer.id" class="offer-card">
      <div class="offer-card-content">
        <div class="product-header-get">
          <h1>{{ offer.product_get.name }}</h1>
        </div>
        <div class="offer-details">
          <div class="column request-column">
            <div class="request-card">
              <div class="request-header">
                <h1>¿Qué solicitas?</h1>
                <div class="change-for">
                  <img src="../../../public/products/exchange.icon.png" style="height: 18px; width: 18px;">
                  <p>{{offer.product_get.objectChange}}</p>
                </div>
              </div>
              <div class="request-description">
                <p>{{ offer.product_get.description }}</p>
              </div>
              <div class="request-footer">
                <img :src="offer.product_get.photo" alt="Product Image">
              </div>
            </div>
          </div>
          <div class="column offer-column">
            <div class="offer-info-card">
              <div class="offer-info-header">
                <div class="user-image-container">
                  <img v-if="offer.user_get" :src="offer.user_get.photo" alt="User Image">
                </div>
                <h1 v-if="offer.user_get">{{ offer.user_get.name }}</h1>
              </div>
              <div class="offer-content">
                <div class="offer-image-section">
                  <h1>¿Qué te han ofrecido?</h1>
                  <div class="offer-image-container">
                    <img :src="offer.product_offers.photo" alt="Offered Product Image">
                  </div>
                </div>
                <div class="offer-details-section">
                  <h1>{{ offer.product_offers.product_name }}</h1>
                  <div class="offer-description">
                    <h1>Datos:</h1>
                    <p class="offer-description-description">{{ offer.product_offers.description }}</p>
                    <div class="change-for">
                      <img src="../../../public/products/moneda.png" style="height: 18px; width: 18px;">
                      <p> Valor estimado: s/.{{ offer.product_offers.price }}</p>
                    </div>
                    <div class="change-for">
                      <img src="../../../public/donations/location-icon.png" style="height: 18px; width: 18px;">
                      <p> {{ offer.product_offers.district?.name }}, {{ offer.product_offers.district.department.name }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="offer-footer">
                <div class="footer-title">
                  <h1>¿Qué opinas?</h1>
                </div>
                <div class="action-buttons">
                  <button class="accept-button" @click="setStatusAccepted(offer.id)">Aceptar</button>
                  <button @click="openConfirm(offer.id)" class="decline-button" >Declinar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <dialog-accepted-offer
        :visible="dialogAcceptedVisible"
        :data="dialogAcceptedData"
        @close="dialogAcceptedVisible = false"
    />
    <dialog-denied-offer
        :visible="dialogVisible"
        @close="dialogVisible = false"
        @confirm="setStatusDenied(selectedId)"
    />
  </div>
</template>

<script>
import { homeApiService } from "../../home/services/home-api.service";
import { userApiService } from "../services/user-api.service";
import { offerApiService } from "../../publisher-profile/services/offers-api.service";
import DialogDeniedOffer from "./dialog-denied-offer.component.vue";
import DialogAcceptedOffer from "./dialog-accepted-offer.component.vue";

export default {
  name: 'UserGetOffers',
  components: {DialogDeniedOffer,DialogAcceptedOffer},
  data() {
    return {
      offers: [],
      dialogVisible: false,
      dialogAcceptedVisible:false,
      selectedId: null,
      dialogAcceptedData: {},
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
        const userId = localStorage.getItem('user');
        if (!userId) {
          console.error('User ID not found');
          return;
        }

        const response = await this.usersService.getOffersSent(userId);

        const data = response.data;
        if (Array.isArray(data)) {
          const offerPromises = data.map(async (offer) => {
            if (offer.state !== "Pending") {
              return null;
            }
            const newOffer = {
              id: offer.id,
              productOwnerId: offer.productOwnerId,
              productExchangeId: offer.productExchangeId,
              state: offer.state,
              product_get: null,
              product_offers: null,
              user_get: null,
            };

            const [productOwner, productExchange] = await Promise.all([
              this.postsService.getProductById(offer.productOwnerId),
              this.postsService.getProductById(offer.productExchangeId)
            ]);

            if (productOwner.data.userId) {
              const userProfile = await this.usersService.getProfileInfoById(productOwner.data.userId);
              newOffer.user_get = userProfile.data;
            }

            newOffer.product_get = productExchange.data;
            newOffer.product_offers = productOwner.data;

            return newOffer;
          });

          this.offers = (await Promise.all(offerPromises)).filter(Boolean);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    },
    setStatusAccepted(offerId) {
      const offer = this.offers.find(offer => offer.id === offerId);
      if (!offer) {
        console.error('Offer not found');
        return;
      }
      const AcceptedStatus = {
        productOwnerId: offer.productOwnerId,
        productExchangeId: offer.productExchangeId,
        state: "Accepted"
      }
      this.offerService.updateOfferStatus(offerId, AcceptedStatus).then(() => {
        const offer = this.offers.find(offer => offer.id === offerId);
        if (offer) {
          this.offers = this.offers.filter(offer => offer.id !== offerId);
          this.dialogAcceptedVisible = true;
          this.dialogAcceptedData = {
            name: offer.user_get.name,
            img: offer.user_get.photo,
            phone: offer.user_get.phone,
            email: offer.user_get.email
          };
        }
      });
    },
    openConfirm(offerId) {
      this.selectedId = offerId;
      this.dialogVisible = true;
    },
    setStatusDenied(offerId) {
      const offer = this.offers.find(offer => offer.id === offerId);
      if (!offer) {
        console.error('Offer not found');
        return;
      }
      const DeniedStatus = {
        productOwnerId: offer.productOwnerId,
        productExchangeId: offer.productExchangeId,
        state: "Denied"
      }
      this.offerService.updateOfferStatus(offerId, DeniedStatus).then(() => {
        this.offers = this.offers.filter(offer => offer.id !== offerId);
        this.dialogVisible = false;
      });
    }


  }
};
</script>

<style>
h1,h2,h3,h4,h5,h6,p{
  font-family: 'Montserrat', sans-serif;
}
.offers-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
}
.offer-card{
  max-width: 1000px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 20px 0px #cccccc;
}
.product-header-get{
  background-color: black;
  color: #FFD146;
  display: flex;
  align-items: center;
  padding: 16px 16px 5px;
}
.product-header-get h1{
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 0 16px;
}
.request-card{
  height: calc(100% - 20px);
  margin: 20px 20px 20px 0;
  align-content: center;
  align-items: center;
  gap: 15px;
  display: flex;
  flex-direction: column;
  border-radius:6px;
  box-shadow: 0 2px 2px rgba(0,0,0,0.2);
}
.request-header{
  display: flex;
  flex-direction: column;
  margin: 0;
  width: 100%;
  padding: 16px 16px 0;
}
.request-card h1{
  margin: 0 0 16px;
  text-align: left;
}
.request-card img{
  height: 100%;
}
.change-for{
  text-align: left;
}
.change-for img{
  margin-top: 3px;
}
.request-description{
  font-size: 15px;
  margin: 0 16px;
}
.request-description p{
  text-align: left;
}
.request-footer img{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  max-width: 250px;
  max-height: 250px;
  border-radius: 5px;

}
.request-footer{
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.offer-info-card{
  width: auto;
  height: calc(100% - 20px);
  margin: 20px 0 20px 0;
  align-content: center;
  gap: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: none;
  border-radius: 0;
  border-left: solid 1px #DCDCDC;
}
.offer-info-header{
  display: flex;
  align-items: center;
  padding: 16px 16px 0;
}
.offer-info-header h1 {
  font-weight: bold;
  text-align: left;
  margin-left: 1rem;
  font-size: 1.5rem;
}



.user-image-container {
  flex-shrink: 0;
  overflow: hidden;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.user-image-container img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.offer-details{
  width: 100%;
  display:flex;
  flex-wrap: wrap;
  padding: 0 16px 16px;
}
.request-column{
  flex-direction: column;
  display: inline-block;
  order: 1;
  flex:1;
}
.offer-column {
  flex-direction: column;
  display: inline-block;
  order: 2;
  flex: 2;
}
.offer-content{
  width: 100%;
  display:flex;
  padding: 0 16px;
  flex: 1;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.offer-content h1{
  margin: 0 0 16px;
}

.offer-image-section, .footer-title{
  flex-direction: column;
  display: flex;
  box-sizing: border-box;
  order: 1;
  flex:1;
}
.offer-details-section, .action-buttons{
  flex-direction: column;
  box-sizing: border-box;
  display: flex;
  order: 2;
  flex: 1;
}
.footer-title{
  align-items: center;
  align-self: center;
  align-content: center;
  text-align: center;
}
.footer-title h1{
  margin: 0;
  padding: 0;
}
.offer-image-container{
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.offer-image-container img{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  max-width: 300px;
  max-height: 300px;
  border-radius: 5px;
}
.offer-image-section h1, .offer-details-section h1, .offer-footer h1{
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.request-header h1{
  font-size: 20px;
  font-weight: bold;
}
.offer-details-section h1{
  color: #FFD146;
}
.offer-description h1{
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  color: #000000;
  margin: 0;
}
.offer-description p{
  text-align: left;
}
.offer-description-description{
  margin: 0 0 12px;
}
.offer-description {
  padding: 0 20px 0 20px;
  font-size: 15px;
}
.more-info p {
  display: flex;
  align-items: center;
}
.more-info p {
  gap: 5px;
}
.offer-footer{
  display: flex;
  flex-direction: row;
  align-content: center;
}
.offer-footer h1{
  align-content: center;
  padding-left: 1rem;
}
.accept-button{
  cursor: pointer;
  color:#41DB0B ;
  background-color: #EAFFDD;
  border: solid 1px #41DB0B ;
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  width: 8.5rem;
  height: 2.2rem;
  margin: 0 0.5rem 0 0.5rem;
}
.decline-button{
  cursor: pointer;
  color:#FF502A ;
  background-color: #FFD7B9;
  border: solid 1px #FF502A ;
  border-radius: 10px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  width: 8.5rem;
  height: 2.2rem;
  margin: 0 0.5rem 0 0.5rem;
}
.decline-button:hover{
  color:#FFD7B9 ;
  background-color: #FF502A;
  border: none ;
}
.accept-button:hover{
  color:#EAFFDD ;
  background-color: #41DB0B;
  border: none ;
}
.action-buttons{
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  align-content: center;
  align-self: center;
}

@media (max-width: 780px) {
  .offer-content {
    flex-direction: column;
  }

  .offer-image-section, .offer-details-section , .request-card{
    width: 100%;
  }

  .offer-footer{
    display: flex;
    flex-direction: column;
    align-content: center;
  }

  .action-buttons{
    text-align: center;
  }
  .decline-button, .accept-button{
    margin: 0.5rem;
  }
  .offer-description {
    padding: 0 10px 0 10px;
    font-size: 15px;
  }
  .offer-details-section h1{
    margin-top: 1rem;
    margin-bottom: 0;
  }
  .footer-title h1{
    margin: 0;
    padding: 0;
  }
}

@media (max-width: 620px){
  .request-column, .offer-column {
    width: 100%;
  }
  .offer-info-header{
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .user-image-container{
    width: 100px;
    height: 100px;
    margin-left: 0;
  }
  .offer-details {
    flex-direction: column;
  }

  .offer-info-card{
    border-left: none;
    border-top: solid 1px #C2C2C2;
  }
}

@media (max-width: 420px){
  .request-column, .offer-column {
    width: 100%;
  }
  .offer-info-header{
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .user-image-container{
    width: 100px;
    height: 100px;
  }
  .offer-details {
    flex-direction: column;
  }
  .request-footer {
    width: 200px;
    height: 200px;
  }
  .action-buttons{
    display: flex;
    flex-direction: column;
    text-align: center;
  }
}
</style>
