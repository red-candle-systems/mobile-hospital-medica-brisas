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
            overflow: hidden;
          "
          class="row items-center justify-center"
        >
          <img
            id="Imagen"
            basic
            :src="ImageBase64"
            style="
              height: auto;
              width: 100%;
              min-height: 120px;
              min-width: 120px;
            "
          />
        </div>

        <q-btn
          style="
            width: 33px;
            height: 33px;
            border-radius: 1rem;
            margin-top: -1rem;
            margin-left: 6rem;
          "
          unelevated
          text-color="white"
          icon="add_a_photo"
          @click="captureImage"
        ></q-btn>

        <q-input
          dark
          color="blue"
          v-model="textNombre"
          style="text-color: white"
          type="text"
          filled
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
        >
          <template v-slot:prepend>
            <q-icon name="line_weight" />
          </template>
        </q-input>

        <q-input
          color="blue"
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
          v-model="password"
          type="password"
          filled
          standout
          label="Contraseña"
          class="inputStyle"
        >
          <template v-slot:prepend>
            <q-icon name="line_weight" />
          </template>
        </q-input>

        <q-select
          filled
          color="blue"
          standout
          v-model="TipoUsuario"
          :options="options"
          class="inputStyle"
          label="Tipo De Usuario"
        />
      </div>
    </div>
    <div
      style="
        background-color: #1976d2;
        margin-top: 1rem;
        height: 0.2rem;
        width: 100%;
      "
      class="glossy"
    ></div>

    <div class="float-right" style="margin-right: -1rem">
      <q-btn
        label="Guardar"
        class="btnGuardarStyle"
        color="blue-10"
        push
        icon="save"
        @click="_insertUser"
      />
      <q-btn
        push
        label="Salir"
        icon="keyboard_backspace"
        class="btnSalirStyle"
        color="blue-10"
        @click="[(confirm = true)]"
      />
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
            color="blue"
            @click="sendBack()"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="keyboard_return" color="blue" text-color="white" />
          <span class="q-ml-sm">¿Seguro que deseas salir?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="blue" v-close-popup />
          <q-btn
            flat
            label="Salir"
            to="/UserCards"
            color="blue"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>


<script>
import service from "../apiservice/service";
import { QSpinnerCube } from "quasar";

export default {
  data() {
    return {
      tipo: "text",
      textRol: 1,
      textNombre: "",
      textTelefono: "",
      textCorreo: "",
      textDireccion: "",
      textCurp: "",
      password: "",
      password2: "",
      isPwd: true,
      isPwd2: true,
      home: false,
      textConfirmContraseña: "",
      files: null,
      alert: false,
      confirm: false,
      modelServicio: true,
      ImageBase64: "user2.png",
      TipoUsuario: "",
      options: ["Administrador", "Auxiliar", "Básico"],
      aviso: "Registro Guardado",
      aviso2: "Su registro se ha generado exitosamente",
      canPost: false,
    };
  },
  methods: {
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
    compressImage() {
      let base64 = this.$data.ImageBase64;
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
      //console.log(this.$data.ImageBase64);
    },
    async _insertUser() {
      if (this.TipoUsuario != null) {
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
      this.compressImage();

      var SchemaUser = [
        { value: this.$data.textNombre.trim(), parameter: "Nombre" },
        { value: this.$data.textCorreo, parameter: "Correo" },
        { value: this.textTelefono, parameter: "Telefono" },
        { value: this.$data.textCurp, parameter: "Curp" },
        { value: this.$data.password, parameter: "Password" },
        { value: this.$data.textRol, parameter: "Rol" },
      ];

      for (var i = 0; i < SchemaUser.length; i++) {
        if (SchemaUser[i].value == "") {
          this.$q.loading.hide();
          this.$q.notify({
            color: "orange-14",
            textColor: "white",
            timeout: 1000,
            icon: "warning",
            message:
              "No ingresaste " + SchemaUser[i].parameter + " del usuario",
          });
          this.canPost = false;
          return;
        } else {
          this.canPost = true;
        }
      }
      if (this.canPost) {
        var user = {
          Nombre: this.$data.textNombre.trim(),
          CURP: this.$data.textCurp,
          Correo: this.$data.textCorreo,
          Password: this.$data.password,
          Telefono: this.textTelefono,
          Rol: this.$data.textRol,
          Estatus: true,
          Foto: this.ImageBase64,
        };

        this.$q.loading.show({
          spinner: QSpinnerCube,
          spinnerColor: "indigo-10",
          spinnerSize: 50,
          backgroundColor: "indigo-11",
          message: "Subiendo Usuario",
          messageColor: "indigo-10",
        });
        //console.log("ESTE ES EL USUARIO", user.Rol);

        try {
          for (var i = 0; i < 80; i++) {
            var response = await service.createUser(user);
          }

          this.$data.alert = true;
          this.$q.loading.hide();
        } catch (error) {
          this.$q.loading.hide();

          this.$q.notify({
            position: "bottom",
            timeout: 2500,
            textColor: "white",
            type: "warning",
            message: `Ocurrió un error al crear el usuario!!.`,
          });
        }
      }
    },
    sendBack() {
      if (
        this.aviso2 === "Parece que no ha ingresado todos los campos necesarios"
      ) {
        //No hacer nada de cambio de pagina
      } else {
        this.$router.push("/UserCards");
      }
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

.inputStyle
  width: 90%
  margin: 0.61rem
  margin-top: 1rem

.btnToggleStyle
  width: 100%
  height: 10%
  border-radius: 0.5rem

.btnActualizarStyle
  margin: 1rem 0rem 1rem 1rem
  width: 120px

.btnSalirStyle
  margin: 1rem
  width: 120px
</style>
