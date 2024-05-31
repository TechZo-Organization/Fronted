<script>
import {publishApiService} from "../services/publish-api.service.js";
import {homeApiService} from "../../home/services/home-api.service.js";

export default {
  name: 'publish-form',
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
      acceptedPrivacyPolicy: false,
      boostOrNot: false,
      uploadedImages: [],
      visible: false,
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
      if (files.length + this.uploadedImages.length > 8) {
        alert('Solo puedes subir hasta 8 imágenes.');
        return;
      }
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImages.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    },
    removeImage(index) {
      this.uploadedImages.splice(index, 1);
    },
    async submitForm() {
      if (this.$refs.form.checkValidity()) {
        this.visible = true;
      }
    },
  },
  mounted() {
    this.fetchCountries();
    this.fetchCategories();
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
              <pv-input required class="input" type="text"></pv-input>
              <br><br>
              <label><b>Correo electrónico</b></label><br>
              <pv-input required class="input" type="email"></pv-input>
              <br><br>
              <label><b>Teléfono</b></label><br>
              <pv-input required class="input" type="text"></pv-input>
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
              <pv-input required class="input" type="text"></pv-input>
              <br><br>
              <label><b>Describe tu producto</b></label><br>
              <pv-input required class="input input-xl" type="text"></pv-input>
              <br><br>
              <label><b>¿Que quieres a Cambio?</b></label><br>
              <pv-input required class="input input-xl" type="text"></pv-input>
              <br><br>
              <label><b>Valor Aproximado</b></label><br>
              <div class="price-section">
                <div class="price-icon"><h1>S/.</h1></div>
                <pv-input required class="input input-price" type="text"></pv-input>
              </div>
            </div>
          </div>
          <div class="row-form">
            <div class="form-title">
              <h1>Imágenes</h1>
            </div>
            <div style="text-align: center; padding-top: 1rem;">
              <p>Puedes agregar hasta un máximo de 8 imágenes</p>
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
    <div class="dialog-container">
      <pv-dialog v-model:visible="visible" modal :header="null" :style="{ width: '25rem', 'background-color': 'white', 'border-radius': '10px', 'padding': '20px' }">
        <div class="dialog-content">
          <h1 class="text-center">¡Publicación exitosa!</h1>
          <p class="text-center">Muchas gracias por publicar en CambiaZo, te enviaremos un correo con la confirmación respectiva.</p>
          <div class="flex justify-content-center">
            <router-link to="/home">
              <pv-button label="Confirmar" />
            </router-link>
          </div>
        </div>
      </pv-dialog>
    </div>
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
