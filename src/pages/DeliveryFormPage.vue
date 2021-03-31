<template>
  <q-page padding>
    <DeliveryForm :form-model="formModel" />
  </q-page>
</template>

<script>
import DeliveryForm from '../components/delivery/DeliveryForm.vue'
export default {
  name: 'DeliveryFormPage',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  components: {
    DeliveryForm
  }
}
</script>
