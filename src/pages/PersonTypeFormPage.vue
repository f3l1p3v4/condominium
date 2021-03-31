<template>
  <q-page padding>
    <PersonTypeForm :form-model="formModel" />
  </q-page>
</template>

<script>
import PersonTypeForm from '../components/person_type/PersonTypeForm'
export default {
  name: 'PersonTypeFormPage',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  components: {
    PersonTypeForm
  }
}
</script>
