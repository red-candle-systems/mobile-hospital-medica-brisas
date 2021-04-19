<template>
  <div>
    <q-btn
      color="deep-orange "
      icon="edit"
      @click="Verify()"
      class="btnActualizarStyle"
      push
    ></q-btn>
    <q-dialog
      v-model="dialog"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="text-h6">¡Registro guardado!</div>
          </q-card-section>
          <q-card-section class="q-pt-none"
            >Su registro ha sido guardado exitosamente</q-card-section
          >
          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup="3" />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-card class="bg-primary text-white cardStyle">
        <q-bar>
          <q-space></q-space>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Cerrar</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <div class="text-h6">Lista de pasos</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-card>
            <q-separator />
            <q-card-section class="scroll cardSectionScroll">
              <q-input
                color="blue"
                v-model="titulo"
                filled
                label="Titulo"
                class="InputStyle"
              >
                <template v-slot:prepend>
                  <q-icon name="line_weight" />
                </template>
              </q-input>
              <br />
              <q-input
                color="blue"
                v-model="detalle"
                filled
                label="Detalle"
                class="InputStyle"
              >
                <template v-slot:prepend>
                  <q-icon name="line_weight" />
                </template>
              </q-input>
              <br />

              <q-btn
                push
                color="positive"
                class="float-right"
                @click="addNewStep"
                >{{ accion }}
              </q-btn>
            </q-card-section>
            <q-separator />
            <q-card-section class="bg-grey-10 text-white">
              <q-list dark bordered separator class="rounded-borders">
                <q-item
                  v-ripple
                  v-for="(p, index) in Pasos"
                  :key="index"
                  clickable
                  @click="mandarInfo(p.Nombre, p.Detalle, index)"
                >
                  <q-item-section avatar>{{ p.Nombre }}</q-item-section>
                  <q-item-section>{{ p.Detalle }}</q-item-section>
                  <q-item-section avatar>
                    <q-btn size="sm" color="white" @click="eliminar(index)">
                      <q-icon name="delete" color="red" />
                    </q-btn>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Salir y Olvidar" color="blue" v-close-popup />
              <q-btn
                flat
                label="Guardar todo y Aceptar"
                @click="subirapi()"
                color="blue"
              />
            </q-card-actions>
          </q-card>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import service from "../apiservice/service.js";
import { QSpinnerCube } from "quasar";

export default {
  data() {
    return {
      alert: false,
      dialog: false,
      maximizedToggle: true,
      basic: false,
      fixed: false,
      stepobj: {},
      titulo: "",
      detalle: "",
      Pasos: [],
      accion: "Agregar",
      BanderaActualizar: false,
      posicion: 0,
    };
  },
  methods: {
    Verify() {
      if (this.Usuario.rol == 1) {
        this.$q.loading.show({
          spinner: QSpinnerCube,
          spinnerColor: "indigo-10",
          spinnerSize: 50,
          backgroundColor: "indigo-11",
          message: "Cargando Pasos",
          messageColor: "indigo-10",
        });
        try {
          if (this.Steps.length > 0) {
            this.BanderaActualizar = true;
            this.Pasos = this.Steps;
          } else {
            this.BanderaActualizar = false;
          }
          this.$q.loading.hide();
        } catch (error) {
          this.BanderaActualizar = false;
          this.$q.loading.hide();
        }
        this.dialog = true;
      }
      if (this.Usuario.rol == 2 || this.Usuario.rol == 3) {
        this.$q.notify({
          position: "bottom",
          timeout: 2500,
          textColor: "white",
          type: "warning",
          message: `No tienes los permisos para actualizar los pasos`,
        });
        return;
      }
    },
    eliminar(index) {
      // //console.log(index);
      ////console.log(this.Pasos);
      this.Pasos.splice(index, 1);
      ////console.log(this.Pasos);
    },
    mandarInfo(c, m, index) {
      this.titulo = c;
      this.detalle = m;
      this.accion = "Editar";
      this.banderaEditar = true;
      this.posicion = index;
    },

    async subirapi() {
      this.$q.loading.show({
        spinner: QSpinnerCube,
        spinnerColor: "indigo-10",
        spinnerSize: 50,
        backgroundColor: "indigo-11",
        message: "Cargando solicitud",
        messageColor: "indigo-10",
      });
      try {
        var STEP = {
          ID_Equipo: this.IDEM,
          Pasos: this.Pasos,
        };

        if (STEP.Pasos.length === 0) {
          const response = await service.deleteStep(STEP.ID_Equipo);
        } else {
          if (this.BanderaActualizar) {
            console.log("VOY A ACTUALIZAR", STEP.Pasos);
            try {
              const response = await service.updateStep(STEP);
              this.Steps = STEP.Pasos;
            } catch (error) {}
          } else {
            try {
              const response = await service.createStep(STEP);
              this.Steps = [...STEP.Pasos];
            } catch (error) {}

            console.log("VOY A CREAR");
          }
        }
        this.$q.loading.hide();
        this.$data.alert = true;
      } catch (error) {
        this.$q.notify({
          position: "bottom",
          timeout: 2500,
          color: "red",
          textColor: "white",
          type: "warning",
          message: `No se pudo realizar su solicitud`,
        });
        this.$q.loading.hide();
      }
      this.$store.commit("global/updateSteps", this.Pasos);
    },
    addNewStep() {
      if (this.titulo !== "" && this.detalle !== "") {
        //console.log(this.Pasos);
        this.stepobj.Nombre = this.titulo;
        this.stepobj.Detalle = this.detalle;
        /////////////Tenemos que vaciar el obj de nuevo porque si no maraca error y sobreescribe las propiedades
        if (this.banderaEditar) {
          this.accion = "Agregar";
          this.Pasos[this.posicion] = { ...this.stepobj };
          this.banderaEditar = false;
        } else {
          this.Pasos.push(this.stepobj);
        }
        this.detalle = "";
        this.titulo = "";
      } else {
        this.$q.notify({
          position: "bottom",
          timeout: 2500,
          textColor: "white",
          type: "warning",
          message: `Ingresa correctamente el Titulo y el Detalle`,
        });
      }
      this.stepobj = {};
    },
  },
  computed: {
    IDEM: {
      get() {
        return this.$store.state.cardState.IDEM;
        this.$data.data = this.IDEM;
      },
    },
    Steps: {
      get() {
        return this.$store.state.global.Steps;
      },
      set(Steps) {
        this.$store.commit("global/updateSteps", Steps);
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
  },
};
</script>

<style lang="sass" scoped>
.btnActualizarStyle
  width: 100%

.cardStyle
  width: 100%

.cardSectionScroll
  max-height: 50vh
  width: 100%

.InputStyle
  width: 100%
</style>