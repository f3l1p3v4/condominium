<template>
  <q-page padding>
    <EventForm :form-model="formModel" />
  </q-page>
</template>

<script>
import EventForm from '../components/event/EventForm.vue'
export default {
  name: 'EventFormPage',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  components: {
    EventForm
  }
}
</script>
