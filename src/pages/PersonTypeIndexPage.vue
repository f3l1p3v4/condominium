<template>
  <q-page class="flex">
    <PersonTypeManager />
  </q-page>
</template>

<script>
import PersonTypeManager from '../components/person_type/PersonTypeManager'
export default {
  name: 'PersonIndexPage',
  components: { PersonTypeManager }
}
</script>

<style scoped>

</style>
