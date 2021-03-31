<template>
  <q-form ref="form"
          :greedy="true"
          :autofocus="true"
          @validation-error="$emit('validation-error')"
  >

    <div class="row">
      <div class="col-12">
        <q-tabs
                v-model="tab"
                class="text-primary"
                align="left"
                ref="tabs"
        >
          <slot name="formTabs" ref="tabsSlot" :setTab="setTab" />
        </q-tabs>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <q-tab-panels v-model="tab" animated :keep-alive="true">
          <slot name="panels" />
        </q-tab-panels>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="q-gutter-x-md float-right">
          <slot name="formActions"/>
          <q-btn unelevated color="secondary" label="Voltar" @click="$router.go(-1)" />
          <q-btn unelevated color="primary" label="Salvar" @click="save" />
        </div>
      </div>
    </div>
  </q-form>
</template>

<script>
import { Notify } from 'quasar'
import { snakeToCamel } from '../../lib/Common'
export default {
  name: 'Form',
  props: {
    formModel: {
      type: Object,
      required: true
    },
    initialTab: String
  },
  data () {
    return {
      tab: '',
      innerFormModel: null
    }
  },
  methods: {
    async save () {
      const form = this.$refs.form
      const valid = await form.validate(true)

      if (valid === true) {
        const resourceName = this.formModel.singularResourceName
        const response = await this.$store.dispatch(`${snakeToCamel(resourceName)}/save`, { [resourceName]: this.formModel })
        if (response.success === true) {
          Notify.create({ message: 'Salvo com sucesso', type: 'positive', icon: 'fas fa-check-circle' })
          this.$router.go(-1)
        } else if (response.status === 422) {
          Notify.create({ message: 'Erro ao validar informações', type: 'negative', icon: 'fas fa-exclamation-triangle' })
          this.$emit('updateModelOnError', this.formModel)
        } else if (response.status === 403) {
          Notify.create({ message: 'Ação não autorizada', type: 'negative', icon: 'fas fa-exclamation-triangle' })
        }
      } else {
        return { success: false }
      }
    },
    async valid () {
      return this.$refs.form.validate(true)
    },
    setTab (tab) {
      this.tab = tab
    }
  },
  mounted () {
    this.$refs.form.resetValidation()
    this.tab = this.$refs?.tabs?.$slots?.default[0]?.componentOptions?.propsData?.name || ''
  }
}
</script>

<style scoped>

</style>
