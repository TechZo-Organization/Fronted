<script>
import CategoriesProduct from "../../home/components/categories-product-content.component.vue";
import EveryProductList from "./every-product-list.vue";
import { homeApiService } from "../../home/services/home-api.service.js";
import { publishApiService } from "../../publish/services/publish-api.service.js";

export default {
  name: "product-category",
  components: { EveryProductList, CategoriesProduct },
  data() {
    return {
      category_products: [],
      products: [],
      boost_products: [],
      errors: [],
      homeApi: new homeApiService(),
      searchProduct: "",
      selectedCategory: "",

      countries: [],
      departments: [],
      cities: [],
      selectedCountry: null,
      selectedDepartment: null,
      selectedCity: null,
      minPrice: null,
      maxPrice: null,
      apiService: new publishApiService(),

      filterCriteria: {
        searchProduct: "",
        selectedCountry: null,
        selectedDepartment: null,
        selectedCity: null,
        minPrice: null,
        maxPrice: null,
      }
    };
  },
  created() {
    this.getAllProductCategories();
    this.getAllProducts();
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    async fetchCountries() {
      try {
        const response = await this.apiService.getCountry();
        this.countries = response.data;
      } catch (error) {
        console.error('Error fetching countries:', error);
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
    getAllProductCategories() {
      this.homeApi.getCategoriesProduct()
          .then((response) => {
            this.category_products = response.data;
          })
          .catch((error) => {
            this.errors.push(error);
          });
    },
    getAllProducts() {
      this.homeApi.getProduct()
          .then((response) => {
            this.products = response.data;
            this.boost_products = response.data.filter(product => product.boost);
          })
          .catch((error) => {
            this.errors.push(error);
          });
    },
    filterByCategory(categoryId) {
      this.selectedCategory = categoryId;
    },
    clearCategoryFilter() {
      this.selectedCategory = "";
      this.searchProduct = "";
      this.selectedCountry = null;
      this.selectedDepartment = null;
      this.selectedCity = null;
      this.minPrice = null;
      this.maxPrice = null;
      this.filterCriteria = {
        searchProduct: "",
        selectedCountry: null,
        selectedDepartment: null,
        selectedCity: null,
        minPrice: null,
        maxPrice: null,
      };
    },
    applyFilters() {
      this.filterCriteria = {
        searchProduct: this.searchProduct,
        selectedCountry: this.selectedCountry,
        selectedDepartment: this.selectedDepartment,
        selectedCity: this.selectedCity,
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
      };
    }
  },
  mounted() {
    this.fetchCountries();
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        const matchesCategory = this.selectedCategory ? product.category_id === this.selectedCategory : true;
        const matchesName = this.filterCriteria.searchProduct ? product.product_name.toLowerCase().includes(this.filterCriteria.searchProduct.toLowerCase()) : true;
        const matchesCountry = this.filterCriteria.selectedCountry ? product.location.country === this.filterCriteria.selectedCountry.country : true;
        const matchesCity = this.filterCriteria.selectedCity ? product.location.district === this.filterCriteria.selectedCity.name : true;
        const matchesPrice = (this.filterCriteria.minPrice ? product.price >= this.filterCriteria.minPrice : true) && (this.filterCriteria.maxPrice ? product.price <= this.filterCriteria.maxPrice : true);

        return matchesCategory && matchesName && matchesCountry && matchesCity && matchesPrice;
      });
    }
  }
};
</script>

<template>
  <div class="product-category-container">
    <h1 class="product-category-title">Publicaciones encontradas</h1>
    <div class="product-category-content">
      <div class="categories-container">
        <div class="categories">
          <h1>Categorías:</h1>
          <div class="categories-list">
            <categories-product :category_products="category_products" @category-selected="filterByCategory"></categories-product>
          </div>
          <div style="text-align: center;">
            <pv-button class="b-clear-category" @click="clearCategoryFilter">Eliminar filtro</pv-button>
          </div>
        </div>
        <div class="searcher-container">
          <h1>Búsqueda</h1>
          <form class="form-searcher" ref="form" @submit.prevent="applyFilters">
            <label><b>Palabra clave</b></label><br>
            <pv-input class="input" type="text" v-model="searchProduct"></pv-input>
            <br><br>
            <label><b>País</b></label><br>
            <pv-dropdown
                class="input dropdown-input"
                v-model="selectedCountry"
                :options="countries"
                optionLabel="name"
                placeholder="Elige un País"
                @change="onCountryChange"
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
                :class="{'disabled-dropdown': !selectedCountry}"
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
                :class="{'disabled-dropdown': !selectedDepartment}"
            />
            <br><br>
            <label><b>Precio</b></label><br>
            <div style="display: flex;">
              <pv-input v-model="minPrice" placeholder="Mínimo" class="input input-price-left" type="number"></pv-input>
              <span style="align-content: center; padding: 0.5rem; background-color: #eae9e9; border: 1px solid #ccc">
                <img src="../../../public/product-category/different-icon.png" height="35" width="35"/>
              </span>
              <pv-input v-model="maxPrice" placeholder="Máximo" class="input input-price-right" type="number"></pv-input>
            </div>
            <br><hr><br>
            <pv-button type="submit" class="submit b-publish" @click.native="scrollToTop">Filtrar</pv-button>
            <pv-button class="submit b-publish reload" @click="clearCategoryFilter" @click.native="scrollToTop">Reiniciar</pv-button>
          </form>
        </div>
      </div>

      <div class="products-container">
        <every-product-list v-if="filteredProducts.length" :products="filteredProducts" :categories="category_products"></every-product-list>
        <div v-else class="no-products"><h1>No se encontraron productos.</h1></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.no-products {
  margin-top: 3.5rem;
}

.no-products h1{
  font-size: 25px;
  font-weight: bolder;
  text-align: center;
}

.disabled-dropdown {
  background-color: #c6c6c6;
  color: #6a6565;
}

.product-category-title{
  background-color: #FFD146;
  padding: 1rem 0.5rem 1rem 1.5rem;
  font-weight: bolder;
  font-size: 30px;
  border-radius: 30px 0px 0px 0px;
  box-shadow: 0px 0px 20px 0px #cccccc;
}

.product-category-content{
  display: flex;
}

.categories-container{
  width: 25%;
}

.categories{
  background-color: #fff;
  box-shadow: 0px 0px 20px 0px #cccccc;
  padding: 1.1rem;
  margin-top: 3.5rem;
}

.categories h1{
  font-size: 20px;
  font-weight: bolder;
  margin: 0.2rem;
  padding-bottom: 0.8rem;
}

.categories-list{
  display: flex;
  flex-wrap: wrap;
}

.products-container{
  width: 75%;
}

.b-clear-category {
  text-align: center;
  justify-content: center;
  background-color: #000;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  transition: 0.43s;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.b-clear-category:hover {
  background-color: #FFD146;
  color: #000;
}

.searcher-container{
  background-color: #fff;
  box-shadow: 0px 0px 20px 0px #cccccc;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.searcher-container h1{
  font-size: 20px;
  font-weight: bolder;
  margin: 0.2rem;
  padding-bottom: 0.8rem;
}

.input-price-left{
  border-radius: 10px 0px 0px 10px;
}

.input-price-right{
  border-radius: 0px 10px 10px 0px;
}

.reload{
  background-color: #fff;
  border: 2px solid #FFD146;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}

@media only screen and (max-width: 1000px) {
  .product-category-content{
    flex-direction: column;
  }

  .categories-container{
    width: 100%;
  }

  .products-container{
    width: 100%;
  }
}


</style>