<script>
import { homeApiService } from "../../home/services/home-api.service.js";
import { Product } from "../../home/model/product.entity.js";
import DialogDeletePost from "./dialog-delete-post.component.vue";
import DialogEditPost from "./dialog-edit-post.component.vue";

export default {
  name: 'post-profile',
  components: {DialogEditPost, DialogDeletePost},
  data() {
    return {
      products: [],
      categories: [],
      loading: true,
      error: null,
      dialogVisible: false,
      selectedId: null,
      editDialogVisible: false,  // Estado para el diálogo de edición
      selectedProduct: null
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    async fetchProducts() {
      const loggedUserId = localStorage.getItem('user');
      if (!loggedUserId) {
        this.error = 'No logged-in user found';
        this.loading = false;
        return;
      }
      try {
        const response = await new homeApiService().getProduct();
        const allProducts = response.data;
        this.products = allProducts
            .filter(product => product.user_id === loggedUserId)
            .map(product => new Product(
                product.id,
                product.product_name,
                product.description,
                product.change_for,
                product.price,
                product.images,
                product.category_id,
                product.boost,
                product.user_id,
                product.location
            ));
        this.loading = false;
      } catch (err) {
        this.error = err;
        this.loading = false;
      }
    },
    async fetchCategories() {
      try {
        const response = await new homeApiService().getCategoriesProduct();
        this.categories = response.data;
      } catch (err) {
        this.error = err;
      }
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : 'Unknown Category';
    },
    openConfirm(id){
      this.selectedId = id;
      this.dialogVisible = true;
      document.body.classList.add('no-scroll');
    },
    closeConfirm() {
      this.dialogVisible = false;
      document.body.classList.remove('no-scroll');
    },
    confirmDelete(id) {
      try {
        new homeApiService().deleteProduct(id);
        this.products = this.products.filter(product => product.id !== id);
        this.dialogVisible = false;
      } catch (err) {
        this.error = err;
      }
    },
    editPosts(id){
      this.selectedProduct = this.products.find(product => product.id === id);
      this.editDialogVisible = true;
      document.body.classList.add('no-scroll');
    }
  },
  async created() {
    await this.fetchCategories();
    await this.fetchProducts();
  }
}
</script>

<template>
  <div class="post-content">
    <div class="user-offers-title">
      <p>IntercambioZ Publicados:</p>
    </div>
    <div class="line-text">
      <div class="line"></div>
    </div>
    <div class="post-list">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error.message }}</div>
      <div v-else>
        <div class="post-cards-container">
          <div v-for="product in products" :key="product.product_name" class="card-post">
            <div class="card-content">
              <div class="image-post">
                <img :src="product.images[0]" />
              </div>
              <div class="post-info">
                <div class="post-title">
                  <div class="post-title-header">
                    <router-link :to="`/product-information/${product.id}`" @click.native="scrollToTop">
                      <h1>{{ product.product_name }}</h1>
                    </router-link>
                    <div class="post-title-actions">
                      <button @click="editPosts(product.id)" class="delete__button" title="Editar">
                        <img src="../../../public/profile/edit.png" alt="edit" style="height: 18px;width:18px">
                      </button>
                      <button @click="openConfirm(product.id)" class="delete__button" title="Eliminar">
                        <img src="../../../public/profile/delete.png" alt="delete" style="height: 18px;width:18px">
                      </button>
                    </div>
                  </div>
                  <h2>{{ getCategoryName(product.category_id) }}</h2>
                </div>
                <div class="post-details">
                  <p>{{ product.description }}</p>
                  <div class="icon-detail">
                    <img src="../../../public/donations/location-icon.png"/>
                    <p>{{ product.location.district }}, {{ product.location.departament }}</p>
                  </div>
                  <div class="icon-detail">
                    <img src="../../../public/products/exchange.icon.png"/>
                    <p>{{ product.change_for }}</p>
                  </div>
                  <h2>Valor aproximado s/.{{ product.price }}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <dialog-edit-post
        :visible="editDialogVisible"
        :product="selectedProduct"
        @close="editDialogVisible = false"
        @updated="fetchProducts()"
    />
    <dialog-delete-post
        :visible="dialogVisible"
        @close="closeConfirm()"
        @confirm="confirmDelete(selectedId)"
    />
  </div>

</template>

<style scoped>

.post-content h1{
  text-align: left;
  font-weight: bolder;
  font-size: 25px;
  padding-bottom: 1rem;
}

.post-list{
  padding-top: 2rem;
  justify-content: center;
  text-align: center;
  display: flex;
}

.post-cards-container {
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
}

.card-post {
  background-color: #fff;
  display: flex;
  margin-bottom: 2.5rem;
  width: 100%;
  cursor: pointer;
  transition: 0.43s;
  height: fit-content;
}

.card-post:hover{
  box-shadow: 0px 0px 20px 0px #857d7d;
}

.card-content{
  display: flex;
  width: 100%;
}

.image-post{
  width: 40%;
  height:100%;
}

.image-post img{
  width: 100%;
  height:100%;
  max-height:fit-content;
  object-position: center;
  object-fit:cover;
}

.post-info{
  width: 70%;
}

.post-title{
  background-color: #000;
  color: #fff;
  text-align: left;
  padding: 0.5rem;
}

.post-title-header {
  color: white;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Montserrat', sans-serif;
}

.post-title-header h1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}
.post-title-actions{
  gap:5px;
  display: flex;
  flex-direction: row;
  padding:0 0 16px;
  padding-left: 5px;
}

.post-title h1{
  transition: 0.43s;
}

.post-title h1:hover{
  color: #FFD146;
}

.post-title h2{
  font-size: 20px;
}

.icon-detail{
  display: flex;
  gap: 0.5rem;
}

.icon-detail img{
  width: 20px;
  height: 20px;
  padding-top: 0.1rem;
}

.post-details {
  padding: 1rem;
  text-align: justify;
}

.post-details p{
  padding-bottom: 1rem;
}

.post-details h2{
  font-weight: bolder;
}

@media only screen and (max-width: 650px) {
  .post-cards-container{
    display: grid;
    grid-template-columns: 1fr;
  }
  .card-post, .card-content{
    display: grid;
    grid-template-columns: 1fr;
  }
  .image-post{
    width: 100%;
  }
  .post-info{
    width: 100%;
  }
  .post-title-actions{
    gap:5px;
    display: flex;
    flex-direction: column;
    padding:0 0 16px;
    padding-left: 5px;
  }
  .post-cards-container {
    max-width: 300px;
  }
}

</style>
