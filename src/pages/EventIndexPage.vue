<template>
  <q-page class="flex">
    <EventManager />
  </q-page>
</template>

<script>
import EventManager from '../components/event/EventManager'
export default {
  name: 'EventIndexPage',
  components: { EventManager }
}
</script>
