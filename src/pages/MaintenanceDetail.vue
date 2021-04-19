<template>
  <div class="q-pa-md">
    <q-layout id="q-app-2" view="lHh Lpr lFf">
      <q-header
        :class="drawerState ? ' bg-Mycolor' : 'bg-primary'"
        class="glossy"
        style="height: 150px; border-radius: 0 0 1rem 1rem"
      >
        <q-toolbar class="justify-center">
          <q-img
            basic
            class="shadow-7"
            src="../assets/logo2.jpg"
            style="
              margin-top: 0.5rem;
              height: 60px;
              width: 100%;
              border-radius: 0.5rem;
            "
          ></q-img>
          <div class="fixed-top-right">
            <UserAccount></UserAccount>
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
              Detalles del mantenimiento
            </h5>
          </div>
        </div>
      </q-header>
      <q-page-container style="margin-bottom: 1.5rem">
        <MaintenanceInputDetail />
        <br />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import UserAccount from "../components/UserAccount";
import MaintenanceInputDetail from "../components/MaintenanceInputDetail";

export default {
  name: "MaintenanceDetail",

  components: {
    UserAccount,
    MaintenanceInputDetail,
  },

  data() {
    return {
      leftDrawerOpen: false,
      Numero: 9,
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
