<script>

import PostProfile from "./post-profile.component.vue";
import OffersProfile from "./offers-profile.component.vue";
import ExchangesProfile from "./exchanges-profile.component.vue";
import FavoritesProfile from "./favorites-profile.component.vue";
import ReviewsProfile from "./reviews-profile.component.vue";

import { markRaw } from 'vue'; // Importa markRaw desde Vue

export default {
  name: "tab-menu-profile",
  components: {
    PostProfile,
    OffersProfile,
    ExchangesProfile,
    FavoritesProfile,
    ReviewsProfile: markRaw(ReviewsProfile) // Usa markRaw para marcar el componente como un objeto sin seguimiento de reactividad
  },
  data() {
    return {
      selectedIndex: 0,
      items: [
        { label: 'Publicaciones', component: markRaw(PostProfile) },
        { label: 'Ofertas', component: markRaw(OffersProfile) },
        { label: 'CambioZ completos', component: markRaw(ExchangesProfile) },
        { label: 'Favoritos', component: markRaw(FavoritesProfile) },
        { label: 'Reseñas', component: markRaw(ReviewsProfile) }
      ]
    };
  },
  methods: {
    selectTab(index) {
      this.selectedIndex = index;
    }
  }
}
</script>

<template>
  <div class="tab-container">
    <pv-tab-view :scrollable="true" class="p-tabview">
      <pv-tab-panel v-for="tab in items" :key="tab.label" :header="tab.label">
        <component :is="tab.component"></component>
      </pv-tab-panel>
    </pv-tab-view>
  </div>
</template>

<style>
.p-tabview-title{
  background-color: #FFD146;
  font-weight: bold;
  padding: 15px 3rem 15px 3rem ;
}
.p-tabview-nav{
  display: flex;
  background-color: #FFD146;
  height: 40px;
  align-items: center;
  align-content:center;
  text-align:center;
  justify-content: space-evenly;
  box-sizing: border-box;
}
.p-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
  background: #ffffff;
  border-color: #e2e8f0;
  color: #fcfcfc;
}
</style>
