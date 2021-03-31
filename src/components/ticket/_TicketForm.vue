<template>
  <Form :form-model=formModel>
    <template #fields>
      <q-input filled v-model="formModel.description" label="Filled" />
    </template>
  </Form>
</template>

<script>
import Form from '../base/Form'
export default {
  name: 'TicketForm',
  props: {
    formModel: Object
  },
  data () {
    return {
      text: ''
    }
  },
  components: { Form }
}
</script>

<style scoped>

</style>
