<template>
  <div>
    <div class="row">
      <div class="col-12" style="margin-right: 1rem; margin-top: 0.5rem">
        <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-btn
              style="width: 100%; height: 56px"
              color="light-blue-10"
              push
              icon="engineering"
              @click="verMantenimientos()"
              >Mantenimientos</q-btn
            >
          </div>
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <Stepper />
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-toolbar class="justify-center">
              <img :src="src" id="Imagen" basic class="imageStyle" />
            </q-toolbar>
            <div
              v-if="
                $store.state.global.Usuario.rol === 1 ||
                $store.state.global.Usuario.rol === 2
              "
              class="row my-custom-toggle btnToggleStyle"
              style="
                margin-top: 1.3rem;
                border-radius: 0.3rem;
                height: 60px;
                overflow: scroll;
              "
            >
              <q-file
                style="height: 50px"
                v-model="files"
                label="Elegir Fotografia"
                use-chips
                @change.native="subirFoto"
                class="col-9 FileStyle"
              />
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
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-btn
              v-if="
                $store.state.global.Usuario.rol === 1 ||
                $store.state.global.Usuario.rol === 2
              "
              style="
                width: 100%;
                border-radius: 0.5rem;
                height: 55px;
                margin-top: -0.6rem;
              "
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
              readonly
              v-model="textNumeroSerie"
              filled
              :label="this.props[0].name"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="line_weight" />
              </template>
            </q-input>
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              readonly
              v-model="textNumeroControl"
              filled
              :label="this.props[0].name"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="line_weight" />
              </template>
            </q-input>
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              readonly
              v-model="textEquipo"
              filled
              :label="this.props[1].name"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="line_weight" />
              </template>
            </q-input>
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              readonly
              v-model="textModelo"
              filled
              :label="this.props[2].name"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="line_weight" />
              </template>
            </q-input>
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              readonly
              v-model="textMarca"
              filled
              :label="this.props[3].name"
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
              filled
              :label="this.props[4].name"
              style="width: 100%"
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
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              readonly
              v-model="textAñoFabricacion"
              filled
              :label="this.props[5].name"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="line_weight" />
              </template>
            </q-input>
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              readonly
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
              v-model="textEstatus"
              type="text"
              filled
              label="Estatus"
              style="width: 100%"
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
          </div>
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              readonly
              v-model="textCosto"
              filled
              :label="this.props[6].name"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="attach_money" />
              </template>
            </q-input>
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              :readonly="$store.state.global.Usuario.rol === 1 ? false : true"
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
              readonly
              filled
              v-model="dateCompra"
              style="width: 100%"
              label="Fecha de Adquisición"
            >
              <template v-slot:prepend>
                <q-icon name="event"> </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              filled
              color="blue"
              v-model="fecha_prox_mantenimiento"
              style="width: 100%"
              label="Fecha de proximo mantenimiento"
              :readonly="
                $store.state.global.Usuario.rol === 1 ||
                $store.state.global.Usuario.rol === 2
                  ? false
                  : true
              "
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="fecha_prox_mantenimiento"
                      mask="YYYY-MM-DD"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4 column items-center">
            <q-btn-toggle
              v-model="modelServicio"
              :toggle-color="modelServicio ? 'primary' : 'dark'"
              color="white"
              text-color="dark"
              :options="[
                { label: 'Estatus en Alta', value: true },
                { label: 'Estatus en Baja', value: false },
              ]"
              :readonly="$store.state.global.Usuario.rol === 1 ? false : true"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div style="width: 100%">
        <h5
          style="
            background-color: #1976d2;
            color: white;
            font-family: Serif;
            border-radius: 0.5rem;
            margin-top: 1.5rem;
          "
          class="glossy text-center bg-blue-10"
        >
          Observaciones
        </h5>
        <div class="q-pa-md q-gutter-sm" style="margin-top: -2.8rem">
          <q-editor
            v-model="editor"
            :toolbar="[['bold', 'italic', 'strike', 'underline']]"
          />
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

        <div
          class="bottom-right row z-top justify-end"
          style="margin-bottom: 1.5rem"
        >
          <q-btn
            v-if="
              $store.state.global.Usuario.rol === 1 ||
              $store.state.global.Usuario.rol === 2
            "
            style="border-radius: 0.5rem; margin: 0.5rem; width: 100%"
            icon="list"
            label="Lista de reportes"
            color="blue-10"
            @click="getReports()"
          />
          <q-btn
            label="Reportar un problema"
            color="blue-10"
            style="border-radius: 0.5rem; margin: 0.5rem; width: 100%"
            @click="prompt = true"
            icon="report"
          />
          <q-btn
            v-if="
              $store.state.global.Usuario.rol === 1 ||
              $store.state.global.Usuario.rol === 2
            "
            label="Actualizar"
            color="blue-10"
            push
            style="border-radius: 0.5rem; margin: 0.5rem; width: 100%;"
            icon="save"
            @click="actualizarEquipo()"
          />
        </div>
        <q-dialog v-model="alert">
          <q-card>
            <q-card-section>
              <div class="text-h6">¡{{ aviso }}!</div>
            </q-card-section>

            <q-card-section class="q-pt-none">¡{{ aviso2 }}!</q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="OK" color="primary" to="/Home" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar
                icon="keyboard_return"
                color="primary"
                text-color="white"
              />
              <span class="q-ml-sm">¿Seguro que deseas salir?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancelar" color="primary" v-close-popup />
              <q-btn
                flat
                label="Salir"
                to="/Home"
                color="primary"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="prompt" persistent>
          <q-card style="min-width: 90%">
            <q-card-section>
              <div class="text-h6">¿Cuál es el problema?</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input
                dense
                v-model="report"
                autofocus
                @keyup.enter="prompt = false"
              />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Cancelar" v-close-popup />
              <q-btn
                flat
                label="Reportar"
                v-close-popup
                @click="_insertReport()"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Stepper from "../components/Stepper";
