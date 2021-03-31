<template>
  <q-page padding>
    <VehicleForm :form-model="formModel" />
  </q-page>
</template>

<script>
import VehicleForm from '../components/vehicle/VehicleForm.vue'
export default {
  name: 'VehicleFormPage',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  components: {
    VehicleForm
  }
}
</script>
