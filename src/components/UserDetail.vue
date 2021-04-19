<!--COMPLETED-->
<template>
  <div>
    <div
      class="shadow-16 col-12"
      :class="drawerState ? 'bg-grey-10' : 'bg-grey-4'"
      style="border-radius: 0.5rem"
    >
      <div
        class="column items-center"
        :class="drawerState ? 'bg-grey-9' : 'bg-blue-10'"
        style="border-radius: 0.6rem"
      >
        <h5 style="color: white">Información básica</h5>

        <div
          style="
            overflow: hidden;
            width: 120px;
            height: 120px;
            border-radius: 50%;
          "
          class="row items-center justify-center"
        >
          <img id="Imagen" basic :src="ImageBase64" style="height: 120px" />
        </div>

        <q-btn
          v-if="
            $store.state.global.Usuario.rol === 1 ||
            $store.state.global.Usuario.rol === 2
          "
          style="
            width: 33px;
            height: 33px;
            border-radius: 1rem;
            margin-top: -1rem;
            margin-left: 6rem;
          "
          unelevated
          icon="add_a_photo"
          text-color="white"
          @click="captureImage"
        ></q-btn>

        <q-input
          dark
          color="blue"
          v-model="textNombre"
          style="text-color: white"
          type="text"
          filled
          readonly
          label="Nombre"
          class="inputStyle"
        >
          <template v-slot:prepend>
            <q-icon name="line_weight" />
          </template>
        </q-input>

        <q-input
          dark
          standout
          class="inputStyle"
          v-model="textCorreo"
          label="Correo Electrónico"
          type="email"
          prefix="Email:"
          :readonly="
            $store.state.global.Usuario.rol === 1 ||
            $store.state.global.Usuario.rol === 2
              ? false
              : true
          "
        >
          <template v-slot:prepend>
            <q-icon name="mail" />
          </template>
        </q-input>
      </div>

      <div class="row column items-center">
        <q-input
          color="blue"
          v-model="textTelefono"
          type="number"
          filled
          standout
          label="Telefono"
          class="inputStyle"
          :readonly="
            $store.state.global.Usuario.rol === 1 ||
            $store.state.global.Usuario.rol === 2
              ? false
              : true
          "
        >
          <template v-slot:prepend>
            <q-icon name="line_weight" />
          </template>
        </q-input>

        <q-input
          color="blue"
          readonly
          v-model="textCurp"
          type="text"
          filled
          label="Curp"
          class="inputStyle"
        >
          <template v-slot:prepend>
            <q-icon name="line_weight" />
          </template>
        </q-input>

        <q-input
          color="blue"
          v-model="textContraseña"
          type="password"
          filled
          standout
          label="Contraseña"
          class="inputStyle"
          :readonly="
            $store.state.global.Usuario.rol === 1 ||
            $store.state.global.Usuario.rol === 2
              ? false
              : true
          "
        >
          <template v-slot:prepend>
            <q-icon name="line_weight" />
          </template>
        </q-input>

        <q-select
          filled
          standout
          v-model="TipoUsuario"
          :options="options"
          class="inputStyle"
          label="Tipo De Usuario"
          :readonly="$store.state.global.Usuario.rol === 1 ? false : true"
        />

        <q-btn-toggle
          style="margin: 1rem"
          v-model="modelServicio"
          unelevated
          :toggle-color="modelServicio ? 'primary' : 'dark'"
          color="white"
          text-color="dark"
          :options="[
            { label: 'Cuenta Activada', value: true },
            { label: 'Cuenta Desactivada', value: false },
          ]"
          :readonly="$store.state.global.Usuario.rol === 1 ? false : true"
        />
      </div>
    </div>

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">¡{{ aviso }}!</div>
        </q-card-section>

        <q-card-section class="q-pt-none">¡{{ aviso2 }}!</q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="OK"
            to="/UserCards"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="keyboard_return" color="primary" text-color="white" />
          <span class="q-ml-sm">¿Seguro que deseas salir?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Salir"
            to="/UserCards"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div
      style="
        background-color: #1976d2;
        margin-top: 1rem;
        height: 0.2rem;
        width: 100%;
      "
      class="glossy"
    ></div>
    <!--BOTONES DE ACTUALIZAR Y DE SALIR-->
    <div class="float-right" style="margin-right: -1rem">
      <q-btn
        v-if="
          $store.state.global.Usuario.rol === 1 ||
          $store.state.global.Usuario.rol === 2
        "
        label="Actualizar"
        class="btnActualizarStyle"
        color="blue-10"
        push
        @click="ActualizarUsuario()"
        icon="upgrade"
      />
      <q-btn
        push
        icon="keyboard_backspace"
        label="Salir"
        class="btnSalirStyle"
        color="blue-10"
        @click="[(confirm = true)]"
      />
    </div>
  </div>
</template>

<script>
import service from "../apiservice/service";
import { QSpinnerCube } from "quasar";

