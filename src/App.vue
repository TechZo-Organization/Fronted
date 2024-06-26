<script>
import ToolbarContent from "./public/components/toolbar-content.component.vue";
import FooterContent from "./public/components/footer-content.component.vue";
import { mapState } from 'vuex';

export default {
  components: {
    ToolbarContent,
    FooterContent,
  },
  data() {
    return {
      showNavFooter: true,
    };
  },
  computed: {
    ...mapState(['someState']),
  },
  watch: {
    $route(to, from) {
      this.updateShowNavFooter(to);
    },
  },
  created() {
    this.updateShowNavFooter(this.$route);
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
      });
    },
    updateShowNavFooter(route) {
      const noNavFooterRoutes = [
        '/log-in',
        '/register',
        '/admin',
        '/admin/users',
        '/admin/ongs',
        '/admin/memberships',
        '/admin/categories-product',
        '/admin/categories-ong',
        '/membership-payment/1',
        '/membership-payment/2',
        '/membership-payment/3',
        '/verify-email',
        '/change-password'
      ];
      this.showNavFooter = !noNavFooterRoutes.includes(route.path);
      if (route.path === '/log-in'|| route.path === '/home') {
        localStorage.removeItem('id-temporal');
      }
      if (route.path.startsWith('/')) {
        this.scrollToTop();
      }
    }
  }
};
</script>

<template>
  <div id="app">
    <toolbar-content v-if="showNavFooter"></toolbar-content>
    <router-view></router-view>
    <footer-content v-if="showNavFooter"></footer-content>
  </div>
</template>

<style scoped>

</style>
