<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <DeliveryList @ticketSelected="setCurTicket"/>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
        <DeliveryDetails v-if="curDelivery" :ticket="curDelivery" />
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" :to="{ name: `new_delivery`, params: { formModel: newDelivery } }" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import DeliveryList from '../components/delivery/DeliveryList'
import Delivery from '../models/Delivery'
import DeliveryDetails from '../components/delivery/DeliveryDetails'

export default {
  name: 'TicketListPage',
  data () {
    return {
      curDelivery: null,
      newDelivery: new Delivery()
    }
  },
  methods: {
    async setCurTicket (deliveryObj) {
      const delivery = await Delivery.get(deliveryObj.id)
      this.curDelivery = delivery
    }
  },
  components: {
    DeliveryDetails,
    DeliveryList
  }
}
</script>
