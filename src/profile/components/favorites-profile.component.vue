<script>
import { userApiService } from "../services/user-api.service.js";
import { homeApiService } from "../../home/services/home-api.service.js";
import DialogDeleteFavorites from '../components/dialog-delete-favorites.component.vue';

export default {
  name: 'favorites-profile',
  components: {
    DialogDeleteFavorites
  },
  data() {
    return {
      user: {},
      id_favorites: [],
      favorites: [],
      userService: new userApiService(),
      postService: new homeApiService(),
      loading: true,
      error: null,
      dialogVisible: false,
      selectedId: null
    };
  },
  methods: {
    getProductById(pid) {
      return this.postService.getProductById(pid);
    },
    getUser() {
      const userId = Number(localStorage.getItem('user'));
      this.userService.getUserById(userId)
          .then(response => {
            this.user = response.data;
            this.id_favorites = this.user.favorites.map(fav => fav.product_id);
            this.loadFavorites();
          })
          .catch(error => {
            this.error = error;
          });
    },
    loadFavorites() {
      const promises = this.id_favorites.map(productId => this.getProductById(productId));
      Promise.all(promises)
          .then(products => {
            this.favorites = products.map(response => response.data).filter(product => product); // Remove any undefined values
            this.loading = false;
          })
          .catch(error => {
            this.error = error;
          });
    },
    openConfirm(id) {
      this.selectedId = id;
      this.dialogVisible = true;
    },
    confirmDelete(id) {
      this.id_favorites = this.id_favorites.filter(productId => productId !== id);
      this.favorites = this.favorites.filter(fav => fav.id !== id);
      this.user.favorites = this.id_favorites.map(productId => ({ product_id: productId }));
      this.userService.putUser(this.user.id, this.user)
          .then(res => {
            this.dialogVisible = false;
          })
          .catch(error => {
            this.error = error;
          });
    }
  },
  created() {
    this.getUser();
  }
};
</script>

<template>
  <div class="favorites-content">
    <div class="user-offers-title">
      <p>Mis Favoritos:</p>
    </div>
    <div class="line-text">
      <div class="line"></div>
    </div>
    <div class="favorites__container">
      <div v-if="loading">Cargando...</div>
      <div v-else>
        <div v-for="favorite in favorites" :key="favorite.id">
          <div class="example__card__favorites">
            <div class="card__img">
              <img :src="favorite.images" :alt="favorite.product_name">
            </div>
            <div class="card__information">
              <div class="card__header">
                <h3 class="card__title">{{ favorite.product_name }}</h3>
                <button @click="openConfirm(favorite.id)" class="delete__button" title="Eliminar">
                  <img src="../../../public/profile/delete.png" alt="delete" style="height: 18px;width:18px">
                </button>
              </div>
              <div class="card__content">
                <p class="p__information">
                  <img src="../../../public/donations/location-icon.png" alt="place" style="height: 20px;width:20px">
                  {{ favorite.location.district }}, {{ favorite.location.departament }}
                </p>
                <p class="p__information">
                  <img src="../../../public/products/exchange.icon.png" alt="change" style="height: 16px;width:16px">
                  {{ favorite.change_for }}
                </p>
                <p class="p__price">Valor aproximado s/.{{ favorite.price }}</p>
              </div>
              <div class="card__footer">
                <router-link :to="`/product-information/${favorite.id}`" class="offer__button">Ver Más</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <dialog-delete-favorites
        :visible="dialogVisible"
        @close="dialogVisible = false"
        @confirm="confirmDelete(selectedId)"
    />
  </div>
</template>


<style>
.favorite__first p {
  font-size: 1.5rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
  padding-top: 4rem;
  padding-left: 3rem;
  padding-bottom: 1rem;
  text-align:left;
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

.favorites__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  padding: 50px;
}

.example__card__favorites {
  flex: 1;
  display: flex;
  flex-direction: row;
  max-width: 1250px;
  width: 100%;
  height: fit-content;
  font-family: 'Montserrat', sans-serif;
  text-align: justify;
  align-items: center;
  background-color:white;
  box-shadow: 0px 0px 20px 0px #cccccc;
  margin-bottom:2rem;
}

.card__img {
  width: 300px;
  height: 300px;
}
.card__img img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position:center;
}

.card__information {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 300px;
}

.card__header {
  color: white;
  background-color: black;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  justify-content: space-between;
  font-family: 'Montserrat', sans-serif;
}

.card__title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

.card__content {
  padding: 20px;
  height: 100%;
}

.delete__button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.delete__button:hover {
  color: #FFD146;
  cursor: pointer;
}

.card__footer {
  display: flex;
  justify-content: flex-end;
  padding: 20px 30px;
  align-items: center;
}

.offer__button {
  background-color: #FFD146;
  color: black;
  padding: 5px 60px;
  border-radius: 20px;
  border: none;
  font-weight: bold;
  font-size: 17px;
  font-family: 'Montserrat', sans-serif;
}

.offer__button:hover {
  background-color: #000000;
  color: #FFD146;
  transform: scale(1.02);
}

.star__container {
  background-color: #FFD146;
  border-radius: 50%;
  padding: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.star__img {
  width: 30px;
  height: 30px;
}

.p__information {
  word-break: break-word;
  display: flex;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  padding-bottom:1rem;
  gap:5px;
}
.p__price {
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
}

@media screen and (max-width: 1150px) {
  .favorite__first {
    padding-top: 2rem;
    padding-left: 1rem;
  }
}

@media (max-width: 940px) {
  .example__card__favorites {
    flex-direction: column;
    width: 300px;
  }
  .card__img img{
    width: 100%;
    max-width:300px;
    height: 100%;
    max-height:500px;
  }

  .star__container {
    padding: 8px;
  }

  .star__img {
    width: 25px;
    height: 25px;
  }
}

</style>