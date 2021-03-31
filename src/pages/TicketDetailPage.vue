<template>
  <q-page padding class="flex">
    <TicketDetails :id="id" />
  </q-page>
</template>

<script>
import TicketDetails from '../components/ticket/TicketDetails'
export default {
  name: 'TicketDetailPage',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  components: {
    TicketDetails
  }
}
</script>

<style scoped>

</style>
