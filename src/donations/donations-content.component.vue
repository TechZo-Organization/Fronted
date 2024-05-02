<script>
import { donationsApiService } from "./services/donations-api.service.js";
import OngList from "./components/ong-list.component.vue";
import InputCategory from "./components/categories-content.component.vue";

export default {
  name: "donations-content",
  components: {
    InputCategory,
    OngList,
  },
  data(){
    return{
      ongs: [],
      categories: [],
      errors: [],
      donationsApi: new donationsApiService(),
      accept: false,
    }
  },
  created() {
    this.getAllOngs();
    this.getAllCategories();
  },
  methods: {
    getAllOngs() {
      this.donationsApi.getOngs()
          .then((response) => {
            this.ongs = response.data;
          })
          .catch((error) => {
            this.errors.push(error);
          });
    },
    getAllCategories() {
      this.donationsApi.getCategories()
          .then((response) => {
            this.categories = response.data;
          })
          .catch((error) => {
            this.errors.push(error);
          });
    }
  },
}
</script>

<template>
  <div class="donations-content" style="background-color: #F8F7F4">
    <br>
    <br>
    <br>
    <div class="title-container">
      <h1>Contamos con convenios con las ONG’s más importantes del Perú</h1>
      <h2>Tenemos muchas opciones para poder contribuir con diferentes sectores de la población</h2>
    </div>
    <div class="main-container">
      <div class="ongs-container" >
        <div class="input-container">
          <div style="display: flex; align-items: center; margin-bottom: 3rem">
            <img src="../../public/donations/look-icon.png" style="width: 5vh; height: 5vh" />
            <pv-input class="input-ong" placeholder="Buscar por nombre de ONG, rubro..."></pv-input>
          </div>
          <h1>Nuevas ONG’s</h1>
          <p>Se han añadido {{ ongs.length }} nuevas organizaciones...</p>
        </div>
        <ong-list v-if="errors" :ongs="ongs"></ong-list>
      </div>
      <div class="categories-container">
        <input-category :categories="categories" :accept.sync="accept"></input-category>
      </div>
    </div>
  </div>
</template>

<style scoped>

.title-container{
  padding: 5rem 10rem 5rem 10rem;
  font-size: 30px;
  font-weight: bolder;
  text-align: center;
  color: #FFD146;
}

.title-container h1{
  font-size: 40px;
  color: #000;
}

.main-container{
  display: flex;
  gap: 1rem;
  padding: 3rem;
}

.ongs-container{
  width: 60%;
}

.input-container{
  padding: 1rem;
}

.input-container h1{
  font-weight: bolder;
  font-size: 30px;
  padding-bottom: 1rem;
}

.input-ong{
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cccccc;
  border-radius: 10px;
  transition: 0.43s;
}

.input-ong:focus{
  outline: none;
  box-shadow: 0px 0px 8px 0px #989898;
}

.categories-container{
  width: 40%
}

@media screen and (max-width: 900px){
  .main-container {
    flex-direction: column;
    padding: 3rem 1.25rem 7rem 1.25rem;
  }
  .categories-container {
    order: 1;
    width: 100%;
  }
  .ongs-container {
    padding-top: 2rem;
    order: 2;
    width: 100%;
  }
  .title-container{
    font-size: 25px;
    padding: 5rem 2rem 2rem 2rem;
  }
  .title-container h1{
    font-size: 35px;
  }
}

</style>