<template>
  <q-layout id="q-app" view="lHh Lpr lFf">
    <q-header
      class="glossy"
      style="height: 150px; border-radius: 0 0 1rem 1rem"
      :class="drawerState ? ' bg-Mycolor' : 'bg-primary'"
    >
      <q-toolbar class="justify-center">
        <q-img
          basic
          class="shadow-7"
          src="../statics/logo2.jpg"
          style="
            margin-top: 0.5rem;
            height: 60px;
            width: 100%;
            border-radius: 0.5rem;
          "
        ></q-img>
        <div class="fixed-top-right">
          <UserAccount />
        </div>
      </q-toolbar>
      <div class="row">
        <q-img
          basic
          src="../statics/logo.png"
          style="
            height: 4.1rem;
            width: 4.1rem;
            margin: 0.4rem;
            border-radius: 0.5rem;
          "
          class="fixed-top-left"
        />
        <q-btn
          to="/Home"
          style="
            height: 4.1rem;
            width: 4.1rem;
            margin: 0.4rem;
            border-radius: 0.5rem;
          "
          class="fixed-top-left"
        ></q-btn>
        <div class="col-12" style="text-align: center; margin-top: -0.8rem">
          <h5
            class="no-wrap"
            style="
              padding: 0.5rem;
              margin: 2rem 1rem 0rem 1rem;
              border-radius: 0.5rem;
              background-color: #193d5c;
              overflow-x: scroll;
              height: 46px;
            "
          >
            Todos los mantenimientos
          </h5>
        </div>
      </div>
    </q-header>
    <q-page-container>
      <router-view />
      <MaintenanceSection style="margin-bottom: 3rem" />
    </q-page-container>
  </q-layout>
</template>

<script>
import MaintenanceSection from "../components/MaintenanceSection.vue";
import UserAccount from "../components/UserAccount";

export default {
  name: "CardsPage",

  components: {
    UserAccount,
    MaintenanceSection,
  },

  data() {
    return {
      leftDrawerOpen: false,
    };
  },

  computed: {
    drawerState: {
      get() {
        if (this.$store.state.showcase.drawerState) {
          this.$q.dark.set(true);
        } else {
          this.$q.dark.set(false);
        }
        return this.$store.state.showcase.drawerState;
      },
      set(val) {
        this.$store.commit("showcase/updateDrawerState", val);
      },
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
