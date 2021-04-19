<template>
  <div class="q-pa-md">
    <div
      style="width: 100%"
      class="row q-col-gutter-x-xs q-col-gutter-y-lg justify-center"
    >
      <div style="width: 108px" v-for="(i, index) in items" :key="index">
        <q-btn
          :color="drawerState ? 'grey-9' : 'green-' + i.Color" 
          style="width: 100%; margin-bottom: -0.7rem"
          align="between"
          class="btn-fixed-width"
          icon="engineering"
          @click="verReportsTable(i)"
        >
          {{ i.Nombre }} - {{ i.Anio }}
        </q-btn>
      </div>
    </div>
  </div>
</template>
 

<script>
var meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function convertir(numeroMes) {
  if (!isNaN(numeroMes) && numeroMes >= 1 && numeroMes <= 12) {
    return meses[numeroMes - 1];
  }
}

export default {
  data() {
    return {
      items: [],
      totalDias: 0,
    };
  },

  created() {
    let fecha1 = new Date("2021/04/01"); //Fecha de inicio 2020
    let fecha2 = new Date(); //Fecha de hoy

    console.log("este es el mes", fecha2.getMonth());

    let mes = fecha2.getMonth() + 1;
    let desc = false;
    let color = 6;

    for (let i = fecha2.getFullYear(); i >= fecha1.getFullYear() + 1; i--) {
      for (let j = mes; j >= 1; j--) {
        if (color == 10 && desc == false) {
          desc = true;
          color--;
        } else if (color < 10 && desc == false) {
          color++;
          if (color == 10) {
            desc = false;
          }
        } else if (color == 6 && desc) {
          desc = false;
          color++;
        } else {
          color--;
          if (color == 6) {
            desc = true;
          }
        }

        let obj = {
          Nombre: convertir(j),
          Anio: i,
          Color: color, //color
          Mes: j,
        };
        this.items.push(obj);
      }
      mes = 12;
    }
    console.log(this.items);
    for (let j = mes; j > fecha1.getMonth(); j--) {
      if (color == 10 && desc == false) {
        desc = true;
        color--;
      } else if (color < 10 && desc == false) {
        color++;
        if (color == 10) {
          desc = false;
        }
      } else if (color == 6 && desc) {
        desc = false;
        color++;
      } else {
        color--;
        if (color == 6) {
          desc = true;
        }
      }

      let obj = {
        Nombre: convertir(j),
        Anio: fecha1.getFullYear(),
        Color: color,
        Mes: j,
      };
      this.items.push(obj);
    }
  },

  methods: {
    verReportsTable(item) {
      console.log(item.Mes.toString().length);
      if (item.Mes.toString().length == 1) {
        item.Mes = "0" + item.Mes.toString();
      }
      var obj = {
        Mes: item.Mes,
        Año: item.Anio,
      };

      console.log("Este es el objt", obj);
      this.ReportSectionSelected = obj;

      this.$router.push({ path: "/ReportsList" });
    },
  },
  computed: {
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
    //STATE DE LA FECHA ACTUAL DE UNA SECCION DE UN MANTENIMIENTO SELECCIONADO
    ReportSectionSelected: {
      get() {
        return this.$store.state.cardState.ReportSectionSelected;
      },
      set(ReportSectionSelected) {
        this.$store.commit(
          "cardState/updateReportSectionSelected",
          ReportSectionSelected
        );
      },
    },
  },
};
</script>
