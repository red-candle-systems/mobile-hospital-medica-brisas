<template>
  <div>
    <q-toggle color="blue" v-model="drawerState" />
  </div>
</template>

<script>
export default {
  computed: {
    drawerState: {
      get() {
        if (this.$store.state.showcase.drawerState) {
          this.$q.dark.set(true);
        } else {
          this.$q.dark.set(false);
        }
        return this.$store.state.showcase.drawerState
      },
      set(val) {
        this.$store.commit("showcase/updateDrawerState", val);
      },
    },
  },
};
</script>