<template>
  <ModalForm modalTitle="title" :model="formModel" :value="value" @input="propagateDialogInput" store-name="agent">

    <template #tabs>
      <q-tabs
              v-model="tab"
              class="text-primary"
      >
        <q-tab name="general"  label="Geral" />
        <q-tab name="address" label="Endereço" />
        <q-tab name="groups" label="Grupos" :disabled="isNewModel" />
        <q-tab name="configs" label="Configurações" />
      </q-tabs>
      <q-separator />
    </template>

    <template #panels>
      <q-tab-panels v-model="tab" animated :keep-alive="true">

        <q-tab-panel name="general">
          <div class="q-gutter-y-sm">
            <div class="col-12">
              <q-input v-model="formModel.name" outlined label="Nome" stack-label lazy-rules :rules="formModel.validators.name" ref="name">
              </q-input>
            </div>
            <div class="col-12">
              <q-input v-model="formModel.cpf" outlined label="CPF" stack-label lazy-rules :rules="formModel.validators.cpf" ref="cpf">
              </q-input>
            </div>
            <div class="col-12">
              <q-input v-model="formModel.dateOfBirth" outlined label="Data de Nascimento" stack-label lazy-rules :rules="formModel.validators.dateOfBirth" ref="dateOfBirth">
              </q-input>
            </div>
            <div class="col-12">
              <q-input v-model="formModel.phone1" outlined label="Telefone 1" stack-label lazy-rules :rules="formModel.validators.phone1" ref="phone1">
              </q-input>
            </div>
            <div class="col-12">
              <q-input v-model="formModel.phone2" outlined label="Telefone 2" stack-label lazy-rules :rules="formModel.validators.phone2" ref="phone2">
              </q-input>
            </div>
          </div>

        </q-tab-panel>

        <q-tab-panel name="address">
          <div class="q-gutter-y-sm">
            <div class="col-12">
              <q-input v-model="formModel.address_street" outlined label="Logradouro" stack-label :rules="formModel.validators.address_street">
              </q-input>
            </div>
            <div class="col-12">
              <q-input v-model="formModel.address_number" outlined label="Número" stack-label :rules="formModel.validators.address_number">
              </q-input>
            </div>
            <div class="col-12">
              <q-input v-model="formModel.address_neighborhood" outlined label="Bairro" stack-label :rules="formModel.validators.address_neighborhood">
              </q-input>
            </div>
            <div class="col-12">
              <q-input v-model="formModel.address_zipcode" outlined label="CEP" stack-label :rules="formModel.validators.address_zipcode">
              </q-input>
            </div>
          </div>
        </q-tab-panel>

        <!-- Operation Groups Tab -->
        <q-tab-panel name="groups" :disabled="isNewModel">
          <div class="q-gutter-y-sm">
            <div v-for="(operationGroup, index) in operationGroups" :key="operationGroup.id" >
              <q-toggle
                      v-model="formModel.operationGroupIds"
                      :label="operationGroups[index].name"
                      :val="operationGroups[index].id"
                      :disable="isNewModel"
              />
            </div>
          </div>
        </q-tab-panel>
        <!-- / Operation Groups Tab -->

      </q-tab-panels>
    </template>

  </ModalForm>
</template>

<script>
import User from '../../models/User'
import ModalForm from '../base/ModalForm'
// import { notify } from '../../lib/Common'
export default {
  name: 'UserModalForm',
  props: {
    modalTitle: String,
    formModel: Object,
    value: Boolean
  },
  data () {
    return {
      model: new User(this.formData),
      agents_columns: [
        { name: 'name', label: 'Nome', field: 'name', align: 'left', sortable: true },
        { name: 'actions', label: 'Ações', align: 'left' }
      ],
      rawOperationGroups: [],
      operationGroups: [],
      tab: 'general'
    }
  },
  methods: {
    propagateDialogInput (value) {
      this.$emit('input', value)
    },
    buildOperationGroups () {
      const self = this
      const operationGroupsBuiltArray = []

      this.rawOperationGroups.forEach(group => {
        operationGroupsBuiltArray.push(
          {
            id: group.id,
            name: group.name,
            control: self.formModel.hasOperationGroup(group)
          }
        )
      })

      this.operationGroups = operationGroupsBuiltArray
    }
  },
  computed: {
    isNewModel () {
      return !this.formModel?.fields?.id > 0
    }
  },
  watch: {
    value (newVal, oldVal) {
      if (newVal === true) {
        this.buildOperationGroups()
      }
    }
  },
  async beforeMount () {
    this.rawOperationGroups = await User.getAll()
  },
  components: { ModalForm }
}
</script>

<style scoped>

</style>
