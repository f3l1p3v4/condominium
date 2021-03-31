<template>
  <Manager
    :model-instance="modelInstance"
    :table-title="tableTitle"
    :table-columns="tableColumns"
    :new-res-btn="false"
  >

    <template #column-actions="{props, edit, destroy}">
      <td>
        <q-btn-dropdown color="primary" flat rounded icon="fas fa-cog">
          <q-list>
            <q-item v-close-popup clickable @click="destroy(props.row)">
              <q-item-section avatar>
                <q-avatar icon="fas fa-trash" text-color="red"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Remover</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </td>
    </template>

    <template #grid="{props, destroy}" ref="template_grid">
      <q-card flat class="bg-grey-2 ticket_card q-ma-sm q-pa-xs" :ref="`card_${props.row.id}`">
        <q-card-section>
          <div class="text-h6">
            {{ props.row.commonArea.name }}
          </div>
        </q-card-section>

        <q-card-section>
          <b>Início:</b> {{ localizeDate(props.row.startTime) }}
        </q-card-section>

        <q-card-section>
          <b>Fim:</b> {{ localizeDate(props.row.endTime) }}
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-btn
                      unelevated
                      label="Remover"
                      color="red"
                      @click="destroy(props.row)"
              >
              </q-btn>
            </div>
          </div>

        </q-card-section>

        <div class="relative-position vertical-bottom">
        </div>
      </q-card>
    </template>
  </Manager>
</template>

<script>
import Manager from '../base/Manager'
import CommonAreaReservation from '../../models/CommonAreaReservation'
import { date } from 'quasar'

export default {
  name: 'CommonAreaManager',
  data () {
    return {
      modelInstance: new CommonAreaReservation(),
      tableTitle: 'Reservas de Área Comum',
      tableColumns: [
        {
          name: 'common_area',
          label: 'Área Comum',
          field: (obj) => obj.fields?.['common_area']?.name,
          align: 'left',
          sortable: true
        },
        {
          name: 'start_time',
          label: 'Início',
          field: (obj) => date.formatDate(obj.fields?.['start_time'], 'DD/MM/YYYY HH:mm'),
          align: 'left',
          sortable: true
        },
        {
          name: 'end_time',
          label: 'Fim',
          field: (obj) => date.formatDate(obj.fields?.['end_time'], 'DD/MM/YYYY HH:mm'),
          align: 'left',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Ações',
          align: 'left',
          sortable: true,
          template: true
        }
      ],
      modal: false,
      curRes: {}
    }
  },
  methods: {
    localizeDate (rawDate) {
      return date.formatDate(rawDate, 'DD/MM/YYYY HH:mm')
    }
  },
  components: {
    Manager
  }
}
</script>

<style scoped>

</style>
