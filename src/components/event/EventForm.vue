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
                      v-model="innerFormModel.title"
                      type="text"
                      outlined label="Título"
                      stack-label lazy-rules
                      :error-message="innerFormModel.errors.title"
                      :error="innerFormModel.hasErrorInField('title')"
                      :rules="innerFormModel.validators.title">
              </q-input>

              <q-input
                      v-model="innerFormModel.description"
                      type="text"
                      outlined label="Descrição"
                      stack-label lazy-rules
                      :error-message="innerFormModel.errors.description"
                      :error="innerFormModel.hasErrorInField('description')"
                      :rules="innerFormModel.validators.description"
              >
              </q-input>

              <q-input filled v-model="innerFormModel.date" label="Data"
                       :error-message="innerFormModel.errors.date"
                       :error="innerFormModel.hasErrorInField('date')"
                       :rules="innerFormModel.validators.date"
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="innerFormModel.date" mask="DD/MM/YYYY HH:mm" />
                    </q-popup-proxy>
                  </q-icon>
                </template>

                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-time v-model="innerFormModel.date" mask="DD/MM/YYYY HH:mm" format24h />
                    </q-popup-proxy>
                  </q-icon>
                </template>
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
  name: 'EventForm',
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
  },
  components: {
    Form
  }
}
</script>
