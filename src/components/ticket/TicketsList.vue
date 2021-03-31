<template>
  <div class="q-gutter-y-md">
    <div class="row q-col-gutter-sm">
      <div class="col-12">
        <q-input
                v-model="filterTerms"
                debounce="500"
                outlined
                clearable
                placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <div class="col-xs-12">
<!--        <q-btn-toggle-->
<!--                v-model="filterType"-->
<!--                rounded-->
<!--                unelevated-->
<!--                spread-->
<!--                toggle-color="primary"-->
<!--                color="white"-->
<!--                text-color="primary"-->
<!--                :options="[-->
<!--          {label: 'Meus Chamados', value: 'mine'},-->
<!--          {label: 'Todos Chamados', value: 'all'}-->
<!--        ]"-->
<!--        />-->
      </div>
    </div>

    <q-list class="rounded-borders" >
      <q-item-label header>Chamados</q-item-label>

      <!--    <q-item clickable v-ripple v-for="ticket in getAllData" :key="ticket.id" @click="setCurTicket(ticket)">-->
      <q-item clickable v-ripple v-for="ticket in getAllData" :key="ticket.id" :to="{name: 'ticket', params: {id: ticket.id}}">
        <q-item-section avatar>
          <q-avatar>
            <q-icon name="fas fa-exclamation-circle" size="36px" :color="emergencyColor(ticket.emergency)" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{`[${ticket.ticketType.name}]`}} - <b>{{ticket.translatedStatus}}</b></q-item-label>
          <q-item-label caption lines="2">
            <span class="text-weight-bold">{{ticket.user.name}}</span>
            {{ticket.description}}
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          {{ticket.humanElapsedCreationTime}}
          <div class="row q-col-gutter-sm">
            <div class="col">
              <q-icon :name="statusIcon(ticket.status)" color="primary" size="sm" />
            </div>
            <div class="col">
              <q-icon name="far fa-meh" size="sm" color="black" />
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  name: 'TicketsList',
  data () {
    return {
      curTicket: null,
      filterType: 'mine',
      filterTerms: ''
    }
  },
  methods: {
    async setCurTicket (ticketObj) {
      this.curTicket = ticketObj
      this.$emit('ticketSelected', cloneDeep(this.curTicket))
    },
    emergencyColor (emergency) {
      switch (emergency?.toLowerCase()) {
        case 'low':
          return 'yellow-8'
        case 'intermediate':
          return 'orange-8'
        case 'high':
          return 'red-8'
        default:
          return 'gray'
      }
    },
    statusIcon (status) {
      switch (status?.toLowerCase()) {
        case 'new':
          return 'far fa-star'
        case 'in_attendance':
          return 'fas fa-star-half-alt'
        case 'closed':
          return 'fas fa-star'
        default:
          return 'far fa-star'
      }
    }
  },
  computed: {
    getAllData () {
      let res

      switch (this.filterType) {
        case 'mine':
          res = this.$store.getters['ticket/getData'].filter(ticket => ticket.user.id === this.userID)
          break
        case 'all':
          res = this.$store.getters['ticket/getData']
          break
        default:
          res = this.$store.getters['ticket/getData']
          break
      }

      if (this.filterTerms?.length >= 3) {
        res = res.filter(ticket => ticket.description?.toLowerCase().includes(this.filterTerms?.toLowerCase()))
      }

      return res
    },
    userID () {
      return this.$store.getters['auth/getID']
    }
  },
  beforeMount () {
    this.$store.dispatch('ticket/fetchFromAPI')
  }
}
</script>

<style scoped>

</style>
