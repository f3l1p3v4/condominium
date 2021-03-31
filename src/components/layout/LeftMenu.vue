<template>
  <q-list>
    <div class="row q-pa-lg">
<!--      <q-img src="~assets/logo-agro2business@2x.png"/>-->
    </div>

    <div class="row justify-center">
      <q-btn flat rounded icon="fas fa-arrow-circle-left" label="Fechar" color="primary" @click="$store.commit('layout/TOGGLE_LEFT_DRAWER_STATE', false)"/>
    </div>

    <q-separator />

    <q-item-label header class="text-grey-8">Menu Principal</q-item-label>

    <!-- Dashboard -->
    <q-item clickable v-ripple to="/dashboard" v-if="$auth.can('showDashboardMenu')">
      <q-item-section avatar>
        <q-icon name="fas fa-home" />
      </q-item-section>

      <q-item-section>Dashboard</q-item-section>
    </q-item>

    <!-- Tickets List -->
    <q-item clickable v-ripple to="/tickets_list">
      <q-item-section avatar>
        <q-icon name="fas fa-book-open" />
      </q-item-section>

      <q-item-section>Chamados</q-item-section>
    </q-item>

    <!-- Common Area Reservations -->
    <q-item clickable v-ripple to="/common_area_reservations_calendar">
      <q-item-section avatar>
        <q-icon name="fas fa-book" />
      </q-item-section>

      <q-item-section>Reservas</q-item-section>
    </q-item>

    <!-- Events -->
    <q-item clickable v-ripple to="/events_calendar">
      <q-item-section avatar>
        <q-icon name="fas fa-calendar-day" />
      </q-item-section>

      <q-item-section>Calendário de Eventos</q-item-section>
    </q-item>

    <!-- Delivery -->
    <q-item clickable v-ripple to="/deliveries">
      <q-item-section avatar>
        <q-icon name="fas fa-truck" />
      </q-item-section>

      <q-item-section>Entregas</q-item-section>
    </q-item>

    <!-- Found -->
    <q-item clickable v-ripple to="/founds">
      <q-item-section avatar>
        <q-icon name="fas fa-tags" />
      </q-item-section>

      <q-item-section>Achados e Perdidos</q-item-section>
    </q-item>

    <!-- Management Menu -->
    <q-expansion-item :content-inset-level="0.3" group="management" icon="fas fa-briefcase"
                      label="Gerenciamento"
                      v-if="$auth.can('showManagementMenu')"
    >

      <!-- Tickets -->
      <q-item clickable v-ripple to="/tickets">
        <q-item-section avatar>
          <q-icon name="fas fa-book" />
        </q-item-section>

        <q-item-section>Chamados</q-item-section>
      </q-item>

      <!-- Tickets Types -->
      <q-item clickable v-ripple to="/ticket_types" v-if="$auth.can('showTicketTypesMenu')">
        <q-item-section avatar>
          <q-icon name="fas fa-folder-open" />
        </q-item-section>

        <q-item-section>Tipos de Chamado</q-item-section>
      </q-item>

      <!-- Common Areas -->
      <q-item clickable v-ripple to="/common_areas">
        <q-item-section avatar>
          <q-icon name="fas fa-tags" />
        </q-item-section>

        <q-item-section>Áreas Comuns</q-item-section>
      </q-item>

      <!-- Users -->
      <q-item clickable v-ripple to="/users">
        <q-item-section avatar>
          <q-icon name="fas fa-id-badge" />
        </q-item-section>

        <q-item-section>Usuários</q-item-section>
      </q-item>

      <!-- Condos -->
      <q-item clickable v-ripple to="/condos" v-if="$auth.can('showCondosMenu')">
        <q-item-section avatar>
          <q-icon name="fas fa-building" />
        </q-item-section>

        <q-item-section>Condomínios</q-item-section>
      </q-item>

      <!-- people -->
      <q-item clickable v-ripple to="/people">
        <q-item-section avatar>
          <q-icon name="fas fa-users" />
        </q-item-section>

        <q-item-section>Pessoas</q-item-section>
      </q-item>

      <!-- People Types -->
      <q-item clickable v-ripple to="/person_types">
        <q-item-section avatar>
          <q-icon name="fas fa-file" />
        </q-item-section>

        <q-item-section>Tipos de Pessoas</q-item-section>
      </q-item>

      <!-- Vehicle -->
      <q-item clickable v-ripple to="/vehicles">
        <q-item-section avatar>
          <q-icon name="fas fa-car" />
        </q-item-section>

        <q-item-section>Veículos</q-item-section>
      </q-item>

      <!-- People Types -->
      <q-item clickable v-ripple to="/events">
        <q-item-section avatar>
          <q-icon name="fas fa-calendar-day" />
        </q-item-section>

        <q-item-section>Eventos</q-item-section>
      </q-item>

      <!-- Pets -->
      <q-item clickable v-ripple to="/pets">
        <q-item-section avatar>
          <q-icon name="fas fa-paw" />
        </q-item-section>

        <q-item-section>Animais</q-item-section>
      </q-item>
      </q-expansion-item>
  </q-list>
</template>

<script>
export default {
  name: 'LeftMenu',
  computed: {
    userType () {
      return this.$store.getters['auth/getUserType']
    }
  }
}
</script>

<style scoped>

</style>
