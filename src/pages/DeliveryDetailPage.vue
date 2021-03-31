<template>
  <q-page padding class="flex">
    <DeliveryDetails :id="id" />
  </q-page>
</template>

<script>
import DeliveryDetails from '../components/delivery/DeliveryDetails'

export default {
  name: 'DeliveyDetailPage',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  components: {
    DeliveryDetails
  }
}
</script>

<style scoped>

</style>
