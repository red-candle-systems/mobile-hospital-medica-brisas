<template>
  <div>
    <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
      <q-spinner-gears
        v-if="spinner"
        indeterminate
        reverse
        size="100px"
        :thickness="1"
        color="blue"
        track-color="light-blue"
        class="fixed-center z-top"
      />
      <q-item-label
        v-if="spinner"
        class="fixed-center labelCargando z-top text-white"
        style="
          background-color: rgb(0, 0, 0, 0.6);
          border-radius: 0.5rem;
          padding: 0.5rem;
        "
        overline
        >Cargando estadísticas...</q-item-label
      >
      <div
        class="col-lg-3 col-md-4 col-sm-6 col-xs-12"
        v-for="(n, index) in ArrayStatistics"
        :key="index"
      >
        <card-statistics
          :StatisticsValue="n.StatisticsValue"
          :StatisticsLabel="n.StatisticsLabel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardStatistics from "./CardStatistics.vue";
import service from "../apiservice/service.js";

export default {
  name: "LayoutDefault",
  components: {
    CardStatistics,
  },

  data() {
    return {
      AtencionFalla: 0,
      ReemplazoDaño: 0,
      FallaRepentina: 0,
      MantenimientoVigente: 0,
      CumplirProgramados: 0,
      TotalMantenimientos: [],
      EquiposInactivos: [],
      MantenimientosPreventivos: [],
      MantenimientosCorrectivos: [],
      MantenimientosPreventivosProgramados: 0,
      TotalReportes: [],
      ReportesActivos: [],
      spinner: true,

      ArrayStatistics: [
        {
          StatisticsValue: 0,
          StatisticsLabel: "Efectividad en la atención a los reportes de falla",
        },
        {
          StatisticsValue: 0,
          StatisticsLabel: "Equipos médicos reemplazados por obsolencia o daño",
        },
        {
          StatisticsValue: 0,
          StatisticsLabel: "Falla repentina de equipo médico",
        },
        {
          StatisticsValue: 0,
          StatisticsLabel: "Equipos con certificado de mantenimiento vigente",
        },
        {
          StatisticsValue: 0,
          StatisticsLabel:
            "Cumplimiento de mantenimientos preventivos programados",
        },
      ],
    };
  },

  created() {
    ////console.log(this.referenceVariable.length)
    let fechaActual = new Date();

    if (
      this.StatisticSectionSelected.Mes == fechaActual.getMonth() + 1 &&
      this.StatisticSectionSelected.Año == fechaActual.getFullYear()
    ) {
      this.doOperations;
    } else {
      this._getStatistics;
    }
  },

  destroyed() {
    this.Estadisticas = [];
    this.spinner = false;
  },

  computed: {
    Equipos: {
      get() {
        return this.$store.state.cardState.Equipos;
      },
      set(Equipos) {
        this.$store.commit("cardState/updateEquipments", Equipos);
      },
    },
    //Obtener las estadisticas desde la api
    async _getStatistics() {
      //console.log("Vamos a consultar las estadisticas de la api apenas");
      try {
        await this.$store.dispatch(
          "cardState/getStatisticsAction",
          this.StatisticSectionSelected
        );
        this.dateStatistics;
      } catch (error) {
        this.$q.notify({
          color: "red-13",
          textColor: "white",
          icon: "search_off",
          message: "No existen estadísticas para este mes " + error,
        });
      }
      this.spinner = false;
    },
    //Obtener los equipos
    _getCards() {
      for (var i = 0; i < this.Equipos.length; i++) {
        if (this.Equipos[i].Estado_Servicio === false) {
          this.EquiposInactivos.push(this.Equipos[i]);
        }
        let Month = new Date().getMonth() + 1;
        if (Month.toString().length == 1) {
          Month = "0" + Month.toString();
        }
        if (
          this.Equipos[i].Siguiente_Mantenimiento.slice(0, 7) ==
          new Date().getFullYear().toString() + "-" + Month
        ) {
          this.MantenimientosPreventivosProgramados += 1;
        }
      }
    },
    //Obtener los mantemimientos
    async _getMantenimientos() {
      let f = new Date();
      let mes = f.getMonth() + 1;
      //console.log(mes.toString().length);
      if (mes.toString().length == 1) mes = "0" + mes;
      var objDate = {
        Año: f.getFullYear(),
        Mes: mes,
      };
      const response = await service.getAllMantenances(objDate);
      this.$data.TotalMantenimientos = response.data;

      //console.log(this.TotalMantenimientos);
      for (var i = 0; i < this.TotalMantenimientos.length; i++) {
        if (this.TotalMantenimientos[i].Tipo_Mantenimiento === "Preventivo") {
          this.MantenimientosPreventivos.push(this.TotalMantenimientos[i]);
        } else if (
          this.TotalMantenimientos[i].Tipo_Mantenimiento === "Correctivo"
        ) {
          this.MantenimientosCorrectivos.push(this.TotalMantenimientos[i]);
        }
      }
    },
    //0bntener los reportes
    _getReports() {
      this.$data.TotalReportes = this.Reportes;
      ////console.log("Numero de reportes", this.TotalReportes.length);
      for (var i = 0; i < this.TotalReportes.length; i++) {
        if (this.TotalReportes[i].Status) {
          this.ReportesActivos.push(this.TotalReportes[i]);
        }
      }
    },
    //STATE DE LOS REPORTES
    Reportes: {
      get() {
        return this.$store.state.cardState.Reportes;
      },
      set(Reportes) {
        this.$store.commit("updateReportes", Reportes);
      },
    },
    //STATE DE LA FECHA ACTUAL DE UNA SECCION DE UN MANTENIMIENTO SELECCIONADO
    StatisticSectionSelected: {
      get() {
        return this.$store.state.cardState.StatisticSectionSelected;
      },
      set(StatisticSectionSelected) {
        this.$store.commit(
          "cardState/updateStatisticSectionSelected",
          StatisticSectionSelected
        );
      },
    },
    //Arreglo de estadiosticas
    Estadisticas: {
      get() {
        return this.$store.state.cardState.Estadisticas;
      },
      set(Estadisticas) {
        this.$store.commit("cardState/updateStatistics", Estadisticas);
      },
    },
    async doOperations() {
      //ATENCION A UN REPORTE DE FALLA
      this._getCards;
      this._getReports;
      await this._getMantenimientos;

      //ATENCION POR FALLA
      this.AtencionFalla =
        (this.MantenimientosCorrectivos.length / this.TotalReportes.length) *
        100;
      this.AtencionFalla = this.AtencionFalla.toFixed(2);
      this.ArrayStatistics[0].StatisticsValue = parseFloat(this.AtencionFalla);

      //REEMPLAZO POR OBSOLENCIA O DAÑO
      this.ReemplazoDaño =
        (this.EquiposInactivos.length / this.Equipos.length) * 100;
      this.ReemplazoDaño = this.ReemplazoDaño.toFixed(2);
      this.ArrayStatistics[1].StatisticsValue = parseFloat(this.ReemplazoDaño);

      //FALLA REPENTINA
      this.FallaRepentina =
        (this.MantenimientosCorrectivos.length / this.Equipos.length) * 100;
      this.FallaRepentina = this.FallaRepentina.toFixed(2);
      this.ArrayStatistics[2].StatisticsValue = parseFloat(this.FallaRepentina);

      //CERTIFICADO DE MANTENIMEINTO VIGENTE
      this.MantenimientoVigente =
        (this.MantenimientosPreventivos.length / this.Equipos.length) * 100;
      this.MantenimientoVigente = this.MantenimientoVigente.toFixed(2);
      this.ArrayStatistics[3].StatisticsValue = parseFloat(
        this.MantenimientoVigente
      );

      //CUMPLIMIENTO DE MANTENIMIENTOS PREVENTIVOS PROGRAMADOS
      this.CumplirProgramados =
        (this.MantenimientosPreventivos.length /
          this.MantenimientosPreventivosProgramados) *
        100;
      this.CumplirProgramados = this.CumplirProgramados.toFixed(2);
      this.ArrayStatistics[4].StatisticsValue = parseFloat(
        this.CumplirProgramados
      );

      this.spinner = false;
    },
    //Metodo que pasa las estadisticas de la api al arreglo local de las estadisticas de un mes en especifico
    dateStatistics() {
      this.Estadisticas.Estadisticas.map((e) => {
        this.ArrayStatistics[e.Numero - 1].StatisticsValue = e.Cantidad;
      });
    },
    //Modo oscuro
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
.imageStyle
  width: 400px
  height: 320px
  padding-bottom: 3rem

.labelCargando
  margin-top: 4.4rem
</style>