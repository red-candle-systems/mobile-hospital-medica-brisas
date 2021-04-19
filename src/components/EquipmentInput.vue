<template>
  <div>
    <div class="row">
      <div class="col-12" style="margin-right: 1rem; margin-top: 0.5rem">
        <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-toolbar>
              <img id="Imagen" basic :src="ImageBase64" class="imageStyle" />
            </q-toolbar>
            <div
              class="row my-custom-toggle"
              style="
                margin-top: 1.3rem;
                border-radius: 0.3rem;
                overflow: hidden;
              "
            >
              <q-file
                style="overflow: hidden"
                v-model="files"
                label="Elegir Fotografia"
                use-chips
                @change.native="subirFoto"
                class="col-9 FileStyle"
              />
            </div>
            <q-dialog v-model="alert" persistent>
              <q-card>
                <q-card-section>
                  <div class="text-h6">¡{{ aviso }}!</div>
                </q-card-section>

                <q-card-section class="q-pt-none">{{ aviso2 }}</q-card-section>

                <q-card-actions align="right">
                  <q-btn
                    flat
                    label="OK"
                    color="blue"
                    v-close-popup
                    :to="aviso === 'Guardado exitosamente' ? '/Home' : ''"
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-dialog v-model="confirm" persistent>
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar
                    icon="keyboard_return"
                    color="blue"
                    text-color="white"
                  />
                  <span class="q-ml-sm">¿Seguro que deseas salir?</span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Cancelar" color="blue-10" v-close-popup />
                  <q-btn
                    flat
                    label="Salir"
                    to="/Home"
                    color="blue-10"
                    v-close-popup
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-btn
              style="width: 100%; border-radius: 0.5rem; height: 55px"
              color="blue-10"
              icon="camera_alt"
              label="Tomar Fotografía"
              @click="captureImage"
            />
            <div
              style="
                background-color: #1976d2;
                margin-top: 1rem;
                height: 0.2rem;
                width: 100%;
              "
              class="glossy"
            ></div>
          </div>
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              color="blue"
              v-model="textNumero"
              type="text"
              filled
              label="Numero de Serie"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="line_weight" />
              </template>
            </q-input>
          </div>
           <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              color="blue"
              v-model="textNumeroControl"
              type="text"
              filled
              label="Numero de Control"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="line_weight" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              color="blue"
              v-model="textEquipo"
              type="text"
              filled
              label="Equipo"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="line_weight" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              color="blue"
              v-model="textMarca"
              type="text"
              filled
              label="Marca"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="line_weight" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              color="blue"
              v-model="textModelo"
              type="text"
              filled
              label="Modelo"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="line_weight" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              color="blue"
              v-model="textUbicacion"
              type="text"
              filled
              label="Ubicacion"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="line_weight" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              color="blue"
              v-model="textAñoFabricacion"
              type="number"
              filled
              label="Año de Fabricación"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="line_weight" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              color="blue"
              v-model="textProveedor"
              type="text"
              filled
              label="Proveedor"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="line_weight" />
              </template>
            </q-input>
          </div>
           <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              color="blue"
              v-model="textEstatus"
              type="text"
              filled
              label="Estatus"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="line_weight" />
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              color="blue"
              v-model="texCosto"
              type="number"
              filled
              label="Costo"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="attach_money" />
              </template>
            </q-input>
          </div>

          <!-- attach_money-->
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              filled
              color="blue"
              v-model="dateGarantia"
              style="width: 100%"
              label="Fecha de garantia"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="dateGarantia" mask="YYYY-MM-DD" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              filled
              color="blue"
              v-model="dateCompra"
              style="width: 100%"
              label="Fecha de Adquisición"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="dateCompra" mask="YYYY-MM-DD" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>

      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="text-h6">¡{{ aviso }}!</div>
          </q-card-section>

          <q-card-section class="q-pt-none">{{ aviso2 }}</q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              label="OK"
              color="blue"
              v-close-popup
              :to="aviso === 'Guardado exitosamente' ? '/Home' : ''"
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
            <q-btn flat label="Salir" to="/Home" color="blue" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <div class="row">
      <div style="width: 100%">
        <h5
          style="
            color: white;
            font-family: Serif;
            margin-top: 1rem;
            border-radius: 0.5rem;
          "
          class="glossy text-center bg-blue-10"
        >
          Observaciones
        </h5>
        <div class="q-pa-md q-gutter-sm" style="margin-top: -2.8rem">
          <q-editor
            v-model="editorvalue"
            :toolbar="[['bold', 'italic', 'strike', 'underline']]"
          />
          <div
            class="absolute-bottom-right max-top"
            style="margin-bottom: 2rem; margin-right: -1rem"
          >
            <q-btn
              label="Guardar"
              style="margin: 1rem 0rem 1rem 1rem; width: 140px"
              color="blue-10"
              push
              @click="_insertEquipment"
              icon="save"
            />

            <q-btn
              icon="keyboard_backspace"
              push
              label="Salir"
              style="margin: 1rem; width: 140px"
              color="blue-10"
              @click="[(confirm = true)]"
            />
          </div>
        </div>
        <div
          style="
            background-color: #1976d2;
            height: 0.2rem;
            width: 100%;
            margin-bottom: 5rem;
            margin-right: -1rem;
          "
          class="glossy"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { QSpinnerCube } from "quasar";

