<template>
  <div class="q-pa-md divP">
    <div class="q-gutter-md row">
      <q-btn
        no-caps
        color="indigo-10"
        push
        icon="widgets"
        label="Menu"
        class="btnMenu"
      >
        <q-menu max-width="350px" fit class="z-max">
          <q-list class="listDetail">
            <q-item>
              <div class="row no-wrap">
                <div style="width: 80%" class="column">
                  <div class="text-h6 q-mb-md">Mi cuenta</div>
                  <div class="row">
                    <div class="col-8 divNightMode">
                      <p>Modo Oscuro</p>
                    </div>
                    <div class="col-4">
                      <VuexToggle></VuexToggle>
                    </div>
                  </div>
                </div>
                <q-separator vertical inset class="q-mx-lg" />
                <div class="column items-center">
                  <q-avatar size="72px">
                    <img :src="foto" />
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    {{ UsuarioActual }}
                  </div>

                  <q-btn
                    color="blue"
                    label="Logout"
                    @click="salir()"
                    push
                    size="sm"
                    v-close-popup
                  />
                </div>
              </div>
            </q-item>

            <q-separator />

            <q-item
              to="/Home"
              clickable
              v-if="Usuario.rol == 1 || Usuario.rol == 2"
              v-ripple
            >
              <q-item-section v-ripple>
                <q-item-label overline>EQUIPOS</q-item-label>
              </q-item-section>
            </q-item>

            <q-item @click="verUsuarios()" clickable v-ripple>
              <q-item-section v-ripple>
                <q-item-label overline>USUARIOS</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              v-if="Usuario.rol == 1 || Usuario.rol == 2"
              to="/StatisticsSection"
              clickable
              v-ripple
            >
              <q-item-section v-ripple>
                <q-item-label overline>INDICADORES</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              v-if="Usuario.rol == 1 || Usuario.rol == 2"
              @click="verCalendario()"
              clickable
              v-ripple
            >
              <q-item-section v-ripple>
                <q-item-label overline>CALENDARIO</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-if="Usuario.rol == 1 || Usuario.rol == 2"
              @click="verReportes()"
              clickable
              v-ripple
            >
              <q-item-section v-ripple>
                <q-item-label overline>TODOS LOS REPORTES</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-if="Usuario.rol == 1 || Usuario.rol == 2"
              @click="verMantenimientos()"
              clickable
              v-ripple
            >
              <q-item-section v-ripple>
                <q-item-label overline>TODOS LOS MANTENIMIENTOS</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script>
import VuexToggle from "../components/VuexToggle";

export default {
  components: {
    VuexToggle,
  },
  data() {
    return {
      UsuarioActual: "",
      foto: "https://cdn.quasar.dev/img/boy-avatar.png",
    };
  },
  created() {
    this.UsuarioActual = this.Usuario.name;
    this.foto = this.Usuario.Foto;
    //console.log("Este es el nombre", this.Usuario.name);
    //console.log(this.Usuario);
  },
  computed: {
    Usuario: {
      get() {
        return this.$store.state.global.Usuario;
      },
      set(Usuario) {
        this.$store.commit("global/updateUsuario", Usuario);
      },
    },
    Flags: {
      get() {
        return this.$store.state.global.Flags;
      },
      set(Flags) {
        this.$store.commit("global/updateFlags", Flags);
      },
    },
  },

  methods: {
    //Ver la lista completa de los usuarios
    verUsuarios() {
      try {
        if (
          this.$router.currentRoute.path != "/UserCards/" //Evitar error de ruta duplicada
        ) {
          //console.log(this.$router.currentRoute.path);
          this.$router.push({ path: `/UserCards/` });
        }
      } catch (error) {
        //console.log(error);
      }
    },
    //Cargar calendario con los mantenimientos programados
    verCalendario() {
      try {
        if (
          (this.Usuario.rol == 1 || this.Usuario.rol == 2) &&
          this.$router.currentRoute.path != "/Calendar/" //Evitar error de ruta duplicada
        ) {
          //console.log(this.$router.currentRoute.path);
          this.$router.push({ path: `/Calendar/` });
        }
        if (this.Usuario.rol == 3) {
          this.$q.notify({
            position: "bottom",
            timeout: 2500,
            textColor: "white",
            type: "warning",
            message: `No tienes los permisos para ver el Calendario`,
          });
          return;
        }
      } catch (error) {
        //console.log(error);
      }
    },
    //Cargar la lista de todos los reportes
    verReportes() {
      try {
        if (
          (this.Usuario.rol == 1 || this.Usuario.rol == 2) &&
          this.$router.currentRoute.path != "/ReportsSection/" //Evitar error de ruta duplicada
        ) {
          //console.log(this.$router.currentRoute.path);
          var Flags = {
            methods: {
              getAllReports: true,
            },
          };
          this.Flags = Flags;
          this.$router.push({ path: `/ReportsSection/` });
        }
        if (this.Usuario.rol == 3) {
          this.$q.notify({
            position: "bottom",
            timeout: 2500,
            textColor: "white",
            type: "warning",
            message: `No tienes los permisos para ver los reportes`,
          });
          return;
        }
      } catch (error) {
        //console.log(error);
      }
    },
    //Cargar la lista de todos los mantenimientos
    verMantenimientos() {
      try {
        if (
          (this.Usuario.rol == 1 || this.Usuario.rol == 2) &&
          this.$router.currentRoute.path != "/MaintenanceSection/" //Evitar error de ruta duplicada
        ) {
          //console.log(this.$router.currentRoute.path);
          this.$router.push({ path: `/MaintenanceSection/` });
        }
        if (this.Usuario.rol == 3) {
          this.$q.notify({
            position: "bottom",
            timeout: 2500,
            textColor: "white",
            type: "warning",
            message: `No tienes los permisos para ver los reportes`,
          });
          return;
        }
      } catch (error) {
        //console.log(error);
      }
    },
    //Salir (deslogueo)
    salir() {
      this.Usuario = {};
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="sass" scoped>
.divP
  margin-top: 0.4rem

.btnMenu
  margin-top: 0.8rem

.listDetail
  min-width: 100px

.divNightMode
  margin-top: 0.5rem
</style>