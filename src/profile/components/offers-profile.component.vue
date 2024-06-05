<template>
  <div>
    <div class="user-offers-title">
      <p>Ofertas:</p>
    </div>
    <div>
      <div class="line-text">
        <div class="line"></div>
      </div>
      <div class="offers-buttons">
        <button class="sent" @click="showSentOffers" :class="{ active: showSent }">Enviadas</button>
        <button class="get" @click="showGetOffers" :class="{ active: !showSent }">Recibidas</button>
      </div>
      <div class="line-text">
        <div class="line"></div>
      </div>
    </div>

    <user-sent-offers-component v-if="showSent"></user-sent-offers-component>
    <user-get-offers-component v-if="!showSent"></user-get-offers-component>
  </div>
</template>

<script>
import UserSentOffersComponent from "./user-sent-offers.component.vue";
import UserGetOffersComponent from "./user-get-offers.component.vue";

export default {
  name: "UserOffers",
  components: {
    UserSentOffersComponent,
    UserGetOffersComponent,
  },
  data() {
    return {
      showSent: true,
    };
  },
  methods: {
    showSentOffers() {
      this.showSent = true;
    },
    showGetOffers() {
      this.showSent = false;
    },
  },
};
</script>

<style>
.user-offers-title {
  font-size: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  padding-top: 4rem;
  padding-left: 3rem;
  padding-bottom: 1rem;
  text-align: left;
}

.line-text {
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

.offers-buttons {
  display: flex;
  padding: 1rem 0 1rem 3rem;
}

button {
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  border-radius: 10px;
  padding: 0.3rem 1rem;
}

button:hover {
  background-color: #000000;
  color: #ffffff;
}

.sent,
.get {
  margin-right: 1rem;
  border: none;
  background-color: #FFE493;
  color: black;
  font-weight: bold;
}

button.active {
  border: none;
  margin-right: 1rem;
  background-color: black;
  color: #FFD146;
}

@media screen and (max-width: 1150px) {
  .user-offers-title {
    padding-top: 2rem;
    padding-left: 1rem;
  }
}
</style>
