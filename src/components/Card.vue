<template>
  <div>
    <q-card class="my-card" style="width: 100%" @click="SelectEquipment(id)">
      <q-card-section horizontal style="width: 100%">
        <q-img
          basic
          class="col-5"
          style="
            width: 115px;
            height: 115px;
            margin: 0.5rem;
            border-radius: 1rem;
          "
          :src="image"
        />
        <q-card-section style="width: 100%">
          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            class="qScrollStyle"
          >
            <div class="row">
              <q-item-label
                overline
                style="font-size: 0.9rem"
                class="col text-weight-bolder qItemLabelStyle"
                :class="drawerState ? 'clase-blanca' : 'clase-negra'"
                >Equipo:
              </q-item-label>
              <div class="col">{{ name }}</div>
            </div>

            <div class="row">
              <q-item-label
                overline
                style="font-size: 0.9rem"
                class="col text-weight-bolder"
                :class="drawerState ? 'clase-blanca' : 'clase-negra'"
                >Marca:
              </q-item-label>
              <div class="col">{{ brand }}</div>
            </div>

            <div class="row">
              <q-item-label
                overline
                style="font-size: 0.9rem"
                class="col text-weight-bolder"
                :class="drawerState ? 'clase-blanca' : 'clase-negra'"
                >Serie:
              </q-item-label>
              <div class="col">{{ serie }}</div>
            </div>

            <div class="row">
              <q-item-label
                overline
                class="col text-weight-bolder qItemLabelStyle"
                :class="drawerState ? 'clase-blanca' : 'clase-negra'"
                >Modelo:
              </q-item-label>
              <div class="col">{{ modelo }}</div>
            </div>
          </q-scroll-area>
        </q-card-section>

        <!--Icono de warning -->
        <q-icon
          v-if="warning === true"
          size="1rem"
          class="absolute-bottom-right"
          style="margin: 0.3rem"
          color="deep-orange"
          name="report_problem"
        ></q-icon>
      </q-card-section>
      <q-separator />
      <q-card-actions class="justify-end">
        <q-btn
          label="Ver Más"
          :color="drawerState ? 'black' : 'light-blue-10'"
          push
          size="sm"
          icon="more"
          @click="SelectEquipment(id)"
          class="shadow-25"
          style="margin-right: 0.4rem; border-color: white"
        >
        </q-btn>

        <q-btn
          size="sm"
          label="Mantenimiento"
          :color="drawerState ? 'black' : 'light-blue-10'"
          push
          class="shadow-25"
          icon="engineering"
          to="/MaintenanceSectionEquipment"
          @click="_getMantenimientos(id)"
        ></q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import Stepper from "../components/Stepper";
export default {
  components: {
    Stepper,
  },
  name: "Card",
  data() {
    return {
      maximizedToggle: false,
      Steps: [
        {
          instruccion: "Hola mundo",
          TituloPaso: "Titulo",
        },
        {
          instruccion: "Hola mundo2",
          TituloPaso: "Titulo2",
        },
        {
          instruccion: "Hola mundo3",
          TituloPaso: "Titulo3",
        },
        {
          instruccion: "Hola mundo4",
          TituloPaso: "Titulo4",
        },
      ],
      thumbStyle: {
        right: "-6px",
        borderRadius: "1px",
        backgroundColor: "#027be3",
        width: "2px",
        opacity: 0.75,
      },
      barStyle: {
        right: "-6px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "2px",
        opacity: 0.2,
      },
    };
  },
  //Propieddaes que recibe este componnete Card
  props: {
    name: {
      type: String,
      default: "Ventilador",
    },

    image: {
      type: String,
      default: "https://cdn.quasar.dev/img/parallax1.jpg",
    },

    brand: {
      type: String,
      default: "Hisense",
    },

    serie: {
      type: String,
      default: "1234",
    },

    modelo: {
      type: String,
      default: "1234",
    },

    id: {
      type: String,
    },
    warning: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    //Metodo que indica cual card es el seleccionado y redirige a ver su detalle
    SelectEquipment(id) {
      var equipmentSelected = this.$store.state.cardState.Equipos.filter(
        (equipo) => equipo.ID_Equipo == id
      );
      //console.log(equipmentSelected);
      this.EquipoSelected = equipmentSelected;
      this.IDEM = id;
      if (this.$router.currentRoute.path != "/EquipmentDetail/")
        //EVITAR ERROR DE RUTA DUPLICADA YA QUE EL BOTON ESTA DENTRO DEL CARD
        this.$router.push({ path: "/EquipmentDetail/" });
    },
    //Metodo que redirige a la lista de los mantenimientos
    _getMantenimientos(id) {
      var equipmentSelected = this.$store.state.cardState.Equipos.filter(
        (equipo) => equipo.ID_Equipo == id
      );
      this.EquipoSelected = equipmentSelected;
      this.IDEM = id;
    },
  },
  computed: {
    //STATE GLOBAL DEL EQUIPO ACTUALMENTE SELECCIONADO
    EquipoSelected: {
      get() {
        return this.$store.state.cardState.EquipoSelected;
      },
      set(EquipoSelected) {
        this.$store.commit("cardState/updateEquipoSelected", EquipoSelected);
      },
    },
    //STATE GLOBAL DEL ID ACTUALMENTE SELECCIONAOD DE UN EQUIPO
    IDEM: {
      get() {
        return this.$store.state.cardState.IDEM;
        this.$data.data = this.IDEM;
      },
      set(IDEM) {
        this.$store.commit("cardState/updateIDEM", IDEM);
      },
    },
    //STATE DEL MODO OSCURO
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
.my-card
  width: 100%
  margin-top: -0.5rem
  margin: 0px 2px 0rem 2px

.clase-blanca
  color: white

.clase-negra
  color: dark

.qImageStyle
  margin: 0.2rem
  width: 140px
  height: 130px

.qScrollStyle
  height: 100px
  width: 100%

.qItemLabelStyle
  font-size: 0.9rem
</style>
