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
  updated() {
    this.herramientas = this.MantenimientoSelected[0].Herramientas;
    //console.log(this.MantenimientoSelected[0].Herramientas);
  },
  computed: {
    MantenimientoSelected: {
      get() {
        return this.$store.state.cardState.MantenimientoSelected;
      },
    },
  },
};
</script>