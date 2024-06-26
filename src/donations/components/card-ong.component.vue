<script>
import { Ong } from "../model/ong.entity.js";

export default {
  name: 'card-ong',
  props:{
    ong: Ong
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    getPenultimateAddressPart(text) {
      const parts = text.split(',').map(part => part.trim());
      return parts.length > 1 ? parts[parts.length - 3] : text;
    }
  }
}
</script>

<template>
  <router-link :to="`/ong-information/${ong.id}`" @click.native="scrollToTop">
    <pv-card>
      <template #title>
        <div class="card-container">
          <div class="card-image">
            <img :src="ong.urlLogo" alt="Logo de la ONG" />
          </div>
          <div class="card-main">
            <div class="card-title">
              <div>
                <h1>{{ ong.name }}</h1>
              </div>
              <div class="card-location">
                <img src="../../../public/donations/location-icon.png" style="width: 3vh; height: 3vh; margin-right: 2px;"/>
                <h1>{{ getPenultimateAddressPart(ong.address) }}</h1>
              </div>
            </div>
            <div class="card-content">
              <div>
                <h1>{{ ong.type }}</h1>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #content>
      </template>
    </pv-card>
  </router-link>
</template>

<style scoped>
.card-container{
  background-color: #fff;
  display: flex;
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #cccccc;
  border-radius: 10px;
  height: 100%;
  transition: 0.43s;
  cursor: pointer;
}

.card-container:hover{
  box-shadow: 0px 0px 8px 0px #989898;
}

.card-image img{
  width: 12vh;
  height: 12vh;
  border-radius: 10px;
}

.card-main{
  padding: 0.7rem;
  width: 100%;
}

.card-title{
  justify-content: space-between;
  display:flex;
  width: 100%;
}

.card-title h1{
  font-weight: bolder;
  font-size: 17px;
}

.card-location{
  display: flex;
  align-items: center;
}

.card-content{
  text-align: justify;
  padding-top: 10px;
}

@media screen and (max-width: 900px){
  .card-title{
    display: grid;
  }
}
</style>
