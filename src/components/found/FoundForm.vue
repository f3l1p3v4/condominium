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

              <q-radio v-model="innerFormModel.foundType" val="lost" label="Eu perdi algo" />
              <q-radio v-model="innerFormModel.foundType" val="found" label="Eu encontrei algo" />

              <q-input
                      v-model="innerFormModel.description"
                      type="textarea"
                      outlined label="Descrição"
                      stack-label lazy-rules
                      :error-message="innerFormModel.errors.description"
                      :error="innerFormModel.hasErrorInField('description')"
                      :rules="innerFormModel.validators.description">
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

export default {
  name: 'FoundForm',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      innerFormModel: null
    }
  },
  methods: {
    updateModelOnError (model) {
      this.innerFormModel = cloneDeep(model)
    }
  },
  async beforeMount () {
    this.innerFormModel = cloneDeep(this.formModel)
  },
  components: {
    Form
  }
}
</script>

<style scoped>

</style>
