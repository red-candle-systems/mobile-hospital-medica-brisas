<template>
  <div>
    <q-btn
      label="Lista de Herramientas"
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
          <div class="text-h6">Lista de Herramientas</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh; width: 100%" class="scroll">
          <q-input
            color="blue"
            filled
            v-model="newTool"
            label="Descripcion de la Herramienta"
            style="width: 100%"
          >
            <template v-slot:prepend>
              <q-icon name="line_weight" />
            </template>
          </q-input>
          <br />
          <q-btn
            color="positive"
            class="float-right"
            @click="addNewAct(newTool)"
            push
            >Agregar</q-btn
          >
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-list bordered>
            <q-item
              clickable
              v-ripple
              v-for="(p, index) in herramientas"
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
          <q-btn flat label="Aceptar" color="blue" v-close-popup />
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
      newTool: "",
      herramientas: [],
    };
  },
  methods: {
    addNewAct(newTool) {
      if (this.newTool !== "") {
        this.herramientas.push(newTool);
        this.Herramientas = [...this.herramientas];
        this.newTool = "";
      } else {
        this.$q.notify({
          position: "bottom",
          timeout: 2500,
          textColor: "white",
          type: "warning",
          message: `Ingresa una Herramienta!!.`,
        });
      }
    },
    eliminar(index) {
      // //console.log(index);
      ////console.log(this.Pasos);
      this.herramientas.splice(index, 1);
      ////console.log(this.Pasos);
    },
  },
  computed: {
    Herramientas: {
      get() {
        return this.$store.state.global.Herramientas;
      },
      set(Herramientas) {
        this.$store.commit("global/updateHerramientas", Herramientas);
      },
    },
  },
};
</script>