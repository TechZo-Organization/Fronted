<script>
import { Product } from "../model/product.entity.js";

export default {
  name: "card-product",
  props:{
    product: Product
  }
}
</script>

<template>
  <pv-card class="card-container" v-if="product.boost === false">
    <template #title>
      <img :src="product.images" alt="Imagen del producto" class="product-image">
      <div class="location-content">
        <img src="../../../public/donations/location-icon.png" style="width: 20px; height: 20px;"/>
        <h4>{{product.contact_information["district"]}}, {{product.contact_information["departament"]}}</h4>
      </div>
    </template>
    <template #content>
      <div class="main-content">
        <div class="card-content">
          <h2 class="product-name">{{ product.product_name }}</h2>
          <h3>{{product.category["name"]}}</h3>
          <p class="product-description">{{ product.description }}</p>
        </div>
        <hr>
        <div class="exchange-content">
          <img src="../../../public/products/exchange.icon.png" style="width: 16px; height: 16px;"/>
          <p class="product-changefor">{{product.change_for}}</p>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="footer-content">
        <h3>s/.{{product.price}} valor apróx.</h3>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.card-container {
  background-color: #fff;
  width: 280px;
  box-shadow: 0px 0px 20px 0px #cccccc;
  height: auto;
  margin: 0.8rem;
  cursor: pointer;
  transition: 0.3s;
}

.card-container:hover {
  box-shadow: 0px 0px 20px 0px #636363;
}

.product-image {
  width: 100%;
  height: 40vh;
}

.location-content {
  background-color: #000;
  color: #fff;
  padding: 0.8rem;
  font-size: 13px;
  font-weight: bolder;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
}

.card-content {
  padding: 0.6rem;
}

.product-name {
  font-weight: bolder;
  font-size: 16.5px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-content h3 {
  font-weight: bolder;
  font-size: 14px;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  color: #989898;
}

.product-description {
  font-size: 13px;
  text-align: justify;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.5rem;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

hr {
  border: none;
  height: 1.5px;
  background-color: #ffd146;
  margin-left: 15px;
  margin-right: 15px;
}

.exchange-content {
  padding: 1rem 0.6rem 0.6rem 0.6rem;
  display: flex;
  gap: 5px;
}

.product-changefor {
  font-size: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.5rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.footer-content {
  background-color: #ffd146;
  font-weight: bolder;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  text-align: center;
}
</style>
