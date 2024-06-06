<script>
import axios from 'axios';
import { environment } from '../../../environments/environment.js';
import { publishApiService } from '../services/publish-api.service.js';
import { homeApiService } from '../../home/services/home-api.service.js';
import {userApiService} from "../../login/services/user-api.service.js";
import DialogPublish from "../../public/components/dialog-publish.component.vue";

export default {
  name: 'publish-form',
  components: {DialogPublish},
  data() {
    return {
      countries: [],
      departments: [],
      cities: [],
      selectedCountry: null,
      selectedDepartment: null,
      selectedCity: null,
      categories: [],
      selectedCategory: null,
      apiService: new publishApiService(),
      homeService: new homeApiService(),
      userService: new userApiService(),
      acceptedPrivacyPolicy: false,
      boostOrNot: false,
      uploadedImages: [],
      visible: false,
      imagesUrl: [],
      files: [],
      userData: {
        name: '',
        email: '',
        phone: '',
      },
      productName: '',
      email: '',
      phone: '',
      description: '',
      changeFor: '',
      price: '',
      showDialog: false
    };
  },
  methods: {
    async fetchCountries() {
      try {
        const response = await this.apiService.getCountry();
        this.countries = response.data;
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await this.homeService.getCategoriesProduct();
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async fetchUserData() {
      try {
        const response = await this.userService.getUser();
        const userId = localStorage.getItem('user');
        const user = response.data.find(user => user.id === userId);
        this.userData = {
          name: user.name,
          email: user.email,
          phone: user.phone,
        };
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    onCountryChange() {
      if (this.selectedCountry) {
        this.departments = this.selectedCountry.departments;
        this.selectedDepartment = null;
        this.cities = [];
        this.selectedCity = null;
      }
    },
    onDepartmentChange() {
      if (this.selectedDepartment) {
        this.cities = this.selectedDepartment.cities.map(city => ({ name: city }));
        this.selectedCity = null;
      }
    },
    handleImageUpload(event) {
      const files = event.target.files;
      if (files.length + this.uploadedImages.length > 1) {
        alert('Solo puedes subir una imagen');
        return;
      }
      this.files = files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImages.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    },
    async uploadImage() {
      const api = "https://api.imgbb.com/1/upload?expiration=300&key=e20a8b081ea288c51254cd9dca20515c&name=";
      for (let file of this.files) {
        const url = api + file.name;
        const data = new FormData();
        data.append('image', file);

        try {
          const response = await fetch(url, { method: 'post', body: data });
          const responseData = await response.json();
          this.imagesUrl.push(responseData.data.url);
        } catch (error) {
          console.error(error);
        }
      }
    },
    removeImage(index) {
      this.uploadedImages.splice(index, 1);
    },
    closeDialog() {
      this.showDialog = false;
      document.body.classList.remove('no-scroll');
    },
    async submitForm() {
      if (this.$refs.form.checkValidity()) {
        this.visible = true;
        this.showDialog = true;
        document.body.classList.add('no-scroll');
        await this.uploadImage();
        console.log(this.imagesUrl);

        const userId = localStorage.getItem('user');
        const response = await this.homeService.getProduct();
        const productCount = response.data.length;

        const productData = {
          id: productCount + 1,
          user_id: userId,
          category_id: this.selectedCategory.id,
          product_name: this.productName,
          description: this.description,
          change_for: this.changeFor,
          price: this.price,
          images: this.imagesUrl,
          boost: this.boostOrNot,
          location: {
            country: this.selectedCountry.country,
            departament: this.selectedDepartment.name,
            district: this.selectedCity.name,
          },
        };

        try {
          await axios.post(`${environment.baseUrl}/products`, productData);
          console.log('Product created successfully');
        } catch (error) {
          console.error('Error creating product:', error);
        }
      }
    },
  },
  async mounted() {
    await this.fetchCountries();
    await this.fetchCategories();
    await this.fetchUserData();
  }
};
</script>

<template>
  <div class="publish-form">
    <form class="form-container" ref="form" @submit.prevent="submitForm">
      <div class="form-columns">
        <div class="first-form-column">
          <div class="row-form">
            <div class="form-title">
              <h1>Datos de Contacto</h1>
            </div>
            <div class="inputs-publish">
              <label><b>Nombre</b></label><br>
              <pv-input v-model="userData.name" required class="input disabled-dropdown" type="text" disabled></pv-input>
              <br><br>
              <label><b>Correo electrónico</b></label><br>
              <pv-input v-model="userData.email" required class="input disabled-dropdown" type="email" disabled></pv-input>
              <br><br>
              <label><b>Teléfono</b></label><br>
              <pv-input v-model="userData.phone" required class="input disabled-dropdown" type="text" disabled></pv-input>
              <br><br>
              <label><b>País</b></label><br>
              <pv-dropdown
                  class="input dropdown-input"
                  v-model="selectedCountry"
                  :options="countries"
                  optionLabel="country"
                  placeholder="Elige un País"
                  @change="onCountryChange" required
              />
              <br><br>
              <label><b>Departamento</b></label><br>
              <pv-dropdown
                  class="input dropdown-input"
                  v-model="selectedDepartment"
                  :options="departments"
                  optionLabel="name"
                  placeholder="Elige un Departamento"
                  :disabled="!selectedCountry"
                  @change="onDepartmentChange"
                  :class="{'disabled-dropdown': !selectedCountry}" required
              />
              <br><br>
              <label><b>Ciudad</b></label><br>
              <pv-dropdown
                  class="input dropdown-input"
                  v-model="selectedCity"
                  :options="cities"
                  optionLabel="name"
                  placeholder="Elige una Ciudad"
                  :disabled="!selectedDepartment"
                  :class="{'disabled-dropdown': !selectedDepartment}" required
              />
              <br><br>
              <pv-checkbox v-model="acceptedPrivacyPolicy" :binary="true" class="check-b" required/>
              <label><b>Acepto la <span class="yellow">Política de Privacidad</span> </b></label>
            </div>
          </div>
          <div class="row-form">
            <div class="title-boost">
              <div class="icon-title">
                <img src="../../../public/publish/boost-icon.png" height="40" width="40"/>                <h1>Boost de Visibilidad</h1>
              </div>
              <div class="toggle-option">
                <pv-toggle-button v-model="boostOrNot" onLabel="On" offLabel="Off" class="b-toggle" :class="{'onToggle': boostOrNot}"/>
              </div>
            </div>
            <div class="text-boost">
              <p>¡Activa tu boost! Al hacerlo, tu producto será destacado en la página principal durante un día, aumentando tus oportunidades de encontrar un intercambiador.</p>
            </div>
          </div>
        </div>
        <div class="second-form-column">
          <div class="row-form">
            <div class="form-title">
              <h1>Información de tu Publicación</h1>
            </div>
            <div class="inputs-publish">
              <label><b>Categoría</b></label><br>
              <pv-dropdown
                  class="input dropdown-input"
                  v-model="selectedCategory"
                  :options="categories"
                  optionLabel="name"
                  placeholder="Elige una categoría"
                  required
              />
              <br><br>
              <label><b>Producto</b></label><br>
              <pv-input required class="input" type="text" v-model="productName"></pv-input>
              <br><br>
              <label><b>Describe tu producto</b></label><br>
              <pv-input required class="input input-xl" type="text" v-model="description"></pv-input>
              <br><br>
              <label><b>¿Que quieres a Cambio?</b></label><br>
              <pv-input required class="input input-xl" type="text" v-model="changeFor"></pv-input>
              <br><br>
              <label><b>Valor Aproximado</b></label><br>
              <div class="price-section">
                <div class="price-icon"><h1>S/.</h1></div>
                <pv-input required class="input input-price" type="text" v-model="price"></pv-input>
              </div>
            </div>
          </div>
          <div class="row-form">
            <div class="form-title">
              <h1>Imágenes</h1>
            </div>
            <div style="text-align: center; padding-top: 1rem;">
              <p>Agrega o arrastra tu imagen aquí.</p>
            </div>
            <div class="inputs-publish images-upload">
              <pv-input id="file-upload" class="input-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        @change="handleImageUpload"
                        :disabled="uploadedImages.length >= 8"
                        required
              />
              <label for="file-upload" class="upload-label">Subir Imágenes</label>
              <div v-if="uploadedImages.length" class="images-container">
                <div v-for="(image, index) in uploadedImages" :key="index" style="position: relative; display: inline-block; margin: 5px;">
                  <img :src="image" style="width: 100px; height: 100px; object-fit: cover; border: 1px solid #ccc; border-radius: 5px;" />
                  <pv-button @click="removeImage(index)" style="position: absolute; top: 0; right: 0; background-color: red; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; cursor: pointer;">X</pv-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="submit-form-container">
        <pv-button type="submit" class="submit b-publish">Publicar</pv-button>
      </div>
    </form>
    <dialog-publish :visible="showDialog" @close="closeDialog"/>
  </div>
</template>

<style scoped>
.form-title {
  font-size: 25px;
  font-weight: bolder;
  padding-top: 2rem;
  padding-bottom: 1rem;
  text-align: center;
}

.form-container {
  display: grid;
  width:100%;
}

.first-form-column {
  width: 40%;
  justify-content: center
}

.second-form-column {
  width: 60%;
}

.row-form {
  background-color: #fff;
  box-shadow: 0px 0px 20px 0px #c6c6c6;
}

ol, ul, menu {
  list-style: none;
  margin: 0;
  padding: 0;
  background-color:white;
}

.check-b {
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
  color: #FFD146;
  margin-right: 0.5rem;
  font-size: 20px;
  font-weight: 900;
}
.inputs-publish {
  padding: 0rem 2rem 2rem 2rem;
  margin: 1rem;
}

.disabled-dropdown {
  background-color: #c6c6c6;
  color: #6a6565;
}

.title-boost {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem 1rem 1rem;
}

.title-boost h1 {
  font-size: 20px;
  font-weight: bolder;
}

.icon-title {
  display: flex;
  align-items: center;
}

.b-toggle {
  border: 2px solid #FFD146;
  border-radius: 10px;
  padding: 0rem 2rem 0rem 2rem;
}

.onToggle {
  background-color: #FFD146;
}

.text-boost {
  padding: 1rem 2.5rem 2rem 2.5rem;
  text-align: justify;
}

.input-xl {
  padding-bottom: 2.5rem;
}

.price-section {
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
}

.price-icon {
  background-color: #FFD146;
  padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  border-radius: 10px 0px 0px 10px;
  font-weight: bolder;
}

.form-columns {
  display: flex;
  gap: 1rem;
}

.input-price {
  border-radius: 0px 10px 10px 0px;
  border-left: white;
}


.images-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 1rem;
  border-radius: 10px;
}

.input-upload {
  display: none;
}

.upload-label {
  background-color: #FFD146;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.43s;
}

.upload-label:hover {
  background-color: #000;
  color: #FFD146;
}

.images-container {
  border: 1px solid #c6c6c6;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1.5rem;
}

.submit-form-container {
  text-align: center;
  padding: 2rem;
}

.b-publish {
  width: 200px;
}

@media screen and (max-width: 900px) {
  .form-title {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .form-columns {
    flex-direction: column;
  }

  .first-form-column {
    width: 100%;
  }

  .second-form-column {
    width: 100%;
  }

  .inputs-publish {
    padding: 0rem 0.5rem 2rem 0.5rem;
  }

  .images-upload {
    justify-content: center;
    text-align: center;
  }
}

@media screen and (max-width: 500px) {
  .title-boost {
    display: grid;
  }

  .toggle-option {
    justify-content: center;
    text-align: center;
    padding-top: 1rem;
  }
}
</style>
