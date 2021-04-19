<template>
  <div class="q-pa-md">
    <q-btn-dropdown
      color="yellow-10"
      style="border-radius: 0.5rem"
      label="Filtro"
      size="sm"
      dropdown-icon="change_history"
    >
      <q-list>
        <q-item clickable v-close-popup @click="onItemClick('Equipo')">
          <q-item-section avatar>
            <q-avatar icon="folder" color="blue-5" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline class="text-weight-bolder labelStyle"
              >Equipo</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick('Ubicacion')">
          <q-item-section avatar>
            <q-avatar icon="pin_drop" color="blue-5" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline class="text-weight-bolder labelStyle"
              >Ubicación</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick('Modelo')">
          <q-item-section avatar>
            <q-avatar icon="support" color="blue-6" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline class="text-weight-bolder labelStyle"
              >Modelo</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick('Marca')">
          <q-item-section avatar>
            <q-avatar icon="copyright" color="blue-7" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline class="text-weight-bolder labelStyle"
              >Marca</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="onItemClick('Numero de Serie')">
          <q-item-section avatar>
            <q-avatar icon="tag" color="blue-8" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline class="text-weight-bolder labelStyle"
              >No. Serie</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          @click="onItemClick('Equipos inactivos')"
        >
          <q-item-section avatar>
            <q-avatar icon="desktop_access_disabled" color="blue-8" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline class="text-weight-bolder labelStyle"
              >Equipos Inactivos</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          @click="onItemClick('Mantenimientos Pendientes')"
        >
          <q-item-section avatar>
            <q-avatar icon="event" color="blue-9" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline class="text-weight-bolder labelStyle"
              >Mantenimientos Pendientes</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          @click="onItemClick('Equipos Reportados')"
        >
          <q-item-section avatar>
            <q-avatar icon="report" color="blue-10" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label overline class="text-weight-bolder labelStyle"
              >Equipos Reportados Este Mes</q-item-label
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
      this.TypeSearch = val;
    },
  },
  computed: {
    TypeSearch: {
      get() {
        return this.$store.state.global.TypeSearch;
      },
      set(TypeSearch) {
        this.$store.commit("global/updateFilter", TypeSearch);
      },
    },
  },
  destroyed() {
    this.TypeSearch = "Equipo";
  },
};
</script>

<style lang="sass" scoped>
.btnFiltro
  border-radius: 0.2rem

.labelStyle
  font-size: 0.9rem
</style>