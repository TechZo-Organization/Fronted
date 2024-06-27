<script>
import { homeApiService } from "../../home/services/home-api.service.js";
import { userApiService } from "../../login/services/user-api.service.js";
import { publishApiService } from "../../publish/services/publish-api.service.js";

export default {
  name: 'dialog-edit-post',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editedProduct: { ...this.product },
      countries: [],
      departments: [],
      cities: [],
      selectedCountry: null,
      selectedDepartment: null,
      selectedCity: null,
      categories: [],
      selectedCategory: null,
      acceptedPrivacyPolicy: false,
      boostOrNot: false,
      uploadedImages: [],
      userData: {
        name: '',
        email: '',
        phone: '',
        membership: '',
      },
      boostOrNotDisabled: false,
      files: [],
      imagesUrl: [],
      apiService: new publishApiService(),
      homeService: new homeApiService(),
      userService: new userApiService(),
    };
  },
  watch: {
    product: {
      handler(newProduct) {
        this.editedProduct = { ...newProduct };
        this.uploadedImages = this.editedProduct.images ? [this.editedProduct.images] : [];
      },
      deep: true
    }
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
          membership: user.membership
        };
        this.boostOrNotDisabled = user.membership === '1';
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
          this.uploadedImages = [e.target.result];  // Only allow one image
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
          this.imagesUrl = [responseData.data.url]; // Only allow one image
        } catch (error) {
          console.error(error);
        }
      }
    },
    removeImage(index) {
      this.uploadedImages.splice(index, 1);
    },
    closeDialog() {
      this.$emit('close');
      document.body.classList.remove('no-scroll');
    },
    async submitForm() {
      if (this.$refs.form.checkValidity()) {
        await this.uploadImage();

        const productData = {
          id: this.editedProduct.id,
          user_id: this.editedProduct.user_id,
          category_id: this.selectedCategory ? this.selectedCategory.id : this.editedProduct.category_id,
          product_name: this.editedProduct.product_name,
          description: this.editedProduct.description,
          change_for: this.editedProduct.change_for,
          price: this.editedProduct.price,
          images: this.imagesUrl.length ? this.imagesUrl : this.editedProduct.images,
          boost: this.boostOrNot,
          location: {
            country: this.selectedCountry ? this.selectedCountry.country : this.editedProduct.location.country,
            departament: this.selectedDepartment ? this.selectedDepartment.name : this.editedProduct.location.departament,
            district: this.selectedCity ? this.selectedCity.name : this.editedProduct.location.district,
          },
        };

        try {
          await this.homeService.putProduct(this.editedProduct.id, productData);
          this.$emit('updated', productData);
          this.closeDialog();
        } catch (error) {
          console.error('Error updating product:', error);
        }
      }
    }
  },
  async mounted() {
    await this.fetchCountries();
    await this.fetchCategories();
    await this.fetchUserData();
    if (this.product.location) {
      this.selectedCountry = this.countries.find(country => country.country === this.product.location.country);
      if (this.selectedCountry) {
        this.departments = this.selectedCountry.departments;
        this.selectedDepartment = this.departments.find(department => department.name === this.product.location.departament);
        if (this.selectedDepartment) {
          this.cities = this.selectedDepartment.cities.map(city => ({ name: city }));
          this.selectedCity = this.cities.find(city => city.name === this.product.location.district);
        }
      }
    }
    if (this.product.category_id) {
      this.selectedCategory = this.categories.find(category => category.id === this.product.category_id);
    }
  }
};
</script>

<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog">
      <div style="display: flex; justify-content: flex-end;">
        <pv-button @click="closeDialog">
          <img src="../../../public/toolbar/close-icon.png" height="30" width="30"/>
        </pv-button>
      </div>
      <div class="dialog-container">
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
                  </div>
                </div>
                <div class="row-form">
                  <div class="title-boost">
                    <div class="icon-title">
                      <img src="../../../public/publish/boost-icon.png" height="40" width="40"/>
                      <h1>Boost de Visibilidad</h1>
                    </div>
                    <div class="toggle-option">
                      <pv-toggle-button v-model="boostOrNot" onLabel="On" offLabel="Off" class="b-toggle" :class="{'onToggle': boostOrNot}" :disabled="boostOrNotDisabled"/>
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
                    <label><b>Título del Producto</b></label><br>
                    <pv-input v-model="editedProduct.product_name" required class="input" type="text" placeholder="Ingrese el título de su producto"></pv-input>
                    <br><br>
                    <label><b>Descripción del Producto</b></label><br>
                    <textarea v-model="editedProduct.description" class="input" placeholder="Descripción de tu Producto" required></textarea>
                    <br><br>
                    <label><b>Precio</b></label><br>
                    <pv-input v-model="editedProduct.price" required class="input" type="number" placeholder="Ingrese el precio de su producto"></pv-input>
                    <br><br>
                    <label><b>Cambiar por:</b></label><br>
                    <textarea v-model="editedProduct.change_for" class="input" placeholder="¿Qué producto esperas recibir?" required></textarea>
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
            <div class="publish-button-container">
              <pv-button type="submit" class="publish-button">Actualizar</pv-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.dialog {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  width: 100%;
  margin: 1rem;
  max-height: 100vh;
  overflow: hidden;
}

.dialog-container {
  padding: 1rem;
  text-align: center;
  max-height: 70vh;
  overflow-y: auto;
}


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

.form-columns {
  display: flex;
  gap: 1rem;
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

.publish-button{
  background-color: #000;
  color: #FFD146;
  padding: 0.5rem 1.5rem;
  border-radius: 10px;
  transition: 0.43s;
}

.publish-button:hover{
  background-color: #FFD146;
  color: #000;
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