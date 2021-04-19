<template>
  <div>
    <q-btn
      label="Lista de Actividades"
      style="height: 54px; width: 100%"
      unelevated
      text-color="white"
      color="blue-10"
      transparent
      @click="[(fixed = true)]"
    />
    <q-dialog v-model="fixed">
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-h6">Lista de Actividades</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh; width: 100%" class="scroll">
          <q-input
            color="blue"
            filled
            v-model="newActivity"
            label="Descripcion de a Actividad"
            style="width: 100%"
          >
            <template v-slot:prepend>
              <q-icon name="line_weight" />
            </template>
          </q-input>
          <br />
          <q-btn color="positive" class="float-right" @click="addNewAct" push
            >Agregar</q-btn
          >
        </q-card-section>
        <q-separator />
        <q-card-section>
          <q-list bordered>
            <q-item
              clickable
              v-ripple
              v-for="(p, index) in actividades"
              :key="index"
            >
              <q-item-section avatar>{{ index }}</q-item-section>
              <q-item-section>{{ p }}</q-item-section>
              <q-item-section avatar>
                <q-btn size="sm" color="white" @click="eliminar(index)">
                  <q-icon name="delete" color="red" />
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Quitar" color="blue" v-close-popup />
          <q-btn flat label="Acceptar" color="blue" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      basic: false,
      fixed: false,
      newActivity: "", //String de la nueva actividad a agregar a el arreglo
      actividades: [], //Arreglo de las actividades
    };
  },
  methods: {
    //Metodo de agregar una nueva activodad a el arreglo de actividades
    addNewAct() {
      if (this.newActivity !== "") {
        this.actividades.push(this.newActivity);
        this.Actividades = [...this.actividades];
        this.newActivity = "";
      } else {
        this.$q.notify({
          position: "bottom",
          timeout: 2500,
          textColor: "white",
          type: "warning",
          message: `Ingresa una actividad!!.`,
        });
      }
    },
    eliminar(index) {
      // //console.log(index);
      ////console.log(this.Pasos);
      this.actividades.splice(index, 1);
      ////console.log(this.Pasos);
    },
  },
  computed: {
    //STATE DEL ARREGLO DE ACTIVIDADES
    Actividades: {
      get() {
        return this.$store.state.global.Actividades;
      },
      set(Actividades) {
        this.$store.commit("global/updateActividades", Actividades);
      },
    },
  },
};
</script>