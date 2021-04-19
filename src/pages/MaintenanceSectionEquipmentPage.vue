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
            style="
              padding: 0.5rem;
              margin: 2rem 1rem 0rem 1rem;
              border-radius: 0.5rem;
              background-color: #193d5c;
            "
          >
            Mantenimientos por equipo
          </h5>
          <q-btn
            icon="queue"
            style="
              margin: 0rem 1rem 4rem 0rem;
              border-radius: 4rem;
              height: 65px;
              width: 65px;
            "
            @click="MaintenanceCreate()"
            color="primary"
            push
            class="shadow-24 text-white fixed-bottom-right z-top"
          />
        </div>
      </div>
    </q-header>
    <q-page-container>
      <router-view />
      <MaintenanceSectionEquipment style="margin-bottom: 3rem" />
    </q-page-container>
  </q-layout>
</template>

<script>
import MaintenanceSectionEquipment from "../components/MaintenanceSectionEquipment.vue";
import UserAccount from "../components/UserAccount";

export default {
  name: "CardsPage",

  components: {
    UserAccount,
    MaintenanceSectionEquipment,
  },

  data() {
    return {
      leftDrawerOpen: false,
    };
  },

  computed: {
    Usuario: {
      get() {
        return this.$store.state.global.Usuario;
      },
      set(Usuario) {
        this.$store.commit("global/updateUsuario", Usuario);
      },
    },
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

  methods: {
    MaintenanceCreate() {
      if (this.Usuario.rol == 1 || this.Usuario.rol == 2) {
        this.$router.push({ path: `/MaintenanceCreate/` });
      }
      if (this.Usuario.rol == 3) {
        this.$q.notify({
          position: "bottom",
          timeout: 2500,
          textColor: "white",
          type: "warning",
          message: `No tienes los permisos para crear un Mantenimiento`,
        });
        return;
      }
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
