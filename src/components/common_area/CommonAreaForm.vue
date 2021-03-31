<template>
  <div class="row">
    <div class="col-xs-12 10 col-md-6 col lg-4 col-xl-4">
      <Form :form-model="innerFormModel">
        <template #formTabs>
          <q-tab name="general" icon="fas fa-info-circle" label="Geral" />
        </template>

        <template #panels>
          <q-tab-panel name="general">
            <div class="row q-gutter-y-md">
              <div class="col-12">
                <q-input v-model="innerFormModel.name" outlined label="Nome" stack-label lazy-rules
                         :error-message="innerFormModel.errors.name" :error="innerFormModel.hasErrorInField('name')"
                         :rules="innerFormModel.validators.name">
                </q-input>
              </div>

              <div class="col-12">
                <q-input v-model="innerFormModel.openingHoursStart" mask="time" outlined stack-label lazy-rules
                         :rules="innerFormModel.validators.openingHoursStart"
                         :error-message="innerFormModel.errors.name" :error="innerFormModel.hasErrorInField('name')"
                         label="Horário de Funcionamento (início)"
                >
                  <template v-slot:prepend>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time v-model="innerFormModel.openingHoursStart" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-12">
                <q-input v-model="innerFormModel.openingHoursEnd" mask="time" outlined stack-label lazy-rules
                         :rules="innerFormModel.validators.openingHoursEnd"
                         :error-message="innerFormModel.errors.name" :error="innerFormModel.hasErrorInField('name')"
                         label="Horário de Funcionamento (fim)"
                >
                  <template v-slot:prepend>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time v-model="innerFormModel.openingHoursEnd" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-12">
                <q-input v-model="innerFormModel.usageInterval" outlined label="Tempo Máximo de Uso (em horas)" stack-label lazy-rules
                         :error-message="innerFormModel.errors.usageInterval" :error="innerFormModel.hasErrorInField('usage_interval')"
                         :rules="innerFormModel.validators.usageInterval" type="number"
                >
                </q-input>
              </div>

              <div class="col-12">
                <q-checkbox v-model="innerFormModel.workingDays" val="sunday" label="Dom" />
                <q-checkbox v-model="innerFormModel.workingDays" val="monday" label="Seg" />
                <q-checkbox v-model="innerFormModel.workingDays" val="tuesday" label="Ter" />
                <q-checkbox v-model="innerFormModel.workingDays" val="wednesday" label="Qua" />
                <q-checkbox v-model="innerFormModel.workingDays" val="thursday" label="Qui" />
                <q-checkbox v-model="innerFormModel.workingDays" val="friday" label="Sex" />
                <q-checkbox v-model="innerFormModel.workingDays" val="saturday" label="Sáb" />
              </div>
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
  name: 'TicketTypeForm',
  data () {
    return {
      innerFormModel: null,
      condos: []
    }
  },
  props: {
    formModel: {
      type: Object,
      required: true
    }
  },
  async beforeMount () {
    this.innerFormModel = cloneDeep(this.formModel)
    // if (this.$auth.can('showCondosInUserForm')) {
    //   this.condos = await Condo.getAll()
    // }
  },
  components: {
    Form
  }
}
</script>

<style scoped>

</style>
