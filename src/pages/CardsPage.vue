<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="glossy"
      style="height: 150px; border-radius: 0 0 1rem 1rem"
      :class="drawerState ? 'bg-Mycolor' : 'bg-primary'"
    >
      <q-toolbar>
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
          <UserAccount></UserAccount>
        </div>
      </q-toolbar>

      <div class="row">
        <div>
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
        </div>
        <SearchBar
          style="margin-top: 0.8rem"
          class="col-12"
          :class="drawerState ? 'bg-Mycolor' : 'bg-primary'"
        />
      </div>
    </q-header>
    <q-page-container style="margin-top: 1.5rem; margin-bottom: 3.5rem">
      <q-pull-to-refresh @refresh="refreshEquipos">
        <router-view />
        <GridCards />
      </q-pull-to-refresh>
      <div v-if="Usuario.rol == 1" class="fixed-bottom-right z-top;">
        <q-btn
          icon="queue"
          style="
            margin: 0rem 1rem 4rem 0rem;
            border-radius: 4rem;
            height: 65px;
            width: 65px;
          "
          :class="drawerState ? 'bg-blue-10' : 'bg-Mycolor'"
          @click="equipmentCreate()"
          push
          class="shadow-24 text-white"
        />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import GridCards from "../components/GridCards.vue";
import SearchBar from "../components/SearchBar";
import FilterDropDown from "../components/FilterDropDown";
import UserAccount from "../components/UserAccount";
import service from "../apiservice/service.js";

export default {
  name: "CardsPage",

  components: {
    GridCards,
    SearchBar,
    FilterDropDown,
    UserAccount,
  },

  data() {
    return {
      leftDrawerOpen: false,
      EquiposOrdenados: [],
      tab: "",
      cargar: false,
    };
  },

  methods: {
    equipmentCreate() {
      this.$router.push({ path: `/EquipmentCreate/` });
    },
    //boton de la nube que carga los equipos directamente desde la api
    async refreshEquipos(done) {
      await this.$store.dispatch("cardState/getEquipmentsAction");
      done();
    },
  },

  computed: {
    Equipos: {
      get() {
        return this.$store.state.cardState.Equipos;
      },
      set(Equipos) {
        this.$store.commit("cardState/updateEquipments", Equipos);
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
    Usuario: {
      get() {
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
.btn-color {
  background-color: #0076c4ff;
}
</style>
