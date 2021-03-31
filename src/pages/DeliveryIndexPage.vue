<template>
  <q-page class="flex">
    <DeliveryManager />
  </q-page>
</template>

<script>
import DeliveryManager from '../components/delivery/DeliveryManager'
export default {
  name: 'DeliveryIndexPage',
  components: { DeliveryManager }
}
</script>
