<template>
  <q-page padding>
    <TicketTypeForm :form-model="formModel" />
  </q-page>
</template>

<script>
import TicketTypeForm from '../components/ticket_type/TicketTypeForm'
export default {
  name: 'TicketTypeFormPage',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  components: {
    TicketTypeForm
  }
}
</script>
