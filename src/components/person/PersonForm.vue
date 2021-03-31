<template>
  <div class="row">
    <div class="col-xs-12 10 col-md-6 col lg-4 col-xl-4">
      <Form :form-model="innerFormModel" @updateModelOnError="updateModelOnError">
        <template #formTabs>
          <q-tab name="general" icon="fas fa-info-circle" label="Geral" />
          <q-tab name="vehicles" icon="fas fa-info-circle" label="Veículos" />
        </template>

        <template #panels>
          <q-tab-panel name="general">
            <div class="q-col-gutter-y-lg">

              <q-input
                      v-model="innerFormModel.name"
                      type="text"
                      outlined label="Nome"
                      stack-label lazy-rules
                      :error-message="innerFormModel.errors.name"
                      :error="innerFormModel.hasErrorInField('name')"
                      :rules="innerFormModel.validators.name">
              </q-input>

              <q-input
                      v-model="innerFormModel.cpf"
                      type="text"
                      mask="###.###.###-##"
                      unmasked-value
                      outlined label="CPF"
                      stack-label lazy-rules
                      :error-message="innerFormModel.errors.cpf"
                      :error="innerFormModel.hasErrorInField('cpf')"
                      :rules="innerFormModel.validators.cpf"
              >
              </q-input>

              <q-input
                      v-model="innerFormModel.phone"
                      type="text"
                      mask="(##) #####-####"
                      unmasked-value
                      outlined label="Telefone"
                      stack-label lazy-rules
                      :error-message="innerFormModel.errors.phone"
                      :error="innerFormModel.hasErrorInField('phone')"
                      :rules="innerFormModel.validators.phone"
              >
              </q-input>

              <q-select
                v-model="innerFormModel.personType"
                outlined
                :options="personTypes"
                label="Tipo"
                :option-label="personType => personType.name"
                :option-value="personType => personType.id"
              >
              </q-select>
            </div>
          </q-tab-panel>
          <q-tab-panel name="vehicles">
            <div class="q-col-gutter-y-lg">

              <q-input
                v-model="innerFormModel.name"
                type="text"
                outlined label="Nome"
                stack-label lazy-rules
                :error-message="innerFormModel.errors.name"
                :error="innerFormModel.hasErrorInField('name')"
                :rules="innerFormModel.validators.name">
              </q-input>

              <q-input
                v-model="innerFormModel.cpf"
                type="text"
                mask="###.###.###-##"
                unmasked-value
                outlined label="CPF"
                stack-label lazy-rules
                :error-message="innerFormModel.errors.cpf"
                :error="innerFormModel.hasErrorInField('cpf')"
                :rules="innerFormModel.validators.cpf"
              >
              </q-input>

              <q-input
                v-model="innerFormModel.phone"
                type="text"
                mask="(##) #####-####"
                unmasked-value
                outlined label="Telefone"
                stack-label lazy-rules
                :error-message="innerFormModel.errors.phone"
                :error="innerFormModel.hasErrorInField('phone')"
                :rules="innerFormModel.validators.phone"
              >
              </q-input>

              <q-select
                v-model="innerFormModel.personType"
                outlined
                :options="personTypes"
                label="Tipo"
                :option-label="personType => personType.name"
                :option-value="personType => personType.id"
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
import PersonType from 'src/models/PersonType'
import { cloneDeep } from 'lodash'

export default {
  name: 'PersonForm',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      innerFormModel: null,
      personTypes: []
    }
  },
  methods: {
    updateModelOnError (model) {
      this.innerFormModel = cloneDeep(model)
    }
  },
  async beforeMount () {
    this.innerFormModel = cloneDeep(this.formModel)
    this.personTypes = await PersonType.getAll()
  },
  components: {
    Form
  }
}
</script>
