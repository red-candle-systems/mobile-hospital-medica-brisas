<template>
  <div>
    <div class="column" style="width: 100%">
      <q-toolbar class="text-white rounded-borders">
        <q-space />
        <q-input
          dark
          standout
          v-model="text"
          style="width: 100%; margin-left: -2rem"
          :label="'Buscar por ' + this.$store.state.global.TypeSearchUser"
          class="shadow-9"
          @keyup="searchBy"
        >
          <template v-slot:append>
            <q-icon
              @click="searchBy"
              :name="text !== '' ? 'search' : 'autorenew'"
            />
            <q-icon @click="borrarYrefrescar" v-if="text !== ''" name="clear" />
            <filter-drop-down-user></filter-drop-down-user>
          </template>
        </q-input>
      </q-toolbar>
    </div>
  </div>
</template>

<script>
import FilterDropDownUser from "./FilterDropDownUser";

export default {
  created() {
    this._getUsers();
  },

  components: {
    FilterDropDownUser,
  },

  data() {
    return {
      text: "",
      Type: "Nombre",
      ArregloOrdenado: [],
    };
  },

  methods: {
    searchBy() {
      var users = [];
      if (this.$data.text != "") {
        if (this.$store.state.global.TypeSearchUser === "Nombre") {
          users = this.Usuarios.filter((e) =>
            this.textoSimple(e.Nombre).includes(
              this.textoSimple(this.$data.text)
            )
          );
        }
        if (this.$store.state.global.TypeSearchUser === "Correo") {
          users = this.Usuarios.filter((e) =>
            this.textoSimple(e.Correo).includes(
              this.textoSimple(this.$data.text)
            )
          );
        }
        if (this.$store.state.global.TypeSearchUser === "Telefono") {
          users = this.Usuarios.filter((e) =>
            this.textoSimple(e.Telefono).includes(
              this.textoSimple(this.$data.text)
            )
          );
        }
        if (this.$store.state.global.TypeSearchUser === "Curp") {
          users = this.Usuarios.filter((e) =>
            this.textoSimple(e.Curp).includes(this.textoSimple(this.$data.text))
          );
        }

        if (users.length === 0) {
          this.$q.notify({
            color: "blue-10",
            textColor: "white",
            icon: "search_off",
            message: "No se ha encontrado ningún usuario",
          });
          this.text = "";
          this.Usuarios = this.UsuariosAux;
          users = this.UsuariosAux;
        } else {
          this.Usuarios = users;
        }
      } else {
        this._getUsers();
      }
    },
    //metodo para quitar los acentos y para convertir en mayuscula
    textoSimple(str) {
      const Original = "ÁáÉéÍíÓóÚúñÜüabcdefghijklmnopqrstuvwxyz";
      const Cambio = "AAEEIIOOUUÑUUABCDEFGHIJKLMNOPQRSTUVWXYZ";

      if (str == null) {
        return null;
      }
      let arreglo = str.split("");
      for (let i = 0; i < arreglo.length; i++) {
        for (let j = 0; j < Original.length; j++) {
          if (arreglo[i] == Original.charAt(j)) {
            arreglo[i] = Cambio.charAt(j);
            break;
          }
        }
      }
      return arreglo.join("");
    },
    //metdo que borra el texto y refresca de la api
    borrarYrefrescar() {
      this.$data.text = "";
      this.searchBy();
    },
    //metodo que trae los usuarios desde la api
    _getUsers() {
      this.Usuarios = this.UsuariosAux;
    },
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
    UsuariosAux: {
      get() {
        return this.$store.state.cardState.UsuariosAux;
      },
      set(UsuariosAux) {
        this.$store.commit("cardState/updateUsers", UsuariosAux);
      },
    },
  },
};
</script>
