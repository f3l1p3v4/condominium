<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 q-mt-md">
        <EventCalendar />
      </div>
    </div>
  </q-page>
</template>

<script>
import EventCalendar from 'components/event/EventCalendar'
export default {
  name: 'EventCalendarPage',
  data () {
    return {
    }
  },
  components: {
    EventCalendar
  }
}
</script>

<style scoped>

</style>
