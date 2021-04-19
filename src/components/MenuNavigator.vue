<template>
  <div class="q-pa-md" style="margin-top: 0.4rem">
    <div class="q-gutter-md row">
      <q-btn
        color="indigo-10"
        push
        label="Menu"
        style="width: 100px; margin-top: 0.8rem"
      >
        <q-menu fit>
          <q-list style="min-width: 100px">
            <q-item>
              <div class="row no-wrap">
                <div class="column">
                  <div class="text-h6 q-mb-md">Mi cuenta</div>
                  <div class="row">
                    <div style="margin-top: 0.5rem" class="col-8">
                      <p>Modo Oscuro</p>
                    </div>
                    <div class="col-4">
                      <VuexToggle></VuexToggle>
                    </div>
                  </div>
                </div>
                <q-separator vertical inset class="q-mx-lg" />
                <div class="column items-center">
                  <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    {{ UsuarioActual }}
                  </div>

                  <q-btn
                    color="blue"
                    label="Logout"
                    to="/#"
                    push
                    size="sm"
                    v-close-popup
                  />
                </div>
              </div>
            </q-item>

            <q-separator />
            <q-item to="/UserCards" clickable v-ripple>
              <q-item-section  v-ripple>
                <q-item-label overline>USUARIOS</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Home" clickable v-ripple>
              <q-item-section v-ripple>
                <q-item-label overline>EQUIPOS</q-item-label>
              </q-item-section>
            </q-item>
            <q-item to="/Statistics" clickable v-ripple>
              <q-item-section v-ripple>
                <q-item-label overline>INDICADORES</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script>
import VuexToggle from "../components/VuexToggle";

export default {
  components: {
    VuexToggle,
  },
  data() {
    return {
      UsuarioActual: "",
    };
  },
  created() {
    this.UsuarioActual = this.Usuario;
  },
  computed: {
    Usuario: {
      get() {
        return this.$store.state.global.Usuario;
      },
    },
  },
};
</script>