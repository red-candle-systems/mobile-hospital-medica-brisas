<template>
  <div>
    <div class="row">
      <div class="col-12" style="margin-right: 1rem; margin-top: 0.5rem">
        <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <ActivityListDetail />
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <MaterialListDetail />
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <ToolsListDetail />
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-toolbar class="justify-center">
              <q-img :src="ImagenEquipo" class="imageStyle"></q-img>
            </q-toolbar>
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
              readonly
              color="primary"
              filled
              v-model="costo_mantenimiento"
              label="Costo de Mantenimiento"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="attach_money" />
              </template>
            </q-input>
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              readonly
              filled
              v-model="fecha_mantenimiento"
              style="width: 100%"
              label="Fecha de Mantenimiento"
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="fecha_mantenimiento" mask="YYYY-MM-DD" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="col-12 col-sm-6 col-lg-4 col-md-4">
            <q-input
              readonly
              v-model="tipo_mantenimiento"
              color="blue"
              filled
              label="Tipo de Mantenimiento"
              style="width: 100%"
            >
              <template v-slot:prepend>
                <q-icon name="line_weight" />
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div style="width: 100%">
        <h5
          style="color: white; font-family: Serif; border-radius: 0.5rem"
          class="glossy text-center bg-blue-10"
        >
          Observaciones
        </h5>
        <q-card flat bordered style="margin-top: -1rem">
          <q-card-section v-html="editor"></q-card-section>
        </q-card>
      </div>
    </div>
    <div
      style="
        background-color: #1976d2;
        margin-top: 0.5rem;
        height: 0.2rem;
        width: 100%;
      "
      class="glossy"
    ></div>
  </div>
</template>

<script>
import ActivityListDetail from "../components/ActivityListDetail";
import MaterialListDetail from "../components/MaterialListDetail";
import ToolsListDetail from "../components/ToolsListDetail";

export default {
  components: {
    ActivityListDetail,
    MaterialListDetail,
    ToolsListDetail,
  },
  data() {
    return {
      InChargeName: "",
      ImagenEquipo: "",
      costo_mantenimiento: "",
      fecha_mantenimiento: "",
      tipo_mantenimiento: "",
      alert: false,
      confirm: false,
      editor: "",
    };
  },
  created() {
    this.Equipos.forEach((e) => {
      if (e.ID_Equipo == this.MantenimientoSelected[0].ID_Equipo) {
        this.ImagenEquipo = e.Foto;
      }
    });
    this.InChargeName = this.MantenimientoSelected[0].Nombre_Encargado;
    this.fecha_mantenimiento =
      this.MantenimientoSelected[0].Fecha +
      "-" +
      this.MantenimientoSelected[0].Dia;
    this.tipo_mantenimiento = this.MantenimientoSelected[0].Tipo_Mantenimiento;
    this.costo_mantenimiento = this.MantenimientoSelected[0].Costo_Mantenimiento;
    this.editor = this.MantenimientoSelected[0].Observaciones;
  },
  methods: {
    onItemClick() {
      // console.log('Clicked on an Item')
    },
  },
  computed: {
    MantenimientoSelected: {
      get() {
        return this.$store.state.cardState.MantenimientoSelected;
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