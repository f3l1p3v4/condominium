<template>
  <div class="row">
    <div class="col-xs-12 10 col-md-6 col lg-4 col-xl-4">
      <Form :form-model="innerFormModel" @updateModelOnError="updateModelOnError">
        <template #formTabs>
          <q-tab name="general" icon="fas fa-info-circle" label="Geral" />
        </template>

        <template #panels>
          <q-tab-panel name="general">
            <div class="q-col-gutter-y-lg">
              <q-select
                      v-model="innerFormModel.ticketType"
                      outlined
                      :options="ticketTypes"
                      label="Tipo de Chamado"
                      :error-message="innerFormModel.errors.ticket_type"
                      :error="innerFormModel.hasErrorInField('ticket_type')"
                      :rules="innerFormModel.validators.ticket_type"
                      option-label="name"
                      option-value="id"
              >
              </q-select>

              <q-input
                      v-model="innerFormModel.description"
                      type="textarea"
                      outlined label="Descrição"
                      stack-label lazy-rules
                      :error-message="innerFormModel.errors.description"
                      :error="innerFormModel.hasErrorInField('description')"
                      :rules="innerFormModel.validators.description">
              </q-input>

              <q-select
                      v-model="innerFormModel.emergency"
                      outlined
                      :options="buildEmergencySelectOpts"
                      emit-value
                      map-options
                      label="Prioridade"
                      :error-message="innerFormModel.errors.emergency"
                      :error="innerFormModel.hasErrorInField('emergency')"
                      :rules="innerFormModel.validators.emergency"
              >
              </q-select>
            </div>
          </q-tab-panel>
        </template>
      </Form>
    </div>
  </div>
</template>

<script>
import Form from '../base/Form'
import { cloneDeep } from 'lodash'
import TicketType from '../../models/TicketType'

export default {
  name: 'TicketForm',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      innerFormModel: null,
      ticketTypes: []
    }
  },
  methods: {
    updateModelOnError (model) {
      this.innerFormModel = cloneDeep(model)
    }
  },
  computed: {
    buildEmergencySelectOpts () {
      return [
        { label: 'Baixa', value: 'low' },
        { label: 'Média', value: 'intermediate' },
        { label: 'Alta', value: 'high' }
      ]
    }
  },
  async beforeMount () {
    this.innerFormModel = cloneDeep(this.formModel)
    this.ticketTypes = await TicketType.getAll()
  },
  components: {
    Form
  }
}
</script>

<style scoped>

</style>
