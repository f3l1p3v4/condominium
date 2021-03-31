<template>
  <q-page padding>
    <CondoForm :form-model="formModel" />
  </q-page>
</template>

<script>
import CondoForm from '../components/condo/CondoForm'
export default {
  name: 'CondoFormPage',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  components: {
    CondoForm
  }
}
</script>
