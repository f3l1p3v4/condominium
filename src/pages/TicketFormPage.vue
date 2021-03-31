<template>
  <q-page padding>
    <TicketForm :form-model="formModel" />
  </q-page>
</template>

<script>
import TicketForm from '../components/ticket/TicketForm.vue'
export default {
  name: 'CondoFormPage',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  components: {
    TicketForm
  }
}
</script>
