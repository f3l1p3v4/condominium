<template>
  <q-page padding>
    <NewCommonAreaReservation />
  </q-page>
</template>

<script>
import NewCommonAreaReservation from 'components/common_area/NewCommonAreaReservation'

export default {
  name: 'NewCommonAreaReservationPage',
  data () {
    return {
      selectedArea: '',
      areas: []
    }
  },
  components: {
    NewCommonAreaReservation
  }
}
</script>

<style scoped>

</style>
