<script>
import { donationsApiService } from "../../donations/services/donations-api.service.js";
import { Ong } from "../../donations/model/ong.entity.js";
import { Category } from "../../donations/model/category.entity.js";

export default {
  name: 'OngInformation',
  data() {
    return {
      ong: new Ong(),
      categories: [],
      loading: true,
      error: null
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    copyProfileLink() {
      const profileLink = `${window.location.origin}/ong-information/${this.$route.params.id}`;
      navigator.clipboard.writeText(profileLink)
          .then(() => {
            alert("Profile link copied to clipboard!");
          })
          .catch(err => {
            console.error("Failed to copy: ", err);
          });
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : 'Unknown';
    }
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const [ongResponse, categoriesResponse] = await Promise.all([
        new donationsApiService().getOngById(id),
        new donationsApiService().getCategories()
      ]);

      this.ong = ongResponse.data;
      this.categories = categoriesResponse.data.map(cat => new Category(cat.id, cat.name)); // Ensure Category instances have both id and name
      this.loading = false;
    } catch (err) {
      this.error = err;
      this.loading = false;
    }
  }
}
</script>

<template>
  <div class="ong-information">
    <div class="return-section">
      <router-link to="/donations" @click.native="scrollToTop">
        <pv-button class="return-button">
          Todas las ONG's
        </pv-button>
      </router-link>
    </div>
    <div class="ong-container">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error.message }}</div>
      <div v-else class="ong-details">
        <h3>Detalles</h3>
        <h1>{{ ong.name }}</h1>
        <div class="social-media-buttons">
          <a :href="ong.social_networks[0].url" target="_blank" class="link-button">
            <pv-button class="b-social">
              <img src="../../../public/ong-information/facebook-icon.png" height="20" width="20"/>
              <p>Facebook</p>
            </pv-button>
          </a>
          <a :href="ong.social_networks[1].url" target="_blank" class="link-button">
            <pv-button class="b-social">
              <img src="../../../public/ong-information/instagram-icon.webp" height="20" width="20"/>
              <p>Instagram</p>
            </pv-button>
          </a>
          <pv-button class="link-button" @click="copyProfileLink">
            <img src="../../../public/ong-information/copy-icon.png" height="20" width="20"/>
            <p>Compartir</p>
          </pv-button>
        </div>
        <h2>Acerca de Nosotros:</h2>
        <p class="text-details">{{ ong.information[0].about}}</p>
        <h2>Misión y Visión:</h2>
        <p class="text-details">{{ ong.information[0].mission_vision}}</p>
        <h2>Formas de apoyo:</h2>
        <p class="text-details">{{ ong.information[0].forms_of_support }}</p>
        <h2>Proyectos: </h2>
        <ul>
          <li v-for="project in ong.projects" :key="project.name">
            <h4>{{ project.name }}</h4>
            <p>{{ project.description }}</p>
          </li>
        </ul>
      </div>
      <div class="ong-contact-information">
        <div class="ong-content">
          <div class="ong-image">
            <img :src="ong.logo" height="130" width="130"/>
            <h1>{{ ong.name }}</h1>
            <a :href="ong.website" target="_blank">
              <pv-button class="website-link">
                Visitar sitio web
              </pv-button>
            </a>
          </div>
          <hr>
          <div class="ong-contact">
            <h3>Categoría</h3>
            <p>{{ getCategoryName(ong.category) }}</p>
            <h3>Dirección</h3>
            <div class="icon-contact">
              <img src="../../../public/donations/location-icon.png" />
              <p>{{ ong.address.street }}, {{ ong.address.district }}, {{ ong.address.city }} - PE</p>
            </div>
            <h3>Teléfono de Contacto</h3>
            <div class="icon-contact">
              <img src="../../../public/ong-information/phone-icon.png"/>
              <p>{{ ong.contact_number }}</p>
            </div>
            <h3>Correo electrónico</h3>
            <div class="icon-contact">
              <img src="../../../public/ong-information/email-icon.png"/>
              <p class="email-text">{{ ong.email }}</p>
            </div>
            <h3>Número de Cuenta Bancaria</h3>
            <div class="icon-contact">
              <div v-if="ong.account_number" style="display: grid; gap: 0.5rem;" >
                <img src="../../../public/ong-information/credit-card-icon.png"/>
                <div v-for="(account, index) in ong.account_number" :key="index">
                  <p>{{ account.name }}: {{ account.account }} </p>
                  <p>CCI: {{ account.cci }}</p>
                </div>
              </div>
            </div>
            <h3>Horario de atención</h3>
            <div class="icon-contact">
              <div v-if="ong.attention_schedule" style="display: grid; gap: 0.5rem;">
                <img src="../../../public/ong-information/time-icon.png" height="20" width="20"/>
                <div v-for="(schedule, index) in ong.attention_schedule" :key="index" style="display: grid">
                  <p>{{ schedule.schedule }}</p>
                </div>
              </div>
            </div>
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.return-button{
  background-color: #FFD146;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: 0px 0px 20px 0px #cccccc;
  border: 4px solid #FFD146;
  transition: 0.43s;
}