export default {
  data() {
    return {
      textRol: this.$store.state.cardState.UserSelected[0].Rol,
      textNombre: this.$store.state.cardState.UserSelected[0].Nombre,
      textTelefono: this.$store.state.cardState.UserSelected[0].Telefono,
      textCorreo: this.$store.state.cardState.UserSelected[0].Correo,
      textCurp: this.$store.state.cardState.UserSelected[0].CURP,
      textContraseña: this.$store.state.cardState.UserSelected[0].Password,
      TipoUsuario: this.$store.state.cardState.UserSelected[0].Rol,
      ImageBase64: this.$store.state.cardState.UserSelected[0].Foto,
      modelServicio: this.$store.state.cardState.UserSelected[0].Estatus,
      options: ["Administrador", "Auxiliar", "Básico"],
      files: null,
      alert: false,
      confirm: false,
      aviso: "",
      aviso2: "",
    };
  },
  created() {
    this.idUsuario = this.$store.state.cardState.UserSelected[0].ID_Usuario;
    if (this.TipoUsuario != null) {
      switch (this.TipoUsuario) {
        case 1:
          this.TipoUsuario = "Administrador";
          break;
        case 2:
          this.TipoUsuario = "Auxiliar";
          break;
        case 3:
          this.TipoUsuario = "Básico";
          break;
      }
    }
  },
  methods: {
    async ActualizarUsuario() {
      //SI EL ROL ES DE ADMINISTRADOR
      if (
        this.Usuario.rol == 1 ||
        this.Usuario.rol == 2 ||
        this.Usuario.rol == 3
      ) {
        if (this.TipoUsuario != null) {
          //Renderizar el tipo de usuario con letra en lugar de numero como lo guardamos en base de datos
          switch (this.TipoUsuario) {
            case "Administrador":
              this.textRol = 1;
              break;
            case "Auxiliar":
              this.textRol = 2;
              break;
            case "Básico":
              this.textRol = 3;
              break;
            default:
              this.textRol = 0;
          }
        }
        //Comienza el loader a cargar
        this.$q.loading.show({
          spinner: QSpinnerCube,
          spinnerColor: "indigo-10",
          spinnerSize: 50,
          backgroundColor: "indigo-11",
          message: "Actualizando Usuario",
          messageColor: "indigo-10",
        });
        //Comprimimos la imagen a subir
        this.compressImage();
        //Creamos el objeto a actualizar, con las propiedades de la pai
        var UpdatedUser = {
          Correo: this.$data.textCorreo,
          Password: this.$data.textContraseña,
          Telefono: this.textTelefono,
          Rol: this.$data.textRol,
          Estatus: this.$data.modelServicio,
          Foto: this.ImageBase64,
        };
        //Intentamos hacer el update
        try {
          const response = await service.updateUser(
            this.idUsuario,
            UpdatedUser
          );
          this.$data.aviso = "Guardado exitosamente"; //Variables para el dialog
          this.$data.aviso2 = "Se ha generado su registro correctamente"; //Variables para el dialog
          this.$q.loading.hide(); //Ocultar loader
        } catch (error) {
          this.$data.aviso = "No guardado";
          this.$data.aviso2 =
            "Parece que no ha ingresado todos los campos necesarios";
          this.$q.loading.hide(); //Ocultamos el loader
        }
        this.$data.alert = true; //Mandamos el alert con la informacion acerca de la respuesta de la api
      } else {
        this.$q.notify({
          position: "bottom",
          timeout: 2500,
          textColor: "white",
          type: "warning",
          message: `No tienes los permisos para actualizar usuarios`,
        });
        return;
      }
    },
    //Funcion de comprimir una imagen
    compressImage() {
      const canvas = document.createElement("canvas");
      const img = document.getElementById("Imagen");
      let width = img.width;
      let height = img.height;
      const maxHeight = 200;
      const maxWidth = 200;
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height *= maxWidth / width));
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width *= maxHeight / height));
          height = maxHeight;
        }
      }
      var ctx = canvas.getContext("2d");
      // set its dimension to target size
      canvas.width = width;
      canvas.height = height;
      // draw source image into the off-screen canvas:
      ctx.drawImage(img, 0, 0, width, height);
      this.$data.ImageBase64 = canvas.toDataURL("image/jpeg", 0.92); // quality = [0.0, 1.0]
    },
    //Funcion de tomar una fotografía usando el plugin de Cordova Camera
    captureImage() {
      navigator.camera.getPicture(
        (data) => {
          // on success
          this.ImageBase64 = data;
        },
        () => {
          // on fail
          this.$q.notify("Could not access device camera.");
        },
        {}
      );
    },
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
};
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid black

.btnToggleStyle
  width: 100%
  height: 10%
  border-radius: 0.5rem

.inputStyle
  width: 90%
  margin: 0.61rem
  margin-top: 1rem

.btnActualizarStyle
  margin: 1rem 0rem 1rem 1rem

.btnSalirStyle
  margin: 1rem
  width: 120px
</style>
