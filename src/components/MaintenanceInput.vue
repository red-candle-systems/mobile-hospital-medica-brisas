<template>
  <div>
    <div class="row">
      <div class="col-12" style="margin-right: 1rem; margin-top: 0.5rem">
        <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <ActivityList />
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <MaterialList />
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <ToolsList />
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-toolbar class="justify-center">
              <q-img :src="ImagenEquipo" class="imageStyle"></q-img>
            </q-toolbar>
            <div
              style="
                background-color: #1976d2;
                height: 0.2rem;
                width: 100%;
                margin-top: 1rem;
              "
              class="glossy"
            ></div>
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              label="Ingeniero"
              readonly
              filled
              v-model="InChargeName"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="line_weight" />
              </template>
            </q-input>
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              type="number"
              color="blue"
              filled
              label="Costo de Mantenimiento"
              style="width: 100%"
              v-model="costoMantenimiento"
            >
              <template v-slot:prepend>
                <q-icon name="attach_money" />
              </template>
            </q-input>
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-select
              filled
              color="blue"
              v-model="TipoMantenimiento"
              :options="options"
              style="width: 100%"
              label="Tipo De Mantenimiento"
            />
          </div>
        </div>
      </div>

      <div
        style="margin-right: -1rem; margin-bottom: 1.5rem"
        class="absolute-bottom-right max-top"
      >
        <q-btn
          label="Guardar"
          style="margin: 1rem 0rem 1rem 1rem; width: 140px"
          color="blue-10"
          push
          icon="save"
          @click="_insertMaintenance"
        />
        <q-btn
          push
          icon="keyboard_backspace"
          label="Salir"
          style="margin: 1rem; width: 140px"
          color="blue-10"
          @click="[(confirm = true)]"
        />
      </div>
      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="text-h6">¡Registro guardado!</div>
          </q-card-section>

          <q-card-section class="q-pt-none"
            >Su registro ha sido guardado exitosamente</q-card-section
          >

          <q-card-actions align="right">
            <q-btn flat label="OK" :to="lastRoute" color="blue" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="alertfalse">
        <q-card>
          <q-card-section>
            <div class="text-h6">¡Registro no guardado!</div>
          </q-card-section>

          <q-card-section class="q-pt-none"
            >Su registro no ha sido guardado, verifique que ha ingresado los
            datos correctos y vuelva a intentarlo</q-card-section
          >

          <q-card-actions align="right">
            <q-btn flat label="OK" color="blue" v-close-popup />
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
              to="/MaintenanceList"
              color="blue"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div class="row">
      <div style="width: 100%">
        <h5
          style="color: white; font-family: Serif; border-radius: 0.5rem"
          class="glossy text-center bg-blue-10"
        >
          Observaciones
        </h5>
        <div class="q-pa-md q-gutter-sm" style="margin-top: -2.8rem">
          <q-editor
            v-model="Observaciones"
            :toolbar="[['bold', 'italic', 'strike', 'underline']]"
          />
        </div>
        <div
          style="
            background-color: #1976d2;
            height: 0.2rem;
            width: 100%;
            margin-bottom: 4rem;
          "
          class="glossy"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import ActivityList from "../components/ActivityList";
import MaterialList from "../components/MaterialList";
import ToolsList from "../components/ToolsList";
import service from "../apiservice/service.js";
import { QSpinnerCube } from "quasar";

