<template>
  <q-layout id="q-app" view="lHh Lpr lFf">
    <q-page-container> <router-view /> </q-page-container>
    <q-toolbar
      v-if="
        (Usuario.rol == 1 || Usuario.rol == 2) &&
        this.$router.currentRoute.path != '/'
      "
      class="text-white shadow-2 fixed-bottom"
      :class="drawerState ? ' bg-Mycolor' : 'bg-primary'"
      style="border-radius: 0.5rem 0.5rem 0 0"
    >
      <q-tabs
        v-model="tab"
        shrink
        class="fit row wrap justify-around items-start content-start"
      >
        <q-tab
          @click="navegar('/Home')"
          icon="home"
          class="col"
          style="font-size: 0.6rem"
        >
          Home
        </q-tab>
        <q-tab
          @click="navegar('/UserCards')"
          icon="group"
          class="col"
          style="font-size: 0.6rem"
        >
          Usuarios
        </q-tab>

        <q-tab
          @click="navegar('/Calendar')"
          icon="event"
          class="col"
          style="font-size: 0.6rem"
        >
          Calendario
        </q-tab>
        <q-tab
          @click="navegar('/MaintenanceSection')"
          icon="engineering"
          class="col"
          style="font-size: 0.6rem"
        >
          Mantener
        </q-tab>
        <q-tab
          @click="navegar('/StatisticsSection')"
          icon="trending_up"
          class="col"
          style="font-size: 0.6rem"
        >
          Estadísticas
        </q-tab>
      </q-tabs>
    </q-toolbar>
  </q-layout>
</template>

<script>
import GridCards from "../components/GridCards.vue";
import SearchBar from "../components/SearchBar";
import FilterDropDown from "../components/FilterDropDown";
import MenuNavigator from "../components/MenuNavigator";

export default {
  name: "LayoutDefault",

  components: {
    GridCards,
    SearchBar,
    FilterDropDown,
    MenuNavigator,
  },

  data() {
    return {
      leftDrawerOpen: false,
      tab: "",
      claseColumna: "col",
      currentRoute: false,
      rutaLogin: false,
    };
  },

  methods: {
    navegar(ruta) {
      if (ruta != this.$router.currentRoute.path)
        this.$router.replace({ path: ruta });
    },
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
    Usuario: {
      get() {
        if (this.$router.currentRoute.path === "/") {
          this.Usuario = {};
        }
        return this.$store.state.global.Usuario;
      },
      set(Usuario) {
        this.$store.commit("global/updateUsuario", Usuario);
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

.bg-Mycolor {
  background-color: #172330ff;
}
</style>
