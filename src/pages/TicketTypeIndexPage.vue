<template>
  <q-page class="flex">
    <TicketTypeManager />
  </q-page>
</template>

<script>
import TicketTypeManager from '../components/ticket_type/TicketTypeManager'
export default {
  name: 'TicketIndexPage',
  components: { TicketTypeManager }
}
</script>

<style scoped>

</style>
