<template>
  <q-page padding>
    <FoundForm :form-model="formModel" />
  </q-page>
</template>

<script>
import FoundForm from '../components/found/FoundForm.vue'
export default {
  name: 'FoundFormPage',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  components: {
    FoundForm
  }
}
</script>
