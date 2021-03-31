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
                      v-model="innerFormModel.recipient"
                      outlined
                      :options="recipients"
                      label="Destinatário"
                      :option-label="recipient => recipient.name"
                      :option-value="recipient => recipient.id"
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

              <q-input
                      v-model="innerFormModel.observations"
                      type="textarea"
                      outlined label="Observação"
                      stack-label lazy-rules
                      :error-message="innerFormModel.errors.observations"
                      :error="innerFormModel.hasErrorInField('observations')"
                      :rules="innerFormModel.validators.observations"
              >
              </q-input>
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
import User from '../../models/User'

export default {
  name: 'DeliveryForm',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      innerFormModel: null,
      recipients: []
    }
  },
  methods: {
    updateModelOnError (model) {
      this.innerFormModel = cloneDeep(model)
    }
  },
  async beforeMount () {
    this.innerFormModel = cloneDeep(this.formModel)
    this.recipients = await User.getAll()
  },
  components: {
    Form
  }
}
</script>
