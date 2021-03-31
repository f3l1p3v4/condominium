<template>
  <q-page padding>
    <AnimalForm :form-model="formModel" />
  </q-page>
</template>

<script>
import AnimalForm from 'components/pet/PetForm.vue'
export default {
  name: 'AnimalFormPage',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  components: {
    AnimalForm
  }
}
</script>
