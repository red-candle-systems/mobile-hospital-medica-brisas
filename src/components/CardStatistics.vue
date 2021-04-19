<template>
  <div class="flex flex-center">
    <q-card class="my-card">
      <q-card-section>
        <div class="flex flex-center">
          <q-card-section horizontal>
            <div class="row" style="width: 60%">
              <q-item-label
                overline
                style="font-size: 0.9rem"
                class="col text-weight-bolder qItemLabelStyle"
                :class="drawerState ? 'clase-blanca' : 'clase-negra'"
                >{{ StatisticsLabel }}
              </q-item-label>
            </div>
            <q-knob
              readonly
              v-model="StatisticsValue"
              show-value
              size="90px"
              :thickness="0.22"
              color="orange"
              track-color="orange-3"
              class="text-orange q-ma-md"
              :max="100"
            />
          </q-card-section>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>

export default {
  data() {
    return {
      AtencionFalla: 0,
      ReemplazoDaño: 0,
      FallaRepentina: 0,
      MantenimientoVigente: 0,
      CumplirProgramados: 0,
    };
  },
  name: "StatisticsCard",

  props: {
    StatisticsValue: {
      type: Number,
      default: 0.0,
    },

    StatisticsLabel: {
      type: String,
      default: "",
    },
  },
  computed: {
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
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  height: 170px
  margin: -0.5rem 0rem -0.5rem 0rem

.clase-blanca
  color: white

.clase-negra
  color: dark
</style>