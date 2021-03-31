<template>
  <q-page padding>
    <CommonAreaForm :form-model="formModel" />
  </q-page>
</template>

<script>
import CommonAreaForm from '../components/common_area/CommonAreaForm'
export default {
  name: 'CommonAreaFormPage',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  components: {
    CommonAreaForm
  }
}
</script>
