<template>
  <q-toolbar class="bg-primary text-white">
    <q-btn
            flat
            dense
            round
            @click="$store.commit('layout/TOGGLE_LEFT_DRAWER_STATE')"
            icon="menu"
            aria-label="Menu"
    />

    <q-toolbar-title>
      RESOLVA
    </q-toolbar-title>

    <q-btn-dropdown color="primary"
                    :label="username"
                    unelevated
    >
      <q-list>
        <q-item clickable v-close-popup @click="logout">
          <q-item-section avatar>
            <q-icon name="fas fa-sign-out-alt"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>Sair</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </q-toolbar>
</template>

<script>
export default {
  name: 'TopToolbar',
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$store.commit('auth/RESET_SESSION_DATA')
      this.$router.push({ name: 'login' })
    }
  },
  computed: {
    username () {
      return this.$store.getters['auth/getName']
    }
  },
  components: {
  }
}
</script>

<style scoped>
</style>
