<script>
import ToolbarAdmin from "./toolbar-admin.component.vue";
import axios from "axios";

export default {
  name: 'crud-ongs',
  components: {ToolbarAdmin},
  data(){
    return {
      idEdit: null,
      Organizations: [],
      id: '',
      name:'',
      type: '',
      district: '',
      city: '',
      logo: ''
    };
  },
  created(){
    axios.get('https://662adbcede35f91de15695c4.mockapi.io/cambiazo/ongsadmin')
        .then((response)=> {
          this.Organizations=response.data;
        })
        .catch((error)=>{
          console.log(error);
        });
  },
  methods: {
    addCategoryOng(){
      const id = this.Organizations.length + 1;
      axios.post('https://662adbcede35f91de15695c4.mockapi.io/cambiazo/ongsadmin', {
        id: this.id,
        name: this.name,
        type: this.type,
        district: this.district,
        city: this.city,
        logo: this.logo
      })
          .then((response)=> {
            this.Organizations.push(response.data);
          })
          .catch((error)=>{
            console.log(error);
          });
    },
    deleteCategoryOng(id){
      axios.delete('https://662adbcede35f91de15695c4.mockapi.io/cambiazo/ongsadmin/'+id)
          .then((response)=> {
            this.Organizations = this.Organizations.filter((organization)=> organization.id !== id);
          })
          .catch((error)=>{
            console.log(error);
          });
    },
    editCategoryOng(id){
      const organization = this.Organizations.find((organization)=> organization.id === id);
      this.id = organization.id;
      this.name = organization.name;
      this.type = organization.type;
      this.district = organization.district;
      this.city = organization.city;
      this.logo = organization.logo;
      this.idEdit=id;
    },
    confirmEdit(){
      const organization = this.Organizations.find((organization)=> organization.id === this.idEdit);
      axios.put('https://662adbcede35f91de15695c4.mockapi.io/cambiazo/ongsadmin/'+organization.id, {
        id: organization.id,
        name: this.name,
        type: this.type,
        district: this.district,
        city: this.city,
        logo: this.logo
      })
          .then((response)=> {
            this.Organizations = this.Organizations.map((organization)=> {
              if(organization.id === this.idEdit){
                organization.id = this.id;
                organization.name = this.name;
                organization.type = this.type;
                organization.district = this.district;
                organization.city = this.city;
                organization.logo = this.logo;
              }
              return organization;
            });
          })
          .catch((error)=>{
            console.log(error);
          });
    },
    cancelEdit(){
      this.idEdit = null;
      this.name = '';
      this.type = '';
      this.district = '';
      this.city = '';
      this.logo = '';
    },
  }
}
</script>

<template>
  <div style="background-color: #F8F7F4;">
    <br><br><br>
    <toolbar-admin></toolbar-admin>
    <h1 style="text-align: center; font-size: 30px; font-weight: bolder; padding-top: 2rem;">Ongs</h1>
    <div class="crud-container">
      <div class="input-crud">
        <pv-button @click="addCategoryOng" class="b-add">Add</pv-button>
        <label for="title">Name: </label>
        <pv-input v-model="name" id="name" required="true" class="input"></pv-input>

        <label for="title">Type: </label>
        <pv-input v-model="type" id="type" required="true" class="input"></pv-input>

        <label for="title">District: </label>
        <pv-input v-model="district" id="district" required="true" class="input"></pv-input>

        <label for="title">City: </label>
        <pv-input v-model="city" id="city" required="true" class="input"></pv-input>

        <label for="title">Logo: </label>
        <pv-input v-model="logo" id="logo" required="true" class="input"></pv-input>

        <pv-button @click="confirmEdit" class="b-confirm-edit">Confirm</pv-button>
        <pv-button @click="cancelEdit" class="b-cancel-edit">Cancel</pv-button>
      </div>
      <div class="table-crud">
        <table>
          <thead>
          <th>Id</th>
          <th>Name</th>
          <th>Type</th>
          <th>District</th>
          <th>City</th>
          <th>Logo</th>
          <th>Actions</th>
          </thead>
          <tbody>
          <tr v-for="organization in Organizations" :key="organization.id">
            <td>{{organization.id}}</td>
            <td>{{organization.name}}</td>
            <td>{{organization.type}}</td>
            <td>{{organization.district}}</td>
            <td>{{organization.city}}</td>
            <td><img :src="organization.logo" alt="Logo Ong" width="80"></td>
            <td>
              <div style="display:flex; gap: 5px;">
                <img src="../../../public/admin/edit-icon.png" height="30" width="30" @click="editCategoryOng(organization.id)" style="cursor: pointer;">
                <img src="../../../public/admin/delete-icon.png" height="30" width="30" @click="deleteCategoryOng(organization.id)" style="cursor: pointer;"/>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crud-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 3rem;
}

.input-crud {
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  gap: 8px;
  align-items: center;
  width: 80%;
}

.input{
  border: 1px solid #ccc;
  background-color: #fff;
}

.b-add{
  background-color: #ffd146;
  padding: 0.25rem 2rem 0.25rem 2rem;
  font-weight: bolder;
  border-radius: 5px;
  justify-content: center;
  transition: 0.43s;
}

.b-add:hover{
  background-color: #000;
  color: #ffd146;
}

.b-confirm-edit{
  background-color: #32aa32;
  color: #fff;
  font-weight: bolder;
  border-radius: 5px;
  padding: 0.25rem 2rem 0.25rem 2rem;
  justify-content: center;
  transition: 0.43s;
}

.b-confirm-edit:hover{
  box-shadow: 0px 0px 10px 0px #32aa32;
}

.b-cancel-edit{
  background-color: #8e2b2b;
  color: #fff;
  font-weight: bolder;
  border-radius: 5px;
  padding: 0.25rem 2rem 0.25rem 2rem;
  justify-content: center;
  transition: 0.43s;
}

.b-cancel-edit:hover{
  box-shadow: 0px 0px 10px 0px #8e2b2b;
}

.table-crud {
  text-align: justify;
  background-color: #fff;
}

.table-crud table {
  width: 100%;
  border-collapse: collapse;
}

.table-crud th,
.table-crud td {
  padding: 8px;
  border-bottom: 1px solid #ccc;
}

.table-crud th:first-child,
.table-crud td:first-child {
  border-right: 1px solid #ccc;
}

.table-crud th:not(:last-child),
.table-crud td:not(:last-child) {
  border-right: 1px solid #ccc;
}

@media screen and (max-width: 980px){
  .input-crud{
    display: grid;
    width: 50%;
    padding-bottom: 4rem;
  }
  .input-crud label{
    text-align: left;
  }
  .b-confirm-edit{
    margin-top: 2rem;
  }

}

</style>

