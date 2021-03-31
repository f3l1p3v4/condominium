<template>
  <div class="q-gutter-y-lg">
    <div class="row">
      <div class="col-12">
        <FullCalendar :options="calendarOptions"/>
      </div>
    </div>

    <q-dialog v-model="detailModal" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{detailEvent.title}}</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <p class="text-bold">Início: {{detailEvent.start}} </p>
          <p class="text-bold">Descrição: {{detailEvent.description}} </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Event from 'src/models/Event'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import ptBRLocale from '@fullcalendar/core/locales/pt-br'
import { date } from 'quasar'

export default {
  name: 'EventCalendar',
  data () {
    return {
      detailModal: false,
      detailEvent: {}
    }
  },
  methods: {
    eventClick (e) {
      const start = date.formatDate(e?.event?.start, 'DD/MM/YYYY HH:mm')
      const end = date.formatDate(e?.event?.end, 'DD/MM/YYYY HH:mm')
      const description = e.event.extendedProps?.description

      this.detailEvent = { title: e?.event?.title, start: start, end: end, description: description }
      this.detailModal = true
    }
  },
  computed: {
    columnCount () {
      if (this.$q.screen.lt.md) {
        return 3
      } else if (this.$q.screen.md) {
        return 5
      } else {
        return 7
      }
    },
    calendarOptions () {
      return {
        plugins: [dayGridPlugin, timeGridPlugin],
        events: async (info, successCallback, failureCallback) => {
          const feed = await Event.getAll({ start: info?.startStr, end: info?.endStr })
          const parsedEvents = feed.map(event => {
            return {
              id: event.id,
              start: event.date,
              extendedProps: {
                description: event.description
              },
              title: event.title
            }
          })
          successCallback(parsedEvents)
        },
        eventClick: this.eventClick,
        slotMinTime: '06:00:00',
        // titleFormat: { year: 'numeric', month: 'numeric', day: 'numeric' },
        headerToolbar: { start: this.$q.screen.lt.md ? '' : 'title' },
        eventTimeFormat: {
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: 'narrow'
        },
        initialView: 'dayGrid',
        duration: { days: this.columnCount },
        eventDisplay: 'block',
        locale: ptBRLocale
      }
    }
  },
  components: {
    FullCalendar
  }
}
</script>

<style scoped>

</style>
