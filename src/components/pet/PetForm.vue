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
                      v-model="innerFormModel.name"
                      type="text"
                      outlined label="Nome"
                      stack-label lazy-rules
                      :error-message="innerFormModel.errors.name"
                      :error="innerFormModel.hasErrorInField('name')"
                      :rules="innerFormModel.validators.name">
              </q-input>

              <q-input
                v-model="innerFormModel.race"
                type="text"
                outlined label="Raça"
                stack-label lazy-rules
                :error-message="innerFormModel.errors.race"
                :error="innerFormModel.hasErrorInField('race')"
                :rules="innerFormModel.validators.race">
              </q-input>

              <q-input
                v-model="innerFormModel.color"
                type="text"
                outlined label="Cor"
                stack-label lazy-rules
                :error-message="innerFormModel.errors.color"
                :error="innerFormModel.hasErrorInField('color')"
                :rules="innerFormModel.validators.color">
              </q-input>

              <q-select v-model="innerFormModel.person"
                        :options="people"
                        outlined
                        :option-label= "person => person.name"
                        :option-value="person => person.id"
                        label="Pessoa"
              />

              <q-select v-model="innerFormModel.petType"
                        :options="petTypes"
                        outlined
                        emit-value
                        label="Tipo"
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
import { cloneDeep } from 'lodash'
import Person from 'src/models/Person'

export default {
  name: 'PetForm',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      innerFormModel: null,
      people: [],
      petTypes: [
        {
          label: 'Gato',
          value: 'cat'
        },
        {
          label: 'Cachorro',
          value: 'dog'
        },
        {
          label: 'Pássaro',
          value: 'bird'
        }
      ]
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
