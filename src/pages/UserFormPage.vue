<template>
  <q-page padding>
    <UserForm :form-model="formModel" />
  </q-page>
</template>

<script>
import UserForm from '../components/user/UserForm'
export default {
  name: 'UserFormPage',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  components: {
    UserForm
  }
}
</script>
