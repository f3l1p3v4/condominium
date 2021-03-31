]<template>
  <Manager
          :model-instance="modelInstance"
          :table-title="tableTitle"
          :table-columns="tableColumns"
  >

    <template #column-actions="{props, edit, destroy}">
      <td>
        <q-btn-dropdown color="primary" flat rounded icon="fas fa-cog">
          <q-list>

            <q-item v-close-popup clickable @click="edit(props.row)">
              <q-item-section avatar>
                <q-avatar icon="fas fa-edit" text-color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Editar</q-item-label>
              </q-item-section>
            </q-item>

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
            {{props.row.name}}
          </div>
<!--          <div class="text-subtitle1">{{props.row.translatedUserType}}</div>-->
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle2">Horário de Funcionamento</div>
          {{`${props.row.openingHoursStart} à ${props.row.openingHoursEnd}`}}
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle2">Intervalo de Uso</div>
          {{`${props.row.usageInterval} horas`}}
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-btn
                      unelevated
                      label="Editar"
                      color="primary"
                      :to="{name: 'edit_common_area', params: {formModel: props.row}}"
              >
              </q-btn>
            </div>

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
          <q-card-section class="relative-position vertical-bottom">
            <div class="float-left text-caption">
              {{`Criado Em: ${props.row.createdAt}`}}
            </div>
          </q-card-section>
        </div>
      </q-card>
    </template>

  </Manager>
</template>

<script>
import Manager from '../base/Manager'
import CommonArea from '../../models/CommonArea'

export default {
  name: 'CommonAreaManager',
  data () {
    return {
      modelInstance: new CommonArea(),
      tableTitle: 'Áreas Comuns',
      tableColumns: [
        // {
        //   name: 'id',
        //   label: 'ID',
        //   field: 'id',
        //   align: 'left',
        //   sortable: true
        // },
        {
          name: 'name',
          label: 'Nome',
          field: 'name',
          align: 'left',
          sortable: true
        },
        {
          name: 'working_hours',
          label: 'Horário de Funcionamento',
          field: (row) => `${row.openingHoursStart} à ${row.openingHoursEnd}`,
          align: 'left',
          sortable: true
        },
        {
          name: 'usage_itnerval',
          label: 'Intervalo de Uso',
          field: (row) => `${row.usageInterval} horas`,
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
    // editableTicketType (obj) {
    //   return !(obj?.numOfTickets > 0)
    // }
  },
  components: {
    Manager
  }
}
</script>

<style scoped>

</style>
