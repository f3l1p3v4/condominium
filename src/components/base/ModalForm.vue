<template>
  <Modal :value="value" @input="propagateDialogInput">
    <template #title>
      <span class="text-h4">{{modalTitle}}</span>
    </template>

    <template #content>

      <q-scroll-area
              :style="{ height: '50vh'}"
              :bar-style="{ backgroundColor: primaryColor }"
      >
        <Form :form-model="model" ref="form_ref" @validation-error="$emit('validation-error')">
          <template #fields>
            <div class="flex row q-col-gutter-sm">
              <div class="col-12">
                <slot name="panels"></slot>
              </div>
            </div>
  <!--          <slot name="inputs" />-->
          </template>
        </Form>
      </q-scroll-area>

    </template>

    <template #actions>
      <div class="col">
        <div class="float-left">
          <q-btn unelevated color="secondary" label="Cancelar" @click="$emit('input', false)" />
        </div>
      </div>

      <div class="col">
        <div class="float-right">
          <slot name="acts" />
          <q-btn unelevated color="primary" label="Salvar" class="float-right" @click="formSave" />
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '../base/Modal'
import Form from '../base/Form'
import { notify } from '../../lib/Common'
import { colors } from 'quasar'

export default {
  name: 'ModalForm',
  props: {
    modalTitle: String,
    model: Object,
    value: {
      type: Boolean,
      required: true
    },
    storeName: String
  },
  methods: {
    propagateDialogInput (value) {
      this.$emit('input', value)
    },
    async formSave (storeName) {
      const formComponent = this.$children[0].$slots.content[2].context.$refs.form_ref
      const formIsValid = await formComponent.valid()

      if (formIsValid) {
        this.parseFormSaveResponse(await formComponent.save(storeName))
      } else {
        this.getFormInputs()
        notify('fail validation')
      }
    },
    parseFormSaveResponse (response) {
      if (response.success === true) {
        notify('success update')
        this.propagateDialogInput(false)
      } else {
        notify('fail validation')
      }
    },
    getFormInputs () {
      const self = this
      const inputs = []

      const tabPanels = this.$slots.panels[0].componentOptions.children

      tabPanels.forEach(panel => {
        self.recursiveGetInputNodes(panel, inputs)
      })
    },
    recursiveGetInputNodes (node, result = []) {
      const self = this

      if (!Array.isArray(node) && node?.componentOptions?.tag === 'q-input') {
        result.push(node)
      } else if (node?.componentOptions?.children) {
        node.componentOptions.children.forEach(el => {
          self.recursiveGetInputNodes(el, result)
        })
      } else if (node?.children) {
        node.children.forEach(el => {
          self.recursiveGetInputNodes(el, result)
        })
      }
    }
  },
  computed: {
    primaryColor () {
      return colors.getBrand('primary')
    }
  },
  components: { Modal, Form }
}
</script>

<style scoped>

</style>
