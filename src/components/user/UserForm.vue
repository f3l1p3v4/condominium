<template>
  <div class="row">
    <div class="col-xs-12 10 col-md-6 col lg-4 col-xl-4">
      <Form :form-model="innerFormModel">
        <template #formTabs>
          <q-tab name="general" icon="fas fa-info-circle" label="Geral" />
        </template>

        <template #panels>
          <q-tab-panel name="general">
            <div class="q-gutter-y-sm">
              <q-input v-model="innerFormModel.name" outlined label="Nome" stack-label lazy-rules
                       :error-message="innerFormModel.errors.name" :error="innerFormModel.hasErrorInField('name')" :rules="innerFormModel.validators.name">
              </q-input>

              <q-input v-model="innerFormModel.email" outlined label="Email" stack-label lazy-rules
                       :error-message="innerFormModel.errors.email" :error="innerFormModel.hasErrorInField('email')" :rules="innerFormModel.validators.email">
              </q-input>

              <q-input v-model="innerFormModel.password" outlined label="Senha" stack-label lazy-rules type="password"
                       :error-message="innerFormModel.errors.password" :error="innerFormModel.hasErrorInField('password')" :rules="innerFormModel.validators.password">
              </q-input>

              <q-select v-model="innerFormModel.userType"
                        :options="buildUserTypeSelectOpts"
                        emit-value
                        outlined
                        map-options
                        label="Tipo de Usuário"
              />

              <q-select v-model="innerFormModel.condo"
                        v-if="$auth.can('showCondosInUserForm')"
                        :options="condos"
                        outlined
                        :option-label="condo => condo.name"
                        :option-value="condo => condo.id"
                        label="Condomínio"
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
import Condo from '../../models/Condo'
import { cloneDeep } from 'lodash'

export default {
  name: 'UserForm',
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      innerFormModel: null,
      condos: []
    }
  },
  methods: {
  },
  computed: {
    buildUserTypeSelectOpts () {
      const optsArray = []
      switch (this.userType) {
        case 'manager':
          return [
            { label: 'Condômino', value: 'dweller' }
          ]
        case 'supervisor':
          return [
            { label: 'Condômino', value: 'dweller' },
            { label: 'Síndico', value: 'manager' },
            { label: 'Supervisor', value: 'supervisor' }
          ]
        case 'admin':
          return [
            { label: 'Condômino', value: 'dweller' },
            { label: 'Síndico', value: 'manager' },
            { label: 'Supervisor', value: 'supervisor' },
            { label: 'Administrador', value: 'admin' }
          ]
      }
      return optsArray
    },
    userType () {
      return this.$store.getters['auth/getUserType']
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
