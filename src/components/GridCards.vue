<template>
  <div>
    <div
      style="width: 100%; margin-bottom: 5.5rem"
      class="row q-col-gutter-x-xs q-col-gutter-y-lg"
    >
      <q-spinner-cube
        v-if="Equipos.length === 0"
        indeterminate
        reverse
        size="100px"
        :thickness="1"
        :color="drawerState ? 'white' : 'primary'"
        track-color="light-blue"
        class="fixed-center"
      />
       <q-item-label
        v-if="Equipos.length === 0"
        class="fixed-center labelCargando text-white"
        style="
          background-color: rgb(0, 0, 0, 0.5);
          border-radius: 0.5rem;
          padding: 0.5rem;
        "
        overline
        >Cargando equipos...</q-item-label
      >
      <div
        class="col-lg-3 col-md-4 col-sm-6 col-xs-12"
        v-for="(n, index) in Equipos"
        v-bind:key="index"
      >
        <card
          :warning="comparar(n.ID_Equipo)"
          :image="n.Foto"
          :id="n.ID_Equipo"
          :serie="n.No_Serie"
          :name="n.Nombre_Equipo"
          :modelo="n.Modelo"
          :brand="n.Marca"
        />
      </div>
    </div>
    <q-btn
      icon="expand_more"
      label="ver mas equipos"
      style="border-radius: 4rem 4rem 0 0; width: 100%; margin-bottom: -2.5rem"
      class="bg-positive text-white absolute-bottom"
      v-if="
        LastEvaluatedKey != '' &&
        (this.$store.state.global.TypeSearch == 'Equipo' ||
          this.$store.state.global.TypeSearch == 'Marca' ||
          this.$store.state.global.TypeSearch == 'Numero de Serie' ||
          this.$store.state.global.TypeSearch == 'Modelo')
      "
      @click="loadMore()"
      push
      :loading="cargar"
    >
      <template v-slot:loading>
        <q-spinner-cube />
      </template>
    </q-btn>
  </div>
</template>

<script>
import Card from "./Card.vue";
import service from "../apiservice/service.js";

export default {
  name: "LayoutDefault",
  components: { 
    Card,
  },
  data() {
    return {
      IDSEQUIPOS: [], //Array de ID EQUIPO CON REPORTE
      cargar: false,
    };
  },
  created() {
    //CALL computed method #Get all reports
    // console.log("Equipos en grid", this.Equipos);
    this._getReports;
    this.Equipos = this.EquiposAux;
  },

  destroyed() {
    //Volvemos a llenar los equipos con todos los que debaria de tener
    this.Equipos = this.EquiposAux;
  },

  methods: {
    //Metodo que se manda llamar pòr cad uno de los cards que se iteran para guardar un arreglo de los ids de los equipos que tienen un reporte
    comparar(IdEquipo) {
      const even = (element) => element === IdEquipo;
      return this.IDSEQUIPOS.some(even);
    },
    async loadMore() {
      //Tratamos de obtener mas equipos con la accion qu ya tenemos en acciones
      this.cargar = true;
      try {
        await this.$store.dispatch("cardState/getMoreEquipmentsAction");
      } catch (error) {
        this.$q.notify({
          color: "red-14",
          textColor: "white",
          icon: "wifi_off",
          message: "Ha ocurrido un error" + error,
        });
      }
      this.cargar = false;
    },
  },

  computed: {
    //OBTENEMOS EL ARREGLO DE REPORTES DESDE LA API atraves de una action
    async _getReports() {
      let f = new Date();
      let mes = f.getMonth() + 1;
      if (mes.toString().length == 1) mes = "0" + mes;
      var objDate = {
        Año: f.getFullYear(),
        Mes: mes,
      };
      const response = await service.getAllReports(objDate);

      this.Reportes = await response.data;
      for (var i = 0; i < this.Reportes.length; i++) {
        if (this.Reportes[i].Status) {
          this.IDSEQUIPOS.push(this.Reportes[i].ID_Equipo);
        }
      }
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
    //STATE DE LOS EQUIPOS AXILIARES
    EquiposAux: {
      get() {
        return this.$store.state.cardState.EquiposAux;
      },
    },
    //STATE DE MODO OSCURO
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
    //STATE DE LOS REPORTES
    Reportes: {
      get() {
        return this.$store.state.cardState.Reportes;
      },
      set(Reportes) {
        this.$store.commit("cardState/updateReportes", Reportes);
      },
    },
    //STATE DE LOS REPORTES AUXILIARES
    ReportesAux: {
      get() {
        return this.$store.state.cardState.ReportesAux;
      },
    },

    LastEvaluatedKey: {
      get() {
        return this.$store.state.cardState.LastEvaluatedKey;
      },
      set(LastEvaluatedKey) {
        this.$store.commit(
          "cardState/updateLastEvaluatedKey",
          LastEvaluatedKey
        );
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.row > div
  padding: 5px 5px 5px 5px
.row + .row
  margin-top: 1rem
.labelCargando
  margin-top: 4.4rem
</style>