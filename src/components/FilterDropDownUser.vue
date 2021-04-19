<template>
  <div style="margin: -0.2rem 0rem 0rem 0.3rem">
    <q-btn-dropdown
      color="yellow-10"
      style="border-radius: 0.5rem"
      label="Filtro"
      size="sm"
      dropdown-icon="filter_alt"
    >
      <q-list>
        <q-item clickable v-close-popup @click="onItemClick('Nombre')">
          <q-item-section avatar>
            <q-avatar icon="folder" color="blue-6" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline class="text-weight-bolder labelStyle"
              >Nombre</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick('Correo')">
          <q-item-section avatar>
            <q-avatar icon="assignment" color="blue-7" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline class="text-weight-bolder labelStyle"
              >Correo</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick('Telefono')">
          <q-item-section avatar>
            <q-avatar icon="assignment" color="blue-8" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline class="text-weight-bolder labelStyle"
              >Telefono</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick('Curp')">
          <q-item-section avatar>
            <q-avatar icon="assignment" color="blue-9" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline class="text-weight-bolder labelStyle"
              >Curp</q-item-label
            >
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    onItemClick(val) {
      //console.log("Clicked on an Item", val);
      this.TypeSearchUser = val;
    },
  },
  computed: {
    TypeSearchUser: {
      get() {
        return this.$store.state.global.TypeSearchUser;
      },
      set(TypeSearchUser) {
        this.$store.commit("global/updateFilterUser", TypeSearchUser);
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.btnFiltro
  border-radius: 0.2rem

.labelStyle
  font-size: 0.9rem
</style>