<template>
  <div id="q-app">
    <div>
      <q-btn
        label="¿Cómo funciona?"
        color="light-blue-10"
        icon="format_list_numbered"
        @click="dialog = true"
        class="btnCmoFunciona"
        push
      ></q-btn>

      <q-dialog
        v-model="dialog"
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card class="bg-primary text-white cardStyle">
          <q-bar>
            <q-space></q-space>

            <q-btn
              dense
              flat
              icon="minimize"
              @click="maximizedToggle = false"
              :disable="!maximizedToggle"
            >
              <q-tooltip
                v-if="maximizedToggle"
                content-class="bg-white text-primary"
                >Minimize</q-tooltip
              >
            </q-btn>
            <q-btn
              dense
              flat
              icon="crop_square"
              @click="maximizedToggle = true"
              :disable="maximizedToggle"
            >
              <q-tooltip
                v-if="!maximizedToggle"
                content-class="bg-white text-primary"
                >Maximize</q-tooltip
              >
            </q-btn>
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-bar>
          <q-card-section>
            <div class="text-h6">¿Cómo usar el equipo?</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-stepper
              v-model="posicion"
              ref="stepper"
              color="primary"
              animated
              class="shadow-9 bg-white"
            >
              <q-step
                v-for="(n, index) in steps"
                :key="index"
                :name="index"
                :title="n.Nombre"
                icon="settings"
                :done="posicion > index"
                class="bg-dark"
              >
                {{ n.Detalle }}
              </q-step>

              <template v-slot:navigation>
                <q-stepper-navigation>
                  <br />
                  <q-btn
                    @click="$refs.stepper.next()"
                    color="primary"
                    :label="posicion === steps.length - 1 ? 'Finish' : 'Next'"
                  ></q-btn>
                  <q-btn
                    v-if="posicion > 0"
                    flat
                    color="primary"
                    @click="$refs.stepper.previous()"
                    label="Back"
                    class="q-ml-sm"
                  ></q-btn>
                  <StepperCreate
                    v-if="Usuario.rol == 1"
                    class="float-right"
                    color="indigo-9"
                  />
                </q-stepper-navigation>
              </template>
            </q-stepper>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import StepperCreate from "./StepperCreate.vue";
import service from "../apiservice/service.js";

export default {
  components: {
    StepperCreate,
  },
  created() {
    this.IDStepper = this.IDEM;
    this.StepperConsult();
  },

  updated() {
    this.steps = this.Steps;
    //console.log(this.Steps);
  },

  methods: {
    cerrarVentana() {},
    async StepperConsult() {
      try {
        const response = await service.getSteps(this.IDStepper);
        if (response.data != "") {
          this.Steps = await response.data.Pasos;
          this.steps = await response.data.Pasos;
        } else {
          this.Steps = [];
          this.steps = [];
        }
      } catch (error) {
        this.Steps = [];
      }
    },
  },
  data() {
    return {
      dialog: false,
      posicion: 0,
      maximizedToggle: false,
      steps: [],
      IDStepper: "",
    };
  },

  props: {
    Nombre: {
      type: String,
      default: "Hola mundo",
    },

    Detalle: {
      type: String,
      default: "Titulo",
    },
  },
  computed: {
    IDEM: {
      get() {
        return this.$store.state.cardState.IDEM;
        this.$data.data = this.IDEM;
      },
      set(IDEM) {
        this.$store.commit("cardState/updateIDEM", IDEM);
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
.btnCmoFunciona
  width: 100%
  height: 56px

.cardStyle
  width: 100%
</style>