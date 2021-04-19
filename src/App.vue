<template>
  <div id="q-app">
    <transition name="scale" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  created() {
    this.$q.dark.set(true);
  },
  updated() {
    console.log(this.Usuario.rol);
    if (this.Usuario.rol == undefined) {
      if (this.$router.currentRoute.path != "/") {
        this.$router.push("/");
      } else {
      }
    }
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
  },
};
</script>

