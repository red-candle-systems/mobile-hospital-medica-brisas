<template>
  <div>
    <div class="column" style="width: 100%">
      <q-toolbar class="text-white rounded-borders">
        <q-space />
        <q-input
          :disable="Equipos.length === 0"
          dark
          standout
          v-model="text"
          style="width: 100%; margin-left: -2rem"
          :label="'Buscar por ' + this.$store.state.global.TypeSearch"
          class="shadow-9"
          @keyup="searchBy"
        >
          <template v-slot:append>
            <q-icon @click="searchBy" name="search" />
            <q-icon @click="borrarYrefrescar" v-if="text !== ''" name="clear" />
            <FilterDropDown />
          </template>
        </q-input>
      </q-toolbar>
    </div>
  </div>
</template>
<script>
import FilterDropDown from "components/FilterDropDown";

export default {
  components: {
    FilterDropDown,
  },

  data() {
    return {
      text: "", //v-model del input de buscar
      IDSEQUIPOS: [], //ID DE LOS EQUIPOS QUE TIENEN UN REPORTE,
      cargar: false,
    };
  },

  methods: {
    //Metodo de buscar por lo que el filter deropdown diga + el v-model del input de buscar
    async searchBy() {
      this.Equipos = this.EquiposAux;
      //console.log(this.Equipos);
      var equipments = [];
      if (
        this.text != "" &&
        this.text != "Equipos Reportados" &&
        this.text != "Mantenimientos Pendientes" &&
        this.text != "Equipos inactivos"
      ) {
        if (this.$store.state.global.TypeSearch === "Marca") {
          equipments = this.Equipos.filter((e) =>
            this.textoSimple(e.Marca).includes(
              this.textoSimple(this.$data.text)
            )
          );
        }
        if (this.$store.state.global.TypeSearch === "Equipo") {
          equipments = this.Equipos.filter((e) =>
            this.textoSimple(e.Nombre_Equipo).includes(
              this.textoSimple(this.$data.text)
            )
          );
        }
         if (this.$store.state.global.TypeSearch === "Ubicacion") {
          equipments = this.Equipos.filter((e) =>
            this.textoSimple(e.Ubicacion).includes(
              this.textoSimple(this.$data.text)
            )
          );
        }
        if (this.$store.state.global.TypeSearch === "Modelo") {
          equipments = this.Equipos.filter((e) =>
            e.Modelo.toLowerCase().includes(this.$data.text.toLowerCase())
          );
        }
        if (this.$store.state.global.TypeSearch === "Numero de Serie") {
          equipments = this.Equipos.filter((e) =>
            e.No_Serie.toLowerCase().includes(this.$data.text.toLowerCase())
          );
        }
        //Si no hay ningun equipo encontrado
        if (equipments.length === 0) {
          //Si tampoco encontró en la api, entonces decimos que no encontró
          this.$q.notify({
            color: "blue-10",
            textColor: "white",
            icon: "search_off",
            message:
              "No se ha encontrado ningún Equipo, revisa si no hay equipos por cargar",
          });
          this.text = "";
        } else {
          this.Equipos = equipments;
        }
      } else {
        this.Equipos = this.EquiposAux;
      }
      if (this.$store.state.global.TypeSearch === "Equipos Reportados") {
        for (var i = 0; i < this.Equipos.length; i++) {
          if (this.IDSEQUIPOS.includes(this.Equipos[i].ID_Equipo)) {
            equipments.push(this.Equipos[i]);
          }
        }
        if (this.IDSEQUIPOS.length > 0) this.Equipos = equipments;
        else {
          this.$q.notify({
            color: "blue-10",
            textColor: "white",
            icon: "search_off",
            message: "No se ha encontrado ningún Equipo reportado",
          });
        }
      }
      if (this.$store.state.global.TypeSearch === "Equipos inactivos") {
        for (var i = 0; i < this.Equipos.length; i++) {
          if (this.Equipos[i].Estado_Servicio == false) {
            equipments.push(this.Equipos[i]);
          }
        }
        if (equipments.length == 0) {
          this.$q.notify({
            color: "blue-10",
            textColor: "white",
            icon: "search_off",
            message: "No se ha encontrado ningún Equipo inactivo",
          });
          equipments = this.EquiposAux;
        }
        else{
          this.Equipos = equipments
        }
      }
      if (this.$store.state.global.TypeSearch === "Mantenimientos Pendientes") {
        var f = new Date();

        await this.Equipos.forEach((element) => {
          if (
            (element.Siguiente_Mantenimiento != " " &&
              parseInt(element.Siguiente_Mantenimiento.slice(0, 4)) <=
                f.getFullYear() &&
              parseInt(element.Siguiente_Mantenimiento.slice(5, 7)) <=
                f.getMonth() + 1 &&
              parseInt(element.Siguiente_Mantenimiento.slice(8, 10)) <=
                f.getDate()) ||
            (parseInt(element.Siguiente_Mantenimiento.slice(0, 4)) <=
              f.getFullYear() &&
              parseInt(element.Siguiente_Mantenimiento.slice(5, 7)) <
                f.getMonth() + 1 &&
              parseInt(element.Siguiente_Mantenimiento.slice(8, 10)) >
                f.getDate()) ||
            parseInt(element.Siguiente_Mantenimiento.slice(0, 4)) <
              f.getFullYear()
          ) {
            equipments.push(element);
          }
        });
        if (equipments.length > 0) this.Equipos = equipments;
        else {
          this.$q.notify({
            color: "blue-10",
            textColor: "white",
            icon: "search_off",
            message: "No se ha encontrado ningún mantenimiento pendiente",
          });
        }
      }
    },
    //metodo para quitar los acentos y para convertir en mayuscula
    textoSimple(str) {
      const Original = "ÁáÉéÍíÓóÚúñÜüabcdefghijklmnopqrstuvwxyz";
      const Cambio = "AAEEIIOOUUÑUUABCDEFGHIJKLMNOPQRSTUVWXYZ";

      if (str == null) {
        return null;
      }
      let arreglo = str.split("");
      for (let i = 0; i < arreglo.length; i++) {
        for (let j = 0; j < Original.length; j++) {
          if (arreglo[i] == Original.charAt(j)) {
            arreglo[i] = Cambio.charAt(j);
            break;
          }
        }
      }
      return arreglo.join("");
    },

    //FUNCION DEL ICONO DE BORRAR SI HAY TEXTO Y ACTUALIZAR SI NO LO HAY
    borrarYrefrescar() {
      this.$store.commit("global/updateFilter", "Equipo"); //Ebvitar error de "VUEX DO NOT MUTATE STORE OUT OF HANDLERS"
      this.text = "";
      this.Equipos = this.EquiposAux;
    },
  },
  //PARA PONER EN text (principal valor del input de buscar) DEL SEARCH LO QUE TIENE EL FILTERDROPDPOWN ACTUALMENTE
  created() {
    this.cargarReportes;
    //Usamos el state de la ultima ruta para ver si tenemos que cargar de la api o mejor de state
    if (this.Equipos.length == 0) {
      this._getEquipos;
      this.Flags.currentRoute = "";
    } else {
      this.Equipos = this.EquiposAux;
      //console.log("Busca en el state");
    }
  },
  //PARA PONER EN text (principal valor del input de buscar) DEL SEARCH LO QUE TIENE EL FILTERDROPDPOWN ACTUALMENTE
  updated() {
    this.cargarReportes;
    if (this.$store.state.global.TypeSearch === "Equipos Reportados") {
      this.text = "Equipos Reportados";
    }
    if (this.$store.state.global.TypeSearch === "Mantenimientos Pendientes") {
      this.text = "Mantenimientos Pendientes";
    }
  },
  //SI HUBO UN SETEO AL STATE QUE DISMINUYA LOS EQUIPOS, LOS VUELVO A LLENAR DESDE MI ARREGLO AUXILIAR CUNADO SE DESTRUYE EL COMPONENTE
  destroyed() {
    this.Equipos = this.EquiposAux;
  },
  computed: {
    //Cragamos la lista de los reportes y los iteramos para ver cual tieene los states en true para obtener el id del equipo con un reporte
    cargarReportes() {
      this.Reportes.forEach((e) => {
        if (e.Status) this.IDSEQUIPOS.push(e.ID_Equipo);
      });
    },
    //METODO OBTENER TODOS LOS EQUIPOS DESDE LA API
    async _getEquipos() {
      await this.$store.dispatch("cardState/getEquipmentsAction");
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
    //STATE DE LOS EQUIPOS auxiliares
    EquiposAux: {
      get() {
        return this.$store.state.cardState.EquiposAux;
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
    //STATE DE FLAGS GLOBALES
    Flags: {
      get() {
        return this.$store.state.global.Flags;
      },
      set(Flags) {
        this.$store.commit("global/updateFlags", Flags);
      },
    },
  },
};
</script>