export default {
  data() {
    return {
      textNumero: "",
      textEstatus: "",
      textNumeroControl: "",
      textProveedor: "",
      textEquipo: "",
      textModelo: "",
      textMarca: "",
      textUbicacion: "",
      textAñoFabricacion: "",
      texCosto: "",
      editorvalue: "",
      modelServicio: true,
      modelGarantia: true,
      dateGarantia: "",
      dateCompra: "",
      files: null,
      alert: false,
      confirm: false,
      aviso: "Registro Guardado",
      aviso2: "Su registro se ha generado exitosamente",
      ImageBase64: "404.jpg",
      canPost: false,
    };
  },
  methods: {
    ver() {
      //console.log(this.files);
    },
    captureImage() {
      navigator.camera.getPicture(
        (data) => {
          // on success
          this.ImageBase64 = data;
          //console.log("Esta es la imagen en base 64, no puede ser", data);
        },
        () => {
          // on fail
          this.$q.notify("Could not access device camera.");
        },
        {
          // camera options
        }
      );
    },
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
      //console.log(this.$data.ImageBase64);
    },
    subirFoto() {
      //   //console.log(this.$data.files)
      let file = this.$data.files;
      let reader = new FileReader();
      reader.onloadend = (file) => {
        // //console.log(reader.result)
        this.ImageBase64 = reader.result;
      };
      reader.readAsDataURL(file);
    },
    async _insertEquipment() {
      this.$q.loading.show({
        spinner: QSpinnerCube,
        spinnerColor: "indigo-10",
        spinnerSize: 50,
        backgroundColor: "indigo-11",
        message: "Subiendo Equipo",
        messageColor: "indigo-10",
      });
      this.compressImage();
      var SchemaEquipo = [
        { value: this.$data.textNumero, parameter: "Numero de serie" },
        { value: this.$data.textEquipo, parameter: "Nombre" },
        { value: this.$data.textModelo, parameter: "Modelo" },
        { value: this.$data.textMarca, parameter: "Marca" },
        { value: this.$data.textUbicacion, parameter: "Ubicacion" },
        { value: this.$data.textAñoFabricacion, parameter: "Año" },
        { value: this.$data.texCosto, parameter: "Costo" },
        { value: this.$data.dateCompra, parameter: "Fecha de compra" },
        { value: this.$data.dateGarantia, parameter: "Fecha de garantía" },
        { value: this.$data.editorvalue, parameter: "Observaciones" },
        { value: this.$data.textProveedor, parameter: "Numero de serie" },
        { value: this.$data.textNumeroControl, parameter: "Numero de control" },
        { value: this.$data.textEstatus, parameter: "Estatus" },
      ];
      for (var i = 0; i < SchemaEquipo.length; i++) {
        if (SchemaEquipo[i].value == "") {
          this.$q.loading.hide();
          this.$q.notify({
            color: "orange-14",
            textColor: "white",
            timeout: 1000,
            icon: "warning",
            message:
              "No ingresaste " + SchemaEquipo[i].parameter + " del equipo",
          });
          this.canPost = false;
          return;
        } else {
          this.canPost = true;
        }
      }
      if (this.canPost) {
        //Llenamos el objeto a postear como equipo
        var equipo = {
          No_Serie: this.$data.textNumero,
          Nombre_Equipo: this.$data.textEquipo,
          Modelo: this.$data.textModelo,
          Marca: this.$data.textMarca,
          Foto: this.ImageBase64,
          Ubicacion: this.$data.textUbicacion,
          Estado_Garantia: true,
          Estado_Servicio: true,
          Ano_Equipo: parseInt(this.$data.textAñoFabricacion),
          Precio: parseInt(this.$data.texCosto),
          Fecha_Adquisicion: this.$data.dateCompra,
          Fecha_Garantia: this.$data.dateGarantia,
          Observaciones: this.$data.editorvalue,
          Proveedor: this.$data.textProveedor,
          Numero_Control: this.$data.textNumeroControl,
          Status: this.$data.textEstatus
        };
        ///////////////////

        let mes; //Varibale del mes
        let length = new Date().getMonth().toString().length; //Obtenemos la longitud del mes actual
        //Le agregamos un cero a la izquierda en caso de ser necesario
        if (length == 1) {
          mes = "0" + (new Date().getMonth() + 1).toString();
        }
        //creamos el obj con el año y la fecha
        let obj = {
          Mes: mes,
          Año: new Date().getFullYear(),
        };
        this.MaintenanceSectionSelected = obj;
        this.ReportSectionSelected = obj;

        try {
          await this.$store.dispatch("cardState/postEquipmentAction", equipo);
          this.$data.aviso = "Guardado exitosamente";
          this.$data.aviso2 = "Se ha generado su registro correctamente";
          this.$data.alert = true;
          this.$q.loading.hide();
        } catch (error) {
          this.$data.aviso = "No guardado";
          this.$data.aviso2 =
            "Hubo un error tratando de crear el equipo, vuelva a intentarlo de nuevo";
          this.$data.alert = true;
          this.$q.loading.hide();
        }
      }
    },
  },
  destroyed() {
    this.$q.loading.hide();
  },
  computed: {
    MaintenanceSectionSelected: {
      get() {
        return this.$store.state.cardState.MaintenanceSectionSelected;
      },
      set(MaintenanceSectionSelected) {
        this.$store.commit(
          "cardState/updateMaintenanceSectionSelected",
          MaintenanceSectionSelected
        );
      },
    },
    ReportSectionSelected: {
      get() {
        return this.$store.state.cardState.ReportSectionSelected;
      },
      set(ReportSectionSelected) {
        this.$store.commit(
          "cardState/updateReportSectionSelected",
          ReportSectionSelected
        );
      },
    },
  }
};
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid black

.imageStyle

  width: 100%
  border-radius: 0.5rem
  height: 350px

.FileStyle
  width: 100%
  padding: 5.5px
</style>