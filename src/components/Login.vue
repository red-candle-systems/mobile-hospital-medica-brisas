<template>
  <div class="row" style="width: 100%; background-color: white">
    <div class="col-12" style="height: 80%">
      <q-img
        basic
        class="image-login"
        style="max-height: 300px"
        src="../assets/logo2.jpg"
      >
        <div class="absolute-full text-subtitle2 flex flex-center">
          <h3>Bienvenido</h3>
        </div>
      </q-img>
    </div>
    <div
      class="col-12 flex flex-center"
      style="width: 100%; height: 100%; background-color: white"
    >
      <q-form @reset="onReset">
        <q-form class="formStyle flex flex-center">
          <div
            style="width: 100%; height: 100%; margin: 1rem"
            class="flex flex-center"
          >
            <q-img
              basic
              src="../assets/logo5.png"
              class="imageStyle"
              width="50%"
            ></q-img>
          </div>

          <q-input
            filled
            class="transparent"
            v-model="mail"
            bg-color="indigo-2"
            label="Tu correo *"
            color="blue"
            hint="Nombre de usuario"
            lazy-rules
            style="opacity: 0.8; width: 80%"
            @key.enter="loginuser"
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor escribe algo',
            ]"
          /><q-input
            class="inputContra"
            filled
            color="blue"
            bg-color="indigo-2"
            v-model="contraseña"
            label="Contraseña *"
            style="opacity: 0.8; width: 80%"
            hint="Contraseña"
            lazy-rules
            type="password"
            @keyup.enter="loginuser"
            :rules="[
              (val) => (val && val.length > 0) || 'Por favor escribe algo',
            ]"
          />

          <div class="divBtn absolute-bottom" align="center">
            <q-btn
              label="Ingresar"
              @click="loginuser"
              :to="accept === true ? '/Home' : ''"
              color="primary"
            />
            <q-btn
              label="Reiniciar"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-form>
    </div>
  </div>
</template>
</template>

<script>
import { QSpinnerCube } from "quasar";

export default {
  data() {
    return {
      mail: null,
      contraseña: null,
      accept: false,
      todos: [], //Arreglo que uso para filtrar el nombre y la contraseña
      IDSEQUIPOS: [], //Arreglo de los Id de los equipos con un reporte
      reportes: [], //Arreglo de los reportes
      Nombre: "", //Nombre del Usuario que se loguea
      Rol: "", //Rol del usuario que se loguea
      correctUser: {},
    };
  },
  created() {
    this.$q.dark.set(false);
  },
  methods: {
    //Metodo que resetea los valores del formulario
    onReset() {
      this.mail = null;
      this.contraseña = null;
      this.accept = false;
    },
    //Metodo de logueranos a traves de los usuarios traidos desde la api
    async loginuser() {
      //Ponemos a cargar el loader
      this.$q.loading.show({
        spinner: QSpinnerCube,
        spinnerColor: "indigo-10",
        spinnerSize: 50,
        backgroundColor: "indigo-11",
      });
      //Intentamos consultar los Usuarios desde la api a traves de una accion
      try {
        await this.$store.dispatch("cardState/getUsersAction");

        this.todos = this.Usuarios;
      } catch (error) {
        //Verifico que el error sea especificamente de red
        var errorRed = error.toString().substring(7, 20);
        if (errorRed.toString() === "Network Error") {
          this.$q.notify({
            color: "red-14",
            textColor: "white",
            icon: "wifi_off",
            message:
              "Se ha desconectado de internet, por favor vuelva a conectarse",
          });
        }
        //Si no lo es, mando el error aun
        else {
          this.$q.notify({
            color: "orange",
            textColor: "white",
            icon: "warning",
            message: "Error cargando los usuarios " + error,
          });
        }
      }
      var encontrado = this.todos.filter(
        (user) => user.Password == this.contraseña && user.Correo == this.mail
      );

      if (encontrado.length > 0) {
        if (encontrado[0].Estatus === true) {
          this.accept = true;
          console.log(encontrado[0]);
          this.$store.state.global.Usuario.rol = encontrado[0].Rol;
          this.$store.state.global.Usuario.Foto = encontrado[0].Foto;
          this.$store.state.global.Usuario.id = encontrado[0].ID_Usuario;
          this.correctUser = encontrado[0];
        } else {
          this.$q.notify({
            color: "red",
            textColor: "white",
            icon: "warning",
            message: "Tu cuenta está desactivada",
          });
        }
      } else {
        this.accept = false;
      }

      //Intentamos loguearnos verificando en el catch con el error de red
      try {
        if (this.accept == true) {
          //Ocultamos el loader si todo saió bien
          this.$q.loading.hide();
          this.$store.state.global.Usuario.name = this.correctUser.Nombre;
          this.$router.push({ path: `/Home/` });
          this.$q.notify({
            color: "green",
            textColor: "white",
            position: "top",
            message: "Bienvenido " + this.correctUser.Nombre,
            avatar: this.$store.state.global.Usuario.Foto,
          });

          if (encontrado[0].Rol == 1 || encontrado[0].Rol == 2) {
            if (this.IDSEQUIPOS.length > 0) {
              this.$q.notify({
                color: "red",
                textColor: "white",
                position: "top",
                icon: "notification_important",
                message: `Hay ${this.IDSEQUIPOS.length} equipos reportados`,
              });
            }
            if (this.MantPreventivoPendiente) {
              this.$q.notify({
                color: "blue-10",
                textColor: "white",
                icon: "notifications_active",
                position: "top",
                message: "Hay mantenimientos preventivos pendientes",
              });
            }
          }
        } else {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Usuario o contraseña Incorrecto",
          });
          //Ocultamos el loader si la contraseña o usuario son uncorrectos
          this.$q.loading.hide();
        }
      } catch (error) {
        console.log("Este es el error", error);
        var errorRed = error.toString().substring(0, 12);
        //console.log("ESTE ES EL ERROR DE RED BIEN RECORTADO", errorRed);
        if (this.errorRed.toString() === "Network Error")
          this.$q.notify({
            color: "red-14",
            textColor: "white",
            icon: "wifi_off",
            message:
              "Se ha desconectado de internet, por favor vuelva a conectarse",
          });
      }
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

<style lang="sass" scoped>
.formStyle
  width: 100%

.imageStyle
  height: 100%
  width: 100%

.inputContra
  margin-top: 1rem
  opacity: 0.8
  width: 100%
  margin-bottom: 3rem

.divBtn
  margin-bottom: -2rem

.image-login
  height: 120%
  width: 100%
  border-radius: 0 0 0.5rem 0.5rem
</style>