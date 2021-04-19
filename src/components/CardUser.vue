<template>
  <q-card class="my-card" @click="SelectUser(id)">
    <q-card-section horizontal style="width: 100%">
      <q-img
        basic
        class="col-5"
        style="width: 115px; height: 115px; margin: 0.5rem; border-radius: 1rem"
        :src="image"
      />

      <q-card-section style="width: 100%">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :bar-style="barStyle"
          style="height: 100px; width: 100%"
        >
          <div>Nombre: {{ name }}</div>
          <div>Teléfono: {{ phone }}</div>
          <div>Correo: {{ mail }}</div>
        </q-scroll-area>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      thumbStyle: {
        right: "-6px",
        borderRadius: "1px",
        backgroundColor: "#027be3",
        width: "2px",
        opacity: 0.75,
      },

      barStyle: {
        right: "-6px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "2px",
        opacity: 0.2,
      },
    };
  },
  created() {
    //No hagas nada
  },
  props: {
    name: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "user1.png",
    },

    mail: {
      type: String,
      default: "@gmail.com",
    },

    phone: {
      type: String,
      default: "",
    },

    id: {
      type: String,
    },
  },
  methods: {
    SelectUser(id) {
      console.log(this.$store.state.cardState.Usuarios);
      try {
        var userSelected = this.$store.state.cardState.Usuarios.filter(
          (user) => user.ID_Usuario == id
        );
        this.UserSelected = userSelected;
        if (this.Usuario.rol == 3 || this.Usuario.rol == 2) {
          //No hagas nada
          console.log(this.Usuario.id);
          if (this.Usuario.id == id) {
            this.$router.push({ path: `/UserDetail/` });
          }
        } else if (this.Usuario.rol == 1) {
          this.$router.push({ path: `/UserDetail/` });
          //console.log(userSelected);
        }
      } catch (error) {}
    },
  },
  computed: {
    UserSelected: {
      get() {
        return this.$store.state.cardState.UserSelected;
      },
      set(UserSelected) {
        this.$store.commit("cardState/updateUserSelected", UserSelected);
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

<style lang="sass" scoped>
.my-card
  margin-top: -0.9rem
  border-radius: 0.5rem
</style>