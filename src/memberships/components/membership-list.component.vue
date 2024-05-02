<script>
import CardMembership from "./card-membership.component.vue";
export default {
  name: "membership-list",
  components: {
    CardMembership,
  },
  props: {
    memberships: Object,
  }
}
</script>

<template>
  <div v-for="membership in memberships" class="list-container">
    <card-membership :membership="membership" ></card-membership>
  </div>
</template>

<style scoped>
</style>