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

              <q-input
                      v-model="innerFormModel.brand"
                      type="text"
                      outlined label="Marca"
                      stack-label lazy-rules
                      :error-message="innerFormModel.errors.brand"
                      :error="innerFormModel.hasErrorInField('brand')"
                      :rules="innerFormModel.validators.brand">
              </q-input>

              <q-input
                      v-model="innerFormModel.model"
                      type="text"
                      outlined label="Modelo"
                      stack-label lazy-rules
                      :error-message="innerFormModel.errors.model"
                      :error="innerFormModel.hasErrorInField('model')"
                      :rules="innerFormModel.validators.model"
              >
              </q-input>

              <q-input
                      v-model="innerFormModel.color"
                      type="text"
                      outlined label="Cor"
                      stack-label lazy-rules
                      :error-message="innerFormModel.errors.color"
                      :error="innerFormModel.hasErrorInField('color')"
                      :rules="innerFormModel.validators.color"
              >
              </q-input>

              <q-input
                      v-model="innerFormModel.licensePlate"
                      type="text"
                      outlined label="Placa"
                      stack-label lazy-rules
                      :error-message="innerFormModel.errors.license_plate"
                      :error="innerFormModel.hasErrorInField('license_plate')"
                      :rules="innerFormModel.validators.license_plate"
              >
              </q-input>

              <q-select v-model="innerFormModel.person"
                        :options="people"
                        outlined
                        :option-label= "person => person.name"
                        :option-value="person => person.id"
                        label="Proprietário"
              />
            </div>
          </q-tab-panel>
        </template>
      </Form>
    </div>
  </div>
</template>

<script>
import Form from '../base/Form'
import Person from 'src/models/Person'
import { cloneDeep } from 'lodash'

export default {
  name: 'VehicleForm',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      innerFormModel: null,
      people: []
    }
  },
  methods: {
    updateModelOnError (model) {
      this.innerFormModel = cloneDeep(model)
    }
  },
  async beforeMount () {
    this.innerFormModel = cloneDeep(this.formModel)
    this.people = await Person.getAll()
  },
  components: {
    Form
  }
}
</script>
