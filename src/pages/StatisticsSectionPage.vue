<template>
  <q-layout id="q-app" class="q-pa-md" view="lHh Lpr lFf">
    <q-header
      class="glossy"
      style="height: 150px; border-radius: 0 0 1rem 1rem"
      :class="drawerState ? ' bg-black' : 'bg-primary'"
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
          <user-account />
        </div>
      </q-toolbar>
      <div class="row">
        <div class="col-md-2 col-2">
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
        </div>
        <div class="col-12" style="text-align: center; margin-top: -0.8rem">
          <h5
            style="
              padding: 0.5rem;
              margin: 2rem 1rem 0rem 1rem;
              border-radius: 0.5rem;
              background-color: #193d5c;
            "
          >
            Indicadores por mes
          </h5>
        </div>
      </div>
    </q-header>

    <!--DESPUES DEL ENCABEZADO DE LOS BOTONES-->
    <div
      class="bg-blue-10 glossy"
      style="
        width: 100%;
        height: 0.5rem;
        border-radius: 0.5rem;
        margin-top: -0.5rem;
      "
    ></div>
    <div class="row no-wrap justify-end">
      <div class="col-auto">
        <q-btn
          push
          icon="logout"
          label="Salir"
          style="margin: 1rem"
          color="primary"
          to="/Home"
        />
      </div>
    </div>
    <div
      class="bg-blue-10 glossy"
      style="width: 100%; height: 0.5rem; border-radius: 0.5rem"
    />
    <!--DESPUES DEL ENCABEZADO DE LOS BOTONES-->

    <q-page-container>
      <router-view />
      <statistics-section style="margin-top: -5.5rem; margin-bottom: 3rem" />
    </q-page-container>
  </q-layout>
</template>

<script>
import StatisticsSection from "src/components/StatisticsSection.vue";
import UserAccount from "../components/UserAccount";

export default {
  name: "statistics-section-page",

  components: {
    UserAccount,
    StatisticsSection,
  },

  data() {
    return {
      leftDrawerOpen: false,
      home: false,
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