.return-button:hover{
  background-color: #fff;
  color: #FFD146;
}

.ong-container{
  padding-right: 2rem;
  padding-left: 2rem;
  padding-top: 2rem;
  display: flex;
  gap: 2rem;
}

.ong-details{
  width: 65%;
}

.ong-details h3{
  font-weight: bolder;
  font-size: 20px;
  padding-bottom: 1rem;
}

.ong-details h1{
  font-weight: bolder;
  font-size: 35px;
  padding-bottom: 1rem;
}

.ong-details h2{
  font-weight: bolder;
  font-size: 25px;
  padding-bottom: 1rem;
  padding-top: 1rem;
}

.text-details{
  font-size: 17px;
  text-align: justify;
  padding-bottom: 1rem;
}

.social-media-buttons{
  gap: 1rem;
  display: flex;
  padding-bottom: 2rem;
  padding-top: 1rem;
}

.link-button{
  padding: 0.5rem 1rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 20px;
  gap: 0.5rem;
  transition: 0.43s;
  color: #a6a3a3;
}

.link-button .b-social{
  gap: 0.5rem;
}

.link-button:hover{
  color: #FFD146;
  background-color: #fff;
  border: 1px solid #FFD146;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}

li {
  margin-bottom: 10px;
}

ul li h4{
  font-weight: bolder;
  font-size: 20px;
  padding-bottom: 1rem;
  padding-top: 1rem;
}

ul li p{
  font-size: 17px;
  text-align: justify;
}

.ong-contact-information{
  width: 35%;
}

.ong-content{
  padding: 1rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 15px;
}


.ong-image{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.ong-image h1{
  font-weight: bolder;
  font-size: 25px;
  padding-bottom: 1rem;
}

.ong-image img{
  border-radius: 50%;
  margin-top:1rem;
  margin-bottom: 1rem;
}

.website-link{
  background-color: #FFD146;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: 0.43s;
  margin-bottom: 2rem;
}

.website-link:hover{
  background-color: #000;
  color: #FFD146;
}

.ong-contact{
  padding: 0.5rem;
}

.ong-contact h3{
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  font-weight: bolder;
  font-size: 18px;
}

.icon-contact{
  display: flex;
  gap: 0.5rem;
  align-content: center;
  padding-top: 0.5rem;
}

.icon-contact img{
  width: 20px;
  height: 20px;
  padding-top:0.1rem;
}

.email-text {
  word-break: break-all;
}

@media screen and (max-width: 900px){
  .ong-container{
    display: grid;
    padding-right: 0.6rem;
    padding-left: 0.6rem;
  }
  .ong-details{
    width: 100%;
  }
  .ong-contact-information{
    width: 100%;
    padding: 1.5rem;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .ong-content{
    padding: 0rem;
    background-color: #fff;
    border: 0px;
    border-radius: 0px;
  }
}

@media screen and (max-width: 600px){
  .social-media-buttons{
    display: grid;
  }
  .link-button{
    text-align: center;
    justify-content: center;
  }
}
</style>