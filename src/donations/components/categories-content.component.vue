<script>
export default {
  name: 'input-category',
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchText: '',
    };
  },
  methods: {
    handleSubmit() {
      const selectedCategories = this.categories
          .filter(category => category.accept)
          .map(category => category.id);
      this.$emit('filterOngs', { searchText: this.searchText, categories: selectedCategories });
    },
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h1>Categorías</h1>
    <div v-for="category in categories" :key="category.id">
      <div class="category">
        <pv-checkbox v-model="category.accept" :binary="true" class="check-b" />
        <label>{{ category.name }}</label>
      </div>
    </div>
    <br><hr><br>
    <h1>Localización</h1>
    <pv-input v-model="searchText" class="input-category" placeholder="Ejem: San Borja"></pv-input>
    <hr><br>
    <pv-button class="b-filter" type="submit">
      Filtrar
    </pv-button>
  </form>
</template>

<style scoped>

form{
  padding: 2rem;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #c6c6c6;
}

form h1{
  font-size: 25px;
  font-weight: bolder;
  padding-bottom: 1rem;
}

.category{
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.check-b{
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid #cccccc;
  border-radius: 5px;
  color: #FFD146;
  margin-right: 0.5rem;
  font-size: 20px;
  font-weight: 900;
}

.input-category{
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 2.5rem;
  border: 1px solid #cccccc;
  border-radius: 10px;
  transition: 0.43s;
}

.input-category:focus{
  outline: none;
}

.b-filter{
  width: 100%;
  background-color: #FFD146;
  color: #000;
  font-weight: bolder;
  text-align: center;
  justify-content: center;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  border-radius: 10px;
  font-size: 1.2rem;
  margin-top: 3rem;
  transition: 0.43s;
}

.b-filter:hover{
  background-color: #000;
  color: #FFD146;
}

</style>