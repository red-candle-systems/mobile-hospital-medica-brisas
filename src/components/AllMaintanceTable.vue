<template>
  <div>
    <q-table
      title="Lista Mantenimientos"
      :data="data"
      :columns="columns"
      row-key="index"
      flat
      selection="single"
      :selected.sync="selected"
      :loading="loading"
      :pagination="initialPagination"
    >
      <template v-slot:loading>
        <q-spinner-cube
          v-if="loading == true"
          indeterminate
          showing
          reverse
          size="70px"
          :thickness="1"
          class="self-center"
          style="margin: 1rem"
          track-color="light-blue"
          :color="drawerState ? 'white' : 'primary'"
        />
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      loading: true,
      alert: false,
      columns: [
        {
          name: "index",
          label: "#",
          field: "index",
        },
        {
          Tipo_Mantenimiento: "Tipo_Mantenimiento",
          required: true,
          label: "Tipo de mantenimiento",
          align: "left",
          field: (row) => row.Tipo_Mantenimiento,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          Nombre_Encargado: "Nombre_Encargado",
          align: "left",
          label: "Nombre del encargado",
          field: "Nombre_Encargado",
          sortable: true,
        },
        {
          Fecha_Mantenimiento: "Fecha_Mantenimiento",
          align: "left",
          label: "Año - Mes",
          field: "Fecha",
          sortable: true,
        },
        {
          Dia: "Dia",
          align: "left",
          label: "Dia - hora",
          field: "Dia",
          sortable: true,
        },
        {
          Costo_Mantenimiento: "Costo_Mantenimiento",
          align: "left",
          label: "Gasto total",
          field: "Costo_Mantenimiento",
          sortable: true,
          sort: (a, b) => parseFloat(a, 10) - parseFloat(b, 10),
        },
      ],
      data: [],
      initialPagination: {
        rowsPerPage: 50,
        // rowsNumber: xx if getting data from a server
      },
    };
  },
  created() {
    //get method all maintenances
    this.getAllMaintenances();
  },
  updated() {
    //Setear al state el mantenimeinto seleccionado actualmente
    this.MantenimientoSelected = this.selected;
    //console.log(this.MantenimientoSelected);
  },
  methods: {
    //Metodo que obtiene todos los mantenimientos hechos
    async getAllMaintenances() {
      try {
        await this.$store.dispatch("cardState/getMaintenancesAction");
        this.$data.data = this.Mantenimientos;
      } catch (error) {
        this.$q.notify({
          color: "red",
          textColor: "white",
          icon: "search_off",
          message: "Error cargando los mantenimientos" + error,
        });
      }
      await this.data.forEach((row, index) => {
        row.index = index;
      });
      if (this.data.length == 0) {
        //quiere decir que aun no hay mantenimientos
        this.loading = false;
        this.$q.notify({
          color: "blue-13",
          textColor: "white",
          icon: "search_off",
          message: "Aun no hay mantenimientos",
          position: "center",
        });
      } else {
        this.loading = false;
      }
    },
  },
  computed: {
    //STATE  DEL ID DEL EQUIPO ACTUALMENTE SELECCIONADO
    IDEM: {
      get() {
        return this.$store.state.cardState.IDEM;
      },
      set(IDEM) {
        this.$store.commit("cardState/updateIDEM", IDEM);
      },
    },
    //STATE  DEL ID DEL EQUIPO ACTUALMENTE SELECCIONADO
    Mantenimientos: {
      get() {
        return this.$store.state.cardState.Mantenimientos;
      },
      set(Mantenimientos) {
        this.$store.commit("cardState/updateMaintenances", Mantenimientos);
      },
    },
    //STATE DEL OBJETO DEL MANTENIMIENTO SELECCIONADO
    MantenimientoSelected: {
      get() {
        return this.$store.state.cardState.MantenimientoSelected;
      },
      set(MantenimientoSelected) {
        this.$store.commit(
          "cardState/updateMantenimientoSelected",
          MantenimientoSelected
        );
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
    //STATE DE LA FECHA ACTUAL DE UNA SECCION DE UN MANTENIMIENTO SELECCIONADO
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
  },
};
</script>

<style lang="sass">
</style>