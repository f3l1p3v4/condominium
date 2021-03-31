<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <TicketsList @ticketSelected="setCurTicket"/>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
        <TicketDetails v-if="curTicket" :ticket="curTicket" />
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" :to="{ name: `new_ticket`, params: { formModel: newTicket } }" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import TicketsList from '../components/ticket/TicketsList'
import Ticket from '../models/Ticket'
import TicketDetails from '../components/ticket/TicketDetails'

export default {
  name: 'TicketListPage',
  data () {
    return {
      curTicket: null,
      newTicket: new Ticket()
    }
  },
  methods: {
    async setCurTicket (ticketObj) {
      const ticket = await Ticket.get(ticketObj.id)
      this.curTicket = ticket
    }
  },
  components: {
    TicketDetails,
    TicketsList
  }
}
</script>
