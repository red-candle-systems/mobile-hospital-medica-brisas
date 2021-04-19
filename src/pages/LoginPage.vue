<template>
  <div>
    <Login></Login>
  </div>
</template>
<script>
import Login from "../components/Login.vue";
export default {
  name: "EquipmentDetail",

  components: {
    Login,
  },

  computed: {
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

