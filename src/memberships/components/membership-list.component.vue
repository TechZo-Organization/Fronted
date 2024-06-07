<script>
import CardMembership from "./card-membership.component.vue";
export default {
  name: "membership-list",
  components: {
    CardMembership,
  },
  props: {
    memberships: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div v-for="membership in memberships" :key="membership.id" class="list-container">
    <card-membership :membership="membership" ></card-membership>
  </div>
</template>

<style scoped>
</style>