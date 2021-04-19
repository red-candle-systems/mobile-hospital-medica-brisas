<template>
  <div>
    <q-btn
      label="Lista de Materiales"
      style="height: 54px; width: 100%"
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

        <q-card-section style="max-height: 50vh; width: 100%" class="scroll">
          <q-input
            color="blue"
            v-model="material"
            filled
            label="Material"
            style="width: 100%"
          >
            <template v-slot:prepend>
              <q-icon name="line_weight" />
            </template>
          </q-input>
          <br />
          <q-input
            color="blue"
            v-model="cantidad"
            filled
            label="Cantidad"
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
            @click="addNewMaterial"
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
              v-for="(p, index) in materiales"
              :key="index"
            >
              <q-item-section avatar>{{ p.Cantidad }}</q-item-section>
              <q-item-section>{{ p.Material }}</q-item-section>
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
      materialobj: {},
      material: "",
      cantidad: "",
      materiales: [],
    };
  },
  methods: {
    addNewMaterial() {
      if (this.material !== "" && this.cantidad !== "") {
        this.materialobj.Material = this.material;
        this.materialobj.Cantidad = this.cantidad;
        this.materiales.push(this.materialobj);
        //console.log(this.materialobj);
        //console.log(this.materiales);
        this.materialobj = {};
        /////////////////////////////////////
        this.Materiales = [...this.materiales];
        this.material = "";
        this.cantidad = "";
        //console.log("state", this.Materiales);
        ////console.log(this.Materiales);
      } else {
        this.$q.notify({
          position: "bottom",
          timeout: 2500,
          textColor: "white",
          type: "warning",
          message: `Ingresa correctamente el Material y la Cantidad`,
        });
      }
    },
    eliminar(index) {
      // //console.log(index);
      ////console.log(this.Pasos);
      this.materiales.splice(index, 1);
      ////console.log(this.Pasos);
    },
  },
  computed: {
    Materiales: {
      get() {
        return this.$store.state.global.Materiales;
      },
      set(Materiales) {
        this.$store.commit("global/updateMateriales", Materiales);
      },
    },
  },
};
</script>