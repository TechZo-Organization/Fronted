<script>
import { homeApiService } from "../../home/services/home-api.service";
import { userApiService } from "../services/user-api.service";
import { offerApiService } from "../../publisher-profile/services/offers-api.service";

export default {
  name: 'user-sent-offers',
  data() {
    return {
      offers: [],
      postsService: new homeApiService(),
      usersService: new userApiService(),
      offerService: new offerApiService()
    };
  },
  mounted() {
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

        const response = await this.usersService.getOffersMade(userId);
        const data = response.data;
        if (Array.isArray(data)) {
          const offerPromises = data.map(async (offer) => {
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

            newOffer.product_get = productExchange.data;
            newOffer.product_offers = productOwner.data;

            if (productExchange.data.userId) {
              const userProfile = await this.usersService.getProfileInfoById(productExchange.data.userId);
              newOffer.user_get = userProfile.data;
            }

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
    getStatusStyles(state) {
      let styles = {};
      switch (state) {
        case 'Accepted':
          styles = {
            color: '#41DB0B',
            backgroundColor: '#EAFFDD',
            border: '1px solid #41DB0B',
            borderRadius: '10px',
            width: '8.5rem',
            height: '2.2rem',
            textAlign: 'center',
            alignContent: 'center',
          };
          break;
        case 'Pending':
          styles = {
            color: '#FFA22A',
            backgroundColor: '#FFF2CC',
            border: '1px solid #FFA22A',
            borderRadius: '10px',
            width: '8.5rem',
            height: '2.2rem',
            textAlign: 'center',
            alignContent: 'center',
          };
          break;
        case 'Denied':
          styles = {
            color: '#FF502A',
            backgroundColor: '#FFD7B9',
            border: '1px solid #FF502A',
            borderRadius: '10px',
            width: '8.5rem',
            height: '2.2rem',
            textAlign: 'center',
            alignContent: 'center',
          };
          break;
        default:
          styles = {};
          break;
      }
      return styles;
    }
  }
};
</script>

<template>
  <div class="sent-offers-cards-container">
    <div v-for="sent in offers" :key="sent.id" class="container-sent-offers">
      <div class="sent-offers-card">
        <div class="header-product-name-sent">
          <h1 v-if="sent.product_get">{{ sent.product_get.name }}</h1>
        </div>
        <div>
          <div class="content">
            <div class="colum col1">
              <div class="card-get">
                <div class="header-card-get">
                  <div class="container-image-sent-offers">
                    <img v-if="sent.user_get" :src="sent.user_get.photo" alt="User Image">
                  </div>
                  <h1 v-if="sent.user_get">{{ sent.user_get.name }}</h1>
                </div>
                <div class="content-card-get">
                  <p v-if="sent.product_get">{{ sent.product_get.description }}</p>
                </div>
                <div class="footer-card-get">
                  <img v-if="sent.product_get" :src="sent.product_get.photo" alt="Product Image">
                </div>
              </div>
            </div>
            <div class="colum col2">
              <div class="card-offer">
                <div class="mat-content">
                  <div class="content-description">
                    <h1>Datos:</h1>
                    <div class="content-more-info">
                      <div  class="change-for">
                        <img src="../../../public/products/moneda.png" style="height: 20px; width: 20px" alt="Change Icon">
                        <p v-if="sent.product_get">
                          Valor estimado: S/.{{ sent.product_get.price }}
                        </p>
                      </div>
                      <div class="change-for">
                        <img src="../../../public/donations/location-icon.png" style="height: 20px; width: 20px" alt="Change Icon">
                        <p v-if="sent.product_get">
                          {{ sent.product_get.district?.name }},
                          {{ sent.product_get.district?.department?.name }}
                        </p>
                      </div>
                    </div>
                    <h1 v-if="sent.user_get">¿Qué solicita {{ sent.user_get.name }}?</h1>
                    <div class="change-for">
                      <img src="../../../public/products/exchange.icon.png" style="height: 18px; width: 18px" alt="Change Icon">
                      <p v-if="sent.product_get">{{ sent.product_get.objectChange }}</p>
                    </div>
                    <h1>¿Qué le ofreciste?</h1>
                  </div>
                  <div class="my-offer">
                    <div class="col11">
                      <div class="product-sent-image">
                        <img v-if="sent.product_offers" :src="sent.product_offers.photo" alt="Offered Product Image">
                      </div>
                    </div>
                    <div class="col22">
                      <div class="product-sent-text">
                        <h1 v-if="sent.product_offers">Ofreciste tu {{ sent.product_offers.product_name }}</h1>
                        <h4 v-if="sent.product_offers">{{ sent.product_offers.description }}</h4>
                        <div class="footer">
                          <h4 v-if="sent.product_offers"><b>Valor aproximado s/.{{ sent.product_offers.price }}</b></h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="footer-card-offer">
                    <div class="footer-title">
                      <h1>Estado de la oferta:</h1>
                    </div>
                    <div class="status-btn-sent">
                      <div :style="getStatusStyles(sent.state)">
                        <h2>{{ sent.state }}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
h1,h2,h3,h4,h5,h6,p{
  font-family: 'Montserrat', sans-serif;
}
.sent-offers-cards-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
}
.container-sent-offers{
  max-width: 1000px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0px 0px 20px 0px #cccccc;
}
.header-product-name-sent{
  background-color: #FFD146;
  color: #000000;
  display: flex;
  align-items: center;
  padding: 16px 16px 5px;
}
.header-product-name-sent h1{
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 0 16px;
}
.content{
  width: 100%;
  display:flex;
  padding: 0 16px 16px;
  flex-wrap: wrap;
}
.col1{
  flex-direction: column;
  display: inline-block;
  order: 1;
  flex:1;
}
.col2 {
  flex-direction: column;
  display: inline-block;
  order: 2;
  flex: 2;
}
.card-get{
  height: calc(100% - 20px);
  margin: 20px 20px 20px 0;
  align-content: center;
  align-items: center;
  gap: 15px;
  display:flex;
  flex-direction: column;
}
.header-card-get{
  display: flex;
  align-items: center;
  padding: 16px 16px 0;
}
.header-card-get h1 {
  font-weight: bold;
  text-align: left;
  margin-left: 1rem;
  font-size: 1.3rem;
}
.container-image-sent-offers {
  flex-shrink: 0;
  overflow: hidden;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.container-image-sent-offers img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.content-card-get{
  font-size: 15px;
  padding: 0 1rem;
}
.content-card-get p{
  text-align:left;
}
.footer-card-get img{
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  max-width: 250px;
  max-height: 250px;
  border-radius: 5px;

}
.mat-content{
  padding: 16px;
}
.footer-card-get{
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}
.card-offer{
  width: auto;
  height: calc(100% - 20px);
  margin: 20px 0 20px 0;
  align-content: center;
  gap: 15px;
  box-shadow: none;
  border-radius: 0;
  border-left: solid 1px #DCDCDC;
}
.content-description h1{
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  padding-bottom:0.5rem ;
  color: #000000;
  margin: 0;
}
.content-description {
  padding: 0 20px 0 20px;
  font-size: 15px;
}
.content-more-info p {
  display: flex;
  align-items: center;
}
.content-more-info p {
  gap: 5px;
}
.change-for{
  display: flex;
  margin-bottom:15px;
  flex-direction: row;
}
.change-for p{
  margin-left: 8px;
  font-size: 15px;
}
.change-for img{
  margin-top: 1px;
}
.my-offer{
  display:flex;
  flex: 1;
  margin: 1rem;
  padding: 1rem;
  align-items: center;
  border-radius: 8px;
  border: solid 1px #ddd;
  box-shadow: 0 4px 4px rgba(0, 0, 0,0.25);
  flex-wrap: wrap;
  box-sizing: border-box;
}
.col11{
  flex-direction: column;
  display: flex;
  box-sizing: border-box;
  order: 1;
  flex:1;
}
.col22{
  flex-direction: column;
  box-sizing: border-box;
  display: flex;
  order: 2;
  flex: 2;
}
.col11 h1, .col22 h1, .footer-card-offer h1{
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.col22 h1{
  color: #FFD146;
  text-align: left;
  margin-bottom:10px;
}
.col22 h4{
  margin-bottom:10px;
}
.product-sent-image{
  text-align: center;
  display: flex;
  overflow: hidden;
  justify-content: center;
}
.product-sent-image img {
  width: 180px;
  height: 180px;
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 5px;
  object-position: center;
}
.product-sent-text h2{
  color: #fac500;
  text-align:left;
}
.product-sent-text {
  margin-left: 1rem;
  text-align:left;
}
.footer-card-offer{
  display: flex;
  flex-direction: row;
}

.footer-title{
  flex-direction: column;
  display: flex;
  box-sizing: border-box;
  order: 1;
  flex:1;
  align-items: flex-start;
  align-self: center;
  align-content: center;
  text-align: center;
}
.status-btn-sent {
  margin-left: 10px;
  order: 2;
  flex: 1;
}
.footer-card-offer h1 {
  margin: 0;
  padding: 0;
}
.footer-card-offer{
  padding: 0 20px 0 20px;
}

@media (max-width: 780px) {
  .change-for p{
    text-align: left;
  }
  .my-offer {
    flex-direction: column;
  }

  .col11, .col22 , .card-get{
    width: 100%;
  }

  .footer-card-offer{
    display: flex;
    flex-direction: column;
    align-content: center;
  }
  .status-btn-sent{
    padding-top:10px;
    text-align: center;
    align-self: center;
    align-content: center;
    align-items: center;
  }
  .content-description {
    padding: 0 10px 0 10px;
    font-size: 15px;
  }
  .col22 h1{
    margin-top: 1rem;
    margin-bottom: 10px;
  }
  .footer-title h1{
    margin: 0;
    padding: 0;
  }

}
@media (max-width: 620px){
  .col1, .col2 {
    width: 100%;
  }
  .header-card-offer{
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .container-image-sent-offers {
    margin-left: 0;
    width: 100px;
    height: 100px;
  }
  .content {
    flex-direction: column;
  }

  .card-offer{
    border-left: none;
    border-top: solid 1px #C2C2C2;
  }

}

@media (max-width: 420px){
  .col1, .col2 {
    width: 100%;
  }
  .footer-card-offer{
    padding-top: 1rem;
  }
  .header-card-get{
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .container-image-sent-offers{
    width: 100px;
    height: 100px;
  }
  .content {
    flex-direction: column;
  }
  .my-offer{
    margin: 0;
  }
  .mat-content{
    padding: 0;
  }
  .content-description{
    padding: 0;
  }
  .card-offer{
    padding-top: 1rem;
  }
  .status-btn-sent{
    margin-left: 0;
  }
}

</style>
