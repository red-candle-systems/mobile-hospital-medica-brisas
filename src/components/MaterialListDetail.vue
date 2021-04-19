<template>
  <div>
    <q-btn
      label="Lista de Materiales"
      class="btnMaterialList"
      unelevated
      text-color="white"
      color="blue-10"
      @click="[(fixed = true)]"
    />

    <q-dialog v-model="fixed">
      <q-card style="width: 100%">
        <q-card-section>
          <div class="text-h6">Lista de Materiales</div>
        </q-card-section>

        <q-separator />
        <q-card-section>
          <q-list bordered>
            <q-item
              clickable
              v-ripple
              v-for="(p, index) in Materiales"
              :key="index"
            >
              <q-item-section avatar>{{ p.Cantidad }}</q-item-section>
              <q-item-section>{{ p.Material }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Aceptar" color="primary" v-close-popup />
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
      Num: 10,
      Cantidades: [],
      Materiales: [],
    };
  },
  updated() {
    //console.log(this.MantenimientoSelected[0].Descripcion)
    this.Materiales = this.MantenimientoSelected[0].Materiales;
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

<style lang="sass" scoped>
.btnMaterialList
  height: 54px
  width: 100%
</style>