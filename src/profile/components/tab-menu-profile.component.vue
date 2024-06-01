<script>

import PostProfile from "./post-profile.component.vue";
import OffersProfile from "./offers-profile.component.vue";
import ExchangesProfile from "./exchanges-profile.component.vue";
import FavoritesProfile from "./favorites-profile.component.vue";
import ReviewsProfile from "./reviews-profile.component.vue";

export default {
  name: "tab-menu-profile",
  components: {
    PostProfile,
    OffersProfile,
    ExchangesProfile,
    FavoritesProfile,
    ReviewsProfile
  },
  data() {
    return {
      selectedIndex: 0,
      items: [
        { label: 'Publicaciones', component: PostProfile },
        { label: 'Ofertas', component: OffersProfile },
        { label: 'CambioZ completos', component: ExchangesProfile },
        { label: 'Favoritos', component: FavoritesProfile },
        { label: 'Reseñas', component: ReviewsProfile }
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
  <div class="tab-container" >
    <div class="tab-menu">
      <div
          v-for="(item, index) in items"
          :key="index"
          :class="['tab-item', { 'active': selectedIndex === index }]"
          @click="selectTab(index)"
      >
        <router-link to="">
          {{ item.label }}
        </router-link>
      </div>
    </div>
    <div class="tab-content" >
      <component :is="items[selectedIndex].component"></component>
      <br><br>
    </div>
  </div>
  <br>
</template>

<style scoped>

.tab-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFD146;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  gap: 4rem;
}

.tab-item {
  padding: 0.5rem;
  cursor: pointer;
  color: #000;
  font-weight: bolder;
  font-size: 20px;
  transition: color 0.3s, border-bottom 0.3s;
}

.tab-item:hover {
  color: #fff;
}

.tab-item.active {
  color: #fff;
  border-bottom: 2px solid #fff;
}

.tab-content {
  text-align: center;
  padding-top: 1rem;
}

</style>
