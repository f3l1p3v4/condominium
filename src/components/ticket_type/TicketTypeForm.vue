<template>
  <div class="row">
    <div class="col-xs-12 10 col-md-6 col lg-4 col-xl-4">
      <Form :form-model="innerFormModel">
        <template #formTabs>
          <q-tab name="general" icon="fas fa-info-circle" label="Geral" />
        </template>

        <template #panels>
          <q-tab-panel name="general">
            <q-input v-model="innerFormModel.name" outlined label="Nome" stack-label lazy-rules
                     :error-message="innerFormModel.errors.name" :error="innerFormModel.hasErrorInField('name')"
                     :rules="innerFormModel.validators.name">
            </q-input>

            <q-select v-model="innerFormModel.condo"
                      v-if="$auth.can('showCondosInTicketTypeForm')"
                      :options="condos"
                      outlined
                      :option-label="condo => condo.name"
                      :option-value="condo => condo.id"
                      label="Condomínio"
            />

          </q-tab-panel>
        </template>
      </Form>
    </div>
  </div>
</template>

<script>
import Form from '../base/Form'
import Condo from '../../models/Condo'
import { cloneDeep } from 'lodash'

export default {
  name: 'TicketTypeForm',
  data () {
    return {
      innerFormModel: null,
      condos: []
    }
  },
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  async beforeMount () {
    this.innerFormModel = cloneDeep(this.formModel)
    if (this.$auth.can('showCondosInUserForm')) {
      this.condos = await Condo.getAll()
    }
  },
  components: {
    Form
  }
}
</script>

<style scoped>

</style>
