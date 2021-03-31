<template>
  <q-page padding>
    <div class="q-gutter-y-md">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6">
          <q-select v-model="selectedArea"
                    :options="commonAreas"
                    outlined
                    option-value="id"
                    option-label="name"
                    label="Área Comum"
                    @input="selectedCommonArea"
          />
        </div>
      </div>

      <div class="row" v-if="selectedArea">
        <div class="col-xs-12 col-sm-10 col-md-4">
          <q-input filled v-model="date" label="Data">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" mask="DD/MM/YYYY" @input="dateSelected" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>

      <div class="row" v-if="date">
        <div class="col-xs-12">
          <q-list v-if="filteredReserveOpts.length >= 1">
            <!--
              Rendering a <label> tag (notice tag="label")
              so QRadios will respond to clicks on QItems to
              change Toggle state.
            -->

            <q-item tag="label" v-ripple v-for="opt in filteredReserveOpts" :key="opt.index">
              <q-item-section avatar>
                <q-radio v-model="selectedReserve" :val="opt.start" color="primary" :disabled="opt.available === false" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{`${opt.start} até ${opt.end}`}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <p v-else>Não existem horários de reserva disponíveis para este dia</p>
        </div>
      </div>

      <div class="row">
        <q-btn unelevated color="secondary" label="Voltar" @click="$router.go(-1)" />
        <q-btn v-if="selectedReserve !== null" color="primary" unelevated label="Confirmar Reserva" class="q-ml-md"
               @click="saveReservation"
               :disable="selectedReserve === null" />
      </div>
    </div>

  </q-page>
</template>

<script>
import CommonArea from 'src/models/CommonArea'
import { Notify } from 'quasar'
export default {
  name: 'NewCommonAreaReservation',
  data () {
    return {
      selectedArea: '',
      selectedAreaObj: null,
      commonAreas: [],
      reserveOpts: [],
      selectedReserve: null,
      date: ''
    }
  },
  methods: {
    async dateSelected (value, reason, details) {
      const date = new Date(`${details.year}-${details.month}-${details.day}`)
      this.reserveOpts = await this.selectedAreaObj.availableReservations(date)
      this.$refs.qDateProxy.hide()
    },
    selectedCommonArea (val) {
      this.selectedAreaObj = new CommonArea(this.commonAreas.find(area => area.id === val.id))
    },
    async saveReservation () {
      if (this.selectedReserve !== null) {
        const res = await this.selectedAreaObj.createReservation(this.date, this.selectedReserve, this.selectedArea.usageInterval)
        if (res?.length > 0) {
          Notify.create({ message: 'Salvo com sucesso', type: 'positive', icon: 'fas fa-check-circle' })
          this.$router.push({ name: 'common_area_reservations' })
        } else {
          Notify.create({ message: 'Erro ao inserir reserva', type: 'negative', icon: 'fas fa-exclamation-triangle' })
        }
      }
    }
  },
  computed: {
    filteredReserveOpts () {
      return this.reserveOpts.filter(opt => opt.available === true)
    }
  },
  async beforeMount () {
    this.commonAreas = await CommonArea.getAll()
  }
}
</script>

<style scoped>

</style>