import service from "../apiservice/service";
import { QSpinnerCube } from "quasar";

export default {
  components: {
    Stepper,
  },
  created() {
    this.idEquipo = this.IDEM;
  },
  data() {
    return {
      tipo: "text",
      files: null,
      aviso: "Registro Guardado",
      aviso2: "Su registro se ha generado exitosamente",
      textNumeroSerie: this.$store.state.cardState.EquipoSelected[0].No_Serie,
      textEquipo: this.$store.state.cardState.EquipoSelected[0].Nombre_Equipo,
      textModelo: this.$store.state.cardState.EquipoSelected[0].Modelo,
      textUbicacion: this.$store.state.cardState.EquipoSelected[0].Ubicacion,
      textMarca: this.$store.state.cardState.EquipoSelected[0].Marca,
      textAñoFabricacion: this.$store.state.cardState.EquipoSelected[0]
        .Ano_Equipo,
      textCosto: this.$store.state.cardState.EquipoSelected[0].Precio.toString(),
      src: this.$store.state.cardState.EquipoSelected[0].Foto,
      editor: this.$store.state.cardState.EquipoSelected[0].Observaciones,
      modelServicio: this.$store.state.cardState.EquipoSelected[0]
        .Estado_Servicio,
      modelGarantia: true,
      fecha_prox_mantenimiento: this.$store.state.cardState.EquipoSelected[0]
        .Siguiente_Mantenimiento,
      dateGarantia: this.$store.state.cardState.EquipoSelected[0]
        .Fecha_Garantia,
      dateCompra: this.$store.state.cardState.EquipoSelected[0]
        .Fecha_Adquisicion,
      textProveedor: this.$store.state.cardState.EquipoSelected[0].Proveedor,
      textNumeroControl: this.$store.state.cardState.EquipoSelected[0]
        .Numero_Control,
      textEstatus: this.$store.state.cardState.EquipoSelected[0].Status,
      props: [
        {
          id: 1,
          name: "Numero de serie",
        },
        {
          id: 2,
          name: "Equipo",
        },
        {
          id: 3,
          name: "Modelo",
        },
        {
          id: 4,
          name: "Marca",
        },
        {
          id: 5,
          name: "Ubicacion",
        },
        {
          id: 6,
          name: "Año de fabricacion",
        },
        {
          id: 7,
          name: "Costo",
        },
      ],

      files: null,
      alert: false,
      confirm: false,
      prompt: false,
      report: "",
    };
  },
  methods: {
    captureImage() {
      navigator.camera.getPicture(
        (data) => {
          // on success
          this.src = data;
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
    //Insertamos un reporte a la base de datos
    subirFoto() {
      //   //console.log(this.$data.files)
      let file = this.$data.files;
      let reader = new FileReader();
      reader.onloadend = (file) => {
        // //console.log(reader.result)
        this.src = reader.result;
      };
      reader.readAsDataURL(file);
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

      this.$data.src = canvas.toDataURL("image/jpeg", 0.92); // quality = [0.0, 1.0]
      //console.log(this.$data.ImageBase64);
    },
    async _insertReport() {
      let fecha = "";
      let dia = "";
      let date = new Date();
      let seconds = date.getSeconds();
      let minutes = date.getMinutes();
      let hours = date.getHours();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      if (month < 10) {
        fecha = `${year}-0${month}`;
      } else {
        fecha = `${year}-${month}`;
      }
      dia = `${day}-${hours}:${minutes}:${seconds}`;

      var reporte = {
        ID_Equipo: this.IDEM,
        Reporte: this.$data.report,
        Fecha: fecha,
        Dia: dia,
      };

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
      console.log(obj);
      this.MaintenanceSectionSelected = obj;
      this.ReportSectionSelected = obj;

      //Intentamos crear un reporte
      try {
        await this.$store.dispatch("cardState/postReportAction", reporte);
        this.$data.alert = true;
        this.report = "";
        //Despues de crear el reporte, hacemos un get a la api y actualizamos el state de los reportes
      } catch (error) {
        this.$q.notify({
          position: "bottom",
          timeout: 1000,
          textColor: "white",
          type: "warning",
          message: "No se pudo crear el reporte " + Error,
        });
      }
    },
    getReports() {
      if (this.Usuario.rol == 1 || this.Usuario.rol == 2) {
        //Si es tipo de usuario 1 o 2 puede ir a la lista de los reportes
        this.$router.push({ path: `/ReportsEquipmentSection` });
      } //si no lo es, entonces, solo puede crear los reportes
      else {
        if (this.Usuario.rol == 3) {
          this.prompt = true;
        }
      }
    },
    //Metodo para actualizar un equipo, validando que solo el rol 1 puede hacerlo
    async actualizarEquipo() {
      this.data = this.IDEM;
      //creamos el objeto a actualizar
      this.compressImage();
      var EquipoActualizado = {
        Ubicacion: this.$data.textUbicacion,
        Status: this.$data.textEstatus,
        Estado_Garantia: true,
        Estado_Servicio: this.$data.modelServicio,
        Fecha_Garantia: this.$data.dateGarantia,
        Foto: this.src,
        Siguiente_Mantenimiento: this.$data.fecha_prox_mantenimiento,
        Observaciones: this.editor,
      };
      //si todo sale bien quitamos el loader
      this.$q.loading.show({
        spinner: QSpinnerCube,
        spinnerColor: "indigo-10",
        spinnerSize: 50,
        backgroundColor: "indigo-11",
        message: "Actualizando Equipo",
        messageColor: "indigo-10",
      });
      try {
        const response = await service.updateEquipment(
          this.data,
          EquipoActualizado
        );
        //ACTUALIZAR EL STATE DE LOS EQUIPOS
        for (var i = 0; i < this.Equipos.length; i++) {
          if (this.Equipos[i].ID_Equipo == this.IDEM) {
            // console.log("this.Equipos[i]");
            this.Equipos[i] = { ...this.Equipos[i], ...EquipoActualizado };
          }
        }
        this.EquiposAux = this.Equipos;

        //console.log(this.Equipos);

        //console.log(this.$data.CardsUser);
        this.$data.aviso = "Guardado exitosamente";
        this.$data.aviso2 = "Se ha generado su registro correctamente";
        this.$data.alert = true;
        this.$data.alert = true;
        //console.log(EquipoActualizado);
        this.$q.loading.hide();
        //await this._getEquipos();
        this.$store.dispatch("cardState/postStatisticAction");
      } catch (error) {
        this.$data.aviso = "No guardado";
        this.$data.aviso2 = error;
        this.$data.alert = true;

        this.$q.loading.hide();
      }
      [(alert = true)];
    },
    //Metodo que redirige a la pagina con la lista de los matenimientos de un equipo
    verMantenimientos() {
      this.$router.push({ path: "/MaintenanceSectionEquipment" });
    },
  },

  computed: {
    IDEM: {
      get() {
        return this.$store.state.cardState.IDEM;
      },
      set(IDEM) {
        this.$store.commit("cardState/updateIDEM", IDEM);
      },
    },
    EquiposAux: {
      get() {
        return this.$store.state.cardState.EquiposAux;
      },
      set(EquiposAux) {
        this.$store.commit("cardState/updateEquipmentsAux", EquiposAux);
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
    Equipos: {
      get() {
        return this.$store.state.cardState.Equipos;
      },
      set(Equipos) {
        this.$store.commit("cardState/updateEquipments", Equipos);
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

.divP
  margin-right: 1rem
  margin-top: 0.5rem

.imageStyle
  width: 50%
  border-radius: 0.5rem
  height: auto
  max-height: 350px

.FileStyle
  width: 100%
  padding: 5.5px

.ObservacionesStyle
  background-color: #1976d2
  color: white
  font-family: Serif
  border-radius: 8px

.divEditor
  margin-top: -2.8rem

.btnGuardarStyle
  margin: 1rem 0rem 1rem 1rem

.btnReporte
  margin: 1rem 0rem 1rem 1rem

.btnGetMantStyle
  width: 90%
  height: 56px

.divS
  margin-left: -1rem

.btnToggleStyle
  width: 100%
  height: 18%
  margin-top: 1.45rem
  border-radius: 0.5rem

.cardStyle
  margin-top: -1.5rem
</style>
