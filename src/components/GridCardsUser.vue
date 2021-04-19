<template>
  <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
    <q-spinner-cube
      v-if="Usuarios.length === 0"
      indeterminate
      reverse
      size="100px"
      :thickness="1"
      :color="drawerState ? 'white' : 'primary'"
      track-color="light-blue"
      class="fixed-center"
    />
    <q-item-label
      v-if="Usuarios.length === 0"
      class="fixed-center z-top text-white"
      style="
        background-color: rgb(0, 0, 0, 0.5);
        border-radius: 0.5rem;
        padding: 0.5rem;
        margin-top: 4.4rem;
      "
      overline
      >Cargando usuarios...</q-item-label
    >
    <div
      class="col-lg-3 col-md-3 col-sm-6 col-xs-12"
      v-for="(n, index) in Usuarios"
      v-bind:key="index"
    >
      <card-user
        :image="n.Foto"
        :id="n.ID_Usuario"
        :name="n.Nombre"
        :mail="n.Correo"
        :phone="n.Telefono"
      />
    </div>
  </div>
</template>

<script>
import CardUser from "./CardUser.vue";

export default {
  name: "LayoutDefault",

  components: {
    CardUser,
  },
  data() {
    return {
      Numero: 10,
      CardsUser: [],
    };
  },

  created() {
    if (this.Usuario.rol == 3 || this.Usuario.rol == 2) {
      this.$q.notify({
        position: "bottom",
        timeout: 1000,
        color: "blue-10",
        textColor: "white",
        icon: "warning",
        message: `Solo puedes actualizar tu propio usuario`,
      });
    }
  },

  computed: {
    //STATE DE LOS USUARIOS
    Usuarios: {
      get() {
        return this.$store.state.cardState.Usuarios;
      },
      set(Usuarios) {
        this.$store.commit("cardState/updateUsers", Usuarios);
      },
    },
    //State del modo oscuro
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
    //State del usuario actualmente logueado
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
