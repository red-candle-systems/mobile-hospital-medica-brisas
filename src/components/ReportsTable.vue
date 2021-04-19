<template>
  <div>
    <q-table
      title="Lista de reportes"
      :data="data"
      :columns="columns"
      row-key="Fecha"
      style="width: 100%"
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
          :color="drawerState ? 'white' : 'primary'"
          track-color="light-blue"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" @click="SelectEquipo(props.row)">
          <q-td key="Reporte">
            <div class="my-table-details">
              {{ props.row.Reporte }}
            </div>
          </q-td>

          <q-td key="Fecha">
            <div class="my-table-details">
              {{ props.row.Fecha }}
            </div>
          </q-td>

          <q-td key="Dia">
            <div class="my-table-details">
              {{ props.row.Dia }}
            </div>
          </q-td>

          <q-td key="Status" :props="props">
            <q-btn-toggle
              v-model="props.row.Status"
              class="my-custom-toggle"
              no-caps
              rounded
              :disable="!props.row.Status"
              unelevated
              size="sm"
              toggle-color="primary"
              @click="ChangeStatus(props.row)"
              color="white"
              text-color="primary"
              :options="[
                { label: 'Pendiente', value: true },
                { label: 'Verificado', value: false },
              ]"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import service from "../apiservice/service.js";
export default {
  data() {
    return {
      alert: false,
      //variable que indica si están cargando los registros a la tabla aún
      loading: true,
      //Arreglo para generar las columnas en nuestra tabla
       initialPagination: {
        rowsPerPage: 50,
      },
      columns: [
        {
          Reporte: "Reporte",
          align: "left",
          label: "Reporte",
          field: "Reporte",
          sortable: true,
        },

        {
          Fecha: "Fecha",
          align: "left",
          label: "Año - Mes",
          field: "Fecha",
          sortable: true,
        },
        {
          name: "Dia",
          align: "left",
          label: "Dia - hora",
          field: "Dia",
          sortable: true,
        },

        {
          name: "Status",
          align: "left",
          label: "Estatus",
          field: "Status",
          sortable: true,
        },
      ],
      //Variable auxiliar para los registros que vendran de base de datos
      data: [],
    };
  },
  created() {
    //call getAll reports  method
    this._getReports();
  },

  methods: {
    //METODO QUE OBTIENE LOS REPORTES DESDE LA API
    async _getReports() {
      try {
        await this.$store.dispatch("cardState/getReportsByIdAction", this.IDEM);
        this.$data.data = this.Reportes;
      } catch (error) {
        this.$q.notify({
          color: "red",
          textColor: "white",
          icon: "search_off",
          message: "Error cargando los reportes para este equipo " + error,
        });
      }

      await this.data.forEach((row, index) => {
        row.index = index;
      });
      if (this.data.length == 0) {
        //quiere decir que aun no hay mantenimientos
        this.loading = false;
        this.$q.notify({
          color: "blue-10",
          textColor: "white",
          icon: "search_off",
          timeout: 1000,
          message: "Aun no hay reportes para este equipo",
        });
      } else {
        this.loading = false;
      }
    },
    //METODO QUE ACTUALIZA EL ESTADO DE UN REPORTE A UN VALOR CONTRARIO
    async ChangeStatus(Obj) {
      if (this.Usuario.rol == 1 || this.Usuario.rol == 2) {
        var ReporteActualizado = {
          Fecha: Obj.Fecha,
          Dia: Obj.Dia,
          Status: Obj.Status,
        };
        try {
          const response = await service.updateReport(ReporteActualizado);
          //console.log("TODO CORRECTO");
        } catch (error) {
          //console.log(error);
        }
      }
    },
    //METODO QUE SE MANDA LLAMAR SI PREIONA UN ITEM DE LA LISTA DE REPORTES
    SelectEquipo(Objreporte) {
      //verficar si el status del reporte es verificado o pendiente
      if (Objreporte.Status) {
        var reporte = Objreporte;

        var Flags = {
          reporte: reporte,
          lastRoute: this.$router.currentRoute.path,
        };
        this.Flags = Flags;

        this.$router.push({ path: "/MaintenanceCreate/" });
        this.$q.notify({
          color: "orange",
          textColor: "white",
          icon: "notification_important",
          message: `Deberías realizar un mantenimiento de tipo correctivo`,
        });
      }
    },
  },

  computed: {
    //STATE DE ID EQUIPO SELECCIONADO
    IDEM: {
      get() {
        return this.$store.state.cardState.IDEM;
      },
      set(IDEM) {
        this.$store.commit("cardState/updateIDEM", IDEM);
      },
    },

    //STATE DE USUARIO ACTUALMENTE LOGUEADO
    Usuario: {
      get() {
        return this.$store.state.global.Usuario;
      },
      set(Usuario) {
        this.$store.commit("global/updateUsuario", Usuario);
      },
    },

    //STATE DE FLAGS GLOBALES
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
        this.$store.commit("updateReportes", Reportes);
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

<style>
.my-table-details {
  font-size: 1em;
  font-style: italic;
  max-width: 100%;
  white-space: normal;
  margin-top: 4px;
}
</style>