export default {
  components: {
    ActivityList,
    MaterialList,
    ToolsList,
  },

  data() {
    return {
      alert: false,
      alertfalse: false, //Alert en caso de haber un error al crear el mantenimiento
      confirm: false,
      modelServicio: true,
      modelGarantia: true,
      files: null, //File de la imagen
      TipoMantenimiento: null, //Select del tipo de mantenimiento
      lastRoute: "/MaintenanceList",
      fechaHoy: "",
      idEquipo: "",
      Material: "",
      Cantidad: "",
      Observaciones: "",
      costoMantenimiento: "",
      dateCompra: "",
      InChargeName: "",
      ImagenEquipo: "",
      options: ["Preventivo", "Correctivo"], //Opciones para el tipo de mantenimiento
      reportesAux: [],
    };
  },
  created() {
    this.inicializacionVariables();
    console.log("Las flags en el created", this.Flags);
    //Si existe un reporte verdadero y que venga de esa ruta
    console.log(this.$store.state.global.Flags.reporte.Status);

    if (this.$store.state.global.Flags.reporte.Status) {
      console.log("crear mantenimiento de reporte");
      this.createMaintenanceOfReport();
    } else {
      this.createNormalMaintenance();
    }
  },
  destroyed() {
    this.$q.loading.hide();
  },
  //states globales necesarios para la creacion de un mantenimiento
  computed: {
    //STATE DEL ID DEL EQUIPO SELECCIONADO ACTUALMENTE
    IDEM: {
      get() {
        return this.$store.state.cardState.IDEM;
      },
    },
    //STATE DE LAS ACTIVIDADES
    Actividades: {
      get() {
        return this.$store.state.global.Actividades;
      },
    },
    //STATE DE LOS MATERIALES
    Materiales: {
      get() {
        return this.$store.state.global.Materiales;
      },
    },
    //STATE DE LAS CANTIDADES
    Cantidades: {
      get() {
        return this.$store.state.global.Cantidades;
      },
    },
    //STATE DE LAS HERRAMIENTAS
    Herramientas: {
      get() {
        return this.$store.state.global.Herramientas;
      },
    },
    //STATE DEL USUARIO LOGUEADO ACTUALMENTE
    Usuario: {
      get() {
        return this.$store.state.global.Usuario;
      },
    },
    //STATE DE LAS FLAGS GLOBALES
    Flags: {
      get() {
        return this.$store.state.global.Flags;
      },
      set(Flags) {
        this.$store.commit("global/updateFlags", Flags);
      },
    },
    //STATE DE LOS REPORTES
    Reportes: {
      get() {
        return this.$store.state.cardState.Reportes;
      },
      set(Reportes) {
        this.$store.commit("cardState/updateReportes", Reportes);
      },
    },
    //STATE DE LOS EQUIPOS
    Equipos: {
      get() {
        return this.$store.state.cardState.Equipos;
      },
      set(Equipos) {
        this.$store.commit("cardState/updateEquipments", Equipos);
      },
    },
  },
  methods: {
    //Crear el post a la base de datos
    async _insertMaintenance() {
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
      //Obj de mantenimiento a subir ((Llenado))
      var mantenimiento = {
        ID_Equipo: this.$data.idEquipo,
        Fecha: fecha,
        Dia: dia,
        Tipo_Mantenimiento: this.$data.TipoMantenimiento,
        Nombre_Encargado: this.$data.InChargeName,
        Costo_Mantenimiento: parseInt(this.$data.costoMantenimiento),
        Observaciones: this.Observaciones,
        Descripcion: this.Actividades,
        Herramientas: this.Herramientas,
        Materiales: this.Materiales,
        Cantidad: this.Cantidades,
      };
      //console.log(mantenimiento);
      //Ponemos el loading a cargar mientras carga la respuesta de nuestra api
      this.$q.loading.show({
        spinner: QSpinnerCube,
        spinnerColor: "indigo-10",
        spinnerSize: 50,
        backgroundColor: "indigo-11",
        message: "Subiendo Mantenimiento",
        messageColor: "indigo-10",
      });
      try {
        console.log("esta a punto");
        //Crear un mantenimiento
        if (this.Flags.lastRoute == "/MaintenanceList") {
          const response = await service.createMaintenance(mantenimiento);
          this.$q.loading.hide();
          this.alert = true;
          await this.$store.dispatch("cardState/postStatisticAction"); // HACER ESTADISTICAS
        }
        //si no viene de una ruta de la lista de los mantenimientos
        else if (this.Flags.reporte.Status) {
          const response = await service.createMaintenance(mantenimiento);

          //Actualizar el status de un reporte pendiente

          try {
            let reporte = {
              Fecha: this.Flags.reporte.Fecha,
              Dia: this.Flags.reporte.Dia,
              Status: false,
            };
            console.log("este es el id del reporte", reporte);
            const response = await service.updateReport(reporte);
            //ACTUALIZAMOS EL STATUS TAMBIE SI ES QUE EN LA API SE HA HECHO CORRECTAMENTE
            for (var i = 0; i < this.Reportes.length; i++) {
              if (this.Reportes[i].Dia === this.Flags.reporte.Dia) {
                this.Reportes[i] = {
                  ...this.Reportes[i],
                  ...this.Flags.reporte,
                };
              }
            }
            console.log("al final", this.Reportes);

            this.$q.notify({
              color: "green",
              textColor: "white",
              icon: "notification_important",
              message: `Se verificó el reporte automáticamente`,
            });
            await this.$store.dispatch("cardState/postStatisticAction"); // HACER ESTADISTICAS
          } catch (error) {
            this.$q.notify({
              color: "orange",
              textColor: "white",
              icon: "notification_important",
              message: `No se pudo actualizar el Status del reporte, por favor actualizalo manualmente a verificado`,
            });
          }

          this.$q.loading.hide();
          this.alert = true;
        }
      } catch (error) {
        console.log(error);
        this.alertfalse = true;
        this.$q.loading.hide();
      }
    },
    //Crear mantenimiento correctivo a partir de un reporte
    createMaintenanceOfReport() {
      //Buscamos la foto del equipo que le corresponde a el reporte
      this.Equipos.forEach((e) => {
        if (e.ID_Equipo == this.Flags.reporte.ID_Equipo) {
          this.ImagenEquipo = e.Foto;
        }
      });
      this.TipoMantenimiento = "Correctivo"; //Inicializacion de tipo de mantenimiento
      this.Observaciones =
        "<b>A causa de un reporte por: \n </b>" + this.Flags.reporte.Reporte;
      this.lastRoute = this.Flags.lastRoute; //inicializacion de las observaciones automaticamente
    },
    //Crear un mantenimiento normal sin automatizacion de incializacion de variables
    createNormalMaintenance() {
      //Si la ruta viene de la lista de mantenimientos ponemos la foto del equipo seleccionado
      this.ImagenEquipo = this.$store.state.cardState.EquipoSelected[0].Foto;
    },
    //Inicializacion de las variables escenciales
    inicializacionVariables() {
      this.idEquipo = this.IDEM; //Tomamos el id del equipo seleccionado
      this.InChargeName = this.Usuario.name; //POnemos el nombre del creado automaticamente
      this.reportesAux = [...this.Reportes];
    },
  },
};
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid black

.imageStyle
  width: 50%
  border-radius: 0.5rem
  height: auto
  max-height: 350px
</style>