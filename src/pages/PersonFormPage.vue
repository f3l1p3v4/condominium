<template>
  <q-page padding>
    <PersonForm :form-model="formModel" />
  </q-page>
</template>

<script>
import PersonForm from '../components/person/PersonForm.vue'
export default {
  name: 'PersonFormPage',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  components: {
    PersonForm
  }
}
</script>
