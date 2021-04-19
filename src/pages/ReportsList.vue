<template>
  <div class="q-pa-md">
    <q-layout id="q-app-2" view="lHh Lpr lFf">
      <q-header
        class="glossy"
        style="height: 150px; border-radius: 0 0 1rem 1rem"
        :class="drawerState ? ' bg-Mycolor' : 'bg-primary'"
      >
        <q-toolbar class="justify-center">
          <q-img
            basic
            class="shadow-7"
            src="../assets/logo2.jpg"
            style="
              margin-top: 0.5rem;
              height: 60px;
              width: 100%;
              border-radius: 0.5rem;
            "
          ></q-img>
          <div class="fixed-top-right">
            <UserAccount></UserAccount>
          </div>
        </q-toolbar>
        <div class="row">
          <div class="col-md-2 col-2">
            <q-img
              basic
              src="../statics/logo.png"
              style="
                height: 4.1rem;
                width: 4.1rem;
                margin: 0.4rem;
                border-radius: 0.5rem;
              "
              class="fixed-top-left"
            />
            <q-btn
              to="/Home"
              style="
                height: 4.1rem;
                width: 4.1rem;
                margin: 0.4rem;
                border-radius: 0.5rem;
              "
              class="fixed-top-left"
            ></q-btn>
          </div>
          <div class="col-12" style="text-align: center; margin-top: -0.8rem">
            <h5
              style="
                padding: 0.5rem;
                margin: 2rem 1rem 0rem 1rem;
                border-radius: 0.5rem;
                background-color: #193d5c;
              "
            >
              Reportes
            </h5>
          </div>
        </div>
      </q-header>
      <q-page-container>
        <ReportsTable />
        <br />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import UserAccount from "../components/UserAccount";
import ReportsTable from "../components/ReportsTable";

export default {
  name: "EquipmentDetail",

  components: {
    UserAccount,
    ReportsTable,
  },

  data() {
    return {
      leftDrawerOpen: false,
      alert: false,
      seleccionado: 0,
      home: false,
      basic: false,
      fixed: false,
      reporte: "",
    };
  },
  methods: {
    MaintenanceCreate() {
      if (this.Usuario.rol == 1 || this.Usuario.rol == 2) {
        this.$router.push({ path: `/MaintenanceCreate/` });
      }
      if (this.Usuario.rol == 3) {
        this.$q.notify({
          position: "bottom",
          timeout: 2500,
          textColor: "white",
          type: "warning",
          message: `No tienes los permisos para crear un Mantenimiento`,
        });
        return;
      }
    },
    obtenerSeleccionado() {
      if (this.Usuario.rol == 1 || this.Usuario.rol == 2) {
        // if (this.ReportSelected.length > 0) {
        this.fixed = true;
        this.reporte = this.ReportSelected[0].Reporte;
        // }
        if (this.ReportSelected.length === 0) {
          this.$q.notify({
            position: "bottom",
            timeout: 2500,
            textColor: "white",
            color: "yellow-10",
            message: `Seleccione un mantenimiento de la lista!!`,
          });
        }
      }
      if (this.Usuario.rol == 3) {
        this.$q.notify({
          position: "bottom",
          timeout: 2500,
          textColor: "white",
          color: "yellow-10",
          message: `No tienes los permisos para ver un Mantenimiento`,
        });
        return;
      }
    },
  },
  computed: {
    ReportSelected: {
      get() {
        return this.$store.state.cardState.ReportSelected;
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
