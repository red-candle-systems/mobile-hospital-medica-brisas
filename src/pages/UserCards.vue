<template>
  <q-layout id="q-app" view="lHh Lpr lFf">
    <q-header
      class="glossy"
      style="height: 150px; border-radius: 0 0 1rem 1rem"
      :class="drawerState ? 'bg-Mycolor' : 'bg-primary'"
    >
      <q-toolbar>
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
        <div
          style="margin-top: 0.8rem"
          class="col-md-12 col-12"
          :class="drawerState ? 'bg-Mycolor' : 'bg-primary'"
        >
          <SearchBarUsers />
        </div>
      </div>
    </q-header>
    <q-page-container style="margin-top: 1.5rem; margin-bottom: 3.5rem">
      <q-pull-to-refresh @refresh="refreshUsers">
        <router-view />
        <GridCardsUser />
      </q-pull-to-refresh>

      <div
        v-if="Usuario.rol == 1"
        class="fixed-bottom-right z-top"
        style="margin-bottom: 3rem"
      >
        <q-btn
          icon="queue"
          style="
            margin: 0rem 1rem 1rem 0rem;
            border-radius: 4rem;
            height: 65px;
            width: 65px;
          "
          @click="userCreate()"
          :class="drawerState ? 'bg-blue-10' : 'bg-Mycolor'"
          push
          class="shadow-24 text-white"
        />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import GridCardsUser from "../components/GridCardsUser.vue";
import SearchBarUsers from "../components/SearchBarUsers";
import UserAccount from "../components/UserAccount";

export default {
  name: "UserCreate",

  components: {
    GridCardsUser,
    SearchBarUsers,
    UserAccount,
  },

  data() {
    return {
      leftDrawerOpen: false,
      tab: "",
    };
  },

  methods: {
    userCreate() {
      this.$router.push({ path: `/CreateUser/` });
    },
    navegar(ruta) {
      if (ruta != this.$router.currentRoute.path)
        this.$router.replace({ path: ruta });
    },
    async refreshUsers(done) {
      await this.$store.dispatch("cardState/getUsersAction");
      done();
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
</style>