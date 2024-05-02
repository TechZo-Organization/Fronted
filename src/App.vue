<script>
import ToolbarContent from "./public/components/toolbar-content.component.vue";
import FooterContent from "./public/components/footer-content.component.vue";
import LoginContent from "./login/login-content.component.vue";

export default {
  components:{
    LoginContent,
    FooterContent,
    ToolbarContent,
  },

}
</script>

<template>
  <div id="app">
    <toolbar-content v-if="$route.path !== '/log-in' && $route.path !== '/register'
    && $route.path !== '/admin'
    && $route.path !== '/admin/users'
    && $route.path !== '/admin/ongs'
    && $route.path !== '/admin/memberships'
    && $route.path !== '/admin/categories-product'
    && $route.path !== '/admin/categories-ong'"
    ></toolbar-content>
    <router-view></router-view>
    <footer-content v-if="$route.path !== '/log-in' && $route.path !== '/register'
    && $route.path !== '/admin'
    && $route.path !== '/admin/users'
    && $route.path !== '/admin/ongs'
    && $route.path !== '/admin/memberships'
    && $route.path !== '/admin/categories-product'
    && $route.path !== '/admin/categories-ong'"
    ></footer-content>
  </div>
</template>

<style scoped>

</style>
