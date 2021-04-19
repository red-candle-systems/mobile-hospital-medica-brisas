<template>
  <div>
    <q-splitter
      v-model="splitterModel"
      horizontal
      style="height: 100%; margin-bottom: 3rem"
    >
      <template v-slot:before>
        <div class="q-pa-md" style="width: 100%">
          <q-date
            :color="drawerState ? 'blue-10' : 'light-blue-10'"
            style="width: 100%; max-width: 30rem"
            v-model="date"
            :events="Eventos"
            event-color="orange-10"
          />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="date"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel :name="comparar">
            <div
              class="text-h4 q-mb-md"
              :class="drawerState ? 'text-blue-10' : 'text-light-blue-10'"
            >
              {{ date }}
            </div>
            <GridCards style="margin-top: 2rem; margin-bottom: 3rem" />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
import GridCards from "./GridCards.vue";

export default {
  components: {
    GridCards,
  },
  data() {
    return {
      splitterModel: 50,
      date: "",
      Eventos: [],
      Equipments: [],
    };
  },
  created() {
    setTimeout(this.cargarState, 1);
    //console.log("created", this.Equipos);
    this.Flags.currentRoute = "/Calendar";
  },
  destroyed() {
    //Volvemos a llenar el state de los equipos con los equipos auxiliares
    this.Equipos = this.EquiposAux;
  },

  methods: {
    //Formatear fecha a año mes dia
    formato(texto) {
      return texto.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$1/$2/$3");
    },
  },
  computed: {
    //Encontramos las fechas coincidentes con la fecha seleccionada actualmente en ele calendario
    comparar() {
      const even = (element) => element === this.date;
      if (this.Eventos.some(even)) {
        this.Equipos = this.EquiposAux;
        this.Equipments = [];
        for (var i = 0; i < this.Equipos.length; i++) {
          if (
            this.formato(this.Equipos[i].Siguiente_Mantenimiento) == this.date
          ) {
            this.Equipments.push(this.Equipos[i]);
          }
        }
        //console.log("Equipo coincidente", this.Equipments);
        this.Equipos = this.Equipments;
        return this.date;
      } else {
        return;
      }
      // expected output: true
    },
    //metodo de inicializacion de las variables globales necesarias
    cargarState() {
      this.Equipos = this.EquiposAux;
      this.Equipments = this.EquiposAux;
      this.date =
        new Date().getFullYear().toString() +
        "-" +
        new Date().getMonth() +
        "-" +
        new Date().getDate().toString();

      //console.log(this.date);
      //buscamos solo las fechas de los equipos
      for (var i = 0; i < this.Equipos.length; i++) {
        //console.log(this.Equipos[i].Siguiente_Mantenimiento);
        if (this.Equipos[i].Siguiente_Mantenimiento != " ") {
          //EVITO ERROR DE FECHAS VACIAS
          this.Eventos.push(
            this.formato(this.Equipos[i].Siguiente_Mantenimiento)
          );
        }
      }

      var f = new Date();
      var equipments = [];
      this.Equipos.forEach((element) => {
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

      if (equipments.length > 0)
        this.$q.notify({
          color: "orange-10",
          textColor: "white",
          timeout: 1000,
          icon: "warning",
          position: 'center',
          message:
            "Hay " +
            `${equipments.length}` +
            " equipos con mantenimienros pendientes",
        });
    },
    //state del modo oscuro
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
    //STATE DE FLAGS GLOBALES
    Flags: {
      get() {
        return this.$store.state.global.Flags;
      },
      set(Flags) {
        this.$store.commit("global/updateFlags", Flags);
      },
    },
    //STATE DE LOS EQUIPOS AUXILIOARES
    EquiposAux: {
      get() {
        return this.$store.state.cardState.EquiposAux;
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
  },
};
</script>