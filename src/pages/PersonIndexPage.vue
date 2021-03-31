<template>
  <q-page class="flex">
    <PersonManager />
  </q-page>
</template>

<script>
import PersonManager from '../components/person/PersonManager'
export default {
  name: 'PersonIndexPage',
  components: { PersonManager }
}
</script>
