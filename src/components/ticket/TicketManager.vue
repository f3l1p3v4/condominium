<template>
  <div>
    <Manager
            :model-instance="modelInstance"
            :table-title="tableTitle"
            :table-columns="tableColumns"
            :new-res-btn="true"
    >
      <template #column-emergency="{props}">
        <td>
          <q-btn icon="fas fa-exclamation-circle" size="16px" flat round dense
                 :color="emergencyColor(props.row.emergency)"
                 :to="{name: 'ticket', params: {id: props.row.id}}"
          >
            <q-badge color="grey-8" floating>{{props.row.ticketMessages.length}}</q-badge>
            <q-tooltip anchor="bottom right">
              {{`Prioridade: ${props.row.translatedEmergency}`}}
            </q-tooltip>
          </q-btn>
        </td>
      </template>

      <template #column-status="{props}">
        <td>
          <q-icon :name="statusIcon(props.row.status)" size="24px" color="primary" >
            <q-tooltip anchor="bottom right">
              {{`${props.row.translatedStatus}`}}
            </q-tooltip>
          </q-icon>
        </td>
      </template>

      <template #column-description="{props}">
        <td>
          {{`${props.row.description.substring(0, 36)}...`}}
          <q-tooltip anchor="center middle">
            {{props.row.description}}
          </q-tooltip>
        </td>
      </template>

      <template #column-actions="{props, edit, destroy}">
        <td>
          <q-btn-dropdown color="primary" flat rounded icon="fas fa-cog">
            <q-list>

              <q-item clickable v-close-popup :to="{name: 'ticket', params: {id: props.row.id}}">
                <q-item-section avatar>
                  <q-avatar icon="far fa-eye" text-color="primary"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Visualizar</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="edit(props.row)">
                <q-item-section avatar>
                  <q-avatar icon="fas fa-edit" text-color="primary"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Editar</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="destroy(props.row)">
                <q-item-section avatar>
                  <q-avatar icon="fas fa-trash" text-color="red"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Remover</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item-label header>Status Atual: <b>{{props.row.translatedStatus}}</b></q-item-label>

              <q-item clickable v-close-popup @click="changeStatus(props.row, 'in_attendance')">

                <q-item-section avatar>
                  <q-icon color="primary" name="fas fa-star-half-alt" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Trocar p/ Em Atendimento</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="changeStatus(props.row, 'closed')">

                <q-item-section avatar>
                  <q-icon color="primary" name="fas fa-star" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Trocar p/ Finalizado</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-btn-dropdown>
        </td>
      </template>

      <template #column-created_at="{props}">
        <td>
          <div>
            {{props.row.humanElapsedCreationTime}}
            <q-tooltip anchor="bottom right">
              {{`${props.row.createdAt}`}}
            </q-tooltip>
          </div>
        </td>
      </template>

      <template #grid="{props}" ref="template_grid">
        <q-card flat class="bg-grey-2 ticket_card q-ma-sm q-pa-xs" :ref="`card_${props.row.id}`">
          <q-card-section>
            <div class="text-h6">
              <q-icon name="fas fa-exclamation-circle" size="20px" :color="emergencyColor(props.row.emergency)" class="q-mr-xs" >
                <q-tooltip anchor="bottom right">
                  {{`Prioridade: ${props.row.translatedEmergency}`}}
                </q-tooltip>
              </q-icon>
              <q-icon :name="statusIcon(props.row.status)" size="20px" color="primary">
                <q-tooltip anchor="bottom right">
                  {{`Status: ${props.row.translatedStatus}`}}
                </q-tooltip>
              </q-icon>
              {{props.row.ticketType.name}}
            </div>
            <div class="text-subtitle2">{{props.row.user.name}}</div>
          </q-card-section>

          <q-card-section>
            {{ props.row.description.substring(0, 115) }}
          </q-card-section>

          <q-space></q-space>

          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-btn
                        unelevated
                        outline
                        label="Detalhes"
                        color="primary"
                        :to="{name: 'ticket', params: {id: props.row.id}}"
                >
                  <q-badge color="grey-8" floating>{{props.row.ticketMessages.length}}</q-badge>
                </q-btn>
              </div>
              <div class="col-6">
                <q-btn-dropdown unelevated color="primary" label="Status">
                  <q-list>
                    <q-item-label header>Status Atual: <b>{{props.row.translatedStatus}}</b></q-item-label>

                    <q-item clickable v-close-popup @click="changeStatus(props.row, 'in_attendance')">

                      <q-item-section avatar>
                        <q-icon color="primary" name="fas fa-star-half-alt" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Trocar p/ Em Atendimento</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="changeStatus(props.row, 'closed')">

                      <q-item-section avatar>
                        <q-icon color="primary" name="fas fa-star" />
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Trocar p/ Finalizado</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
            </div>

          </q-card-section>

          <div class="relative-position vertical-bottom">
            <q-card-section class="relative-position vertical-bottom">
              <div class="float-left">
                {{props.row.humanElapsedCreationTime}}
              </div>
              <div class="float-right">
                {{props.row.createdAt}}
              </div>
            </q-card-section>
          </div>
        </q-card>
      </template>
    </Manager>
  </div>
</template>

<script>
import Manager from '../base/Manager'
import Ticket from '../../models/Ticket'
import { cloneDeep } from 'lodash'

export default {
  name: 'TicketManager',
  data () {
    return {
      modelInstance: new Ticket(),
      tableTitle: 'Chamados',
      tableColumns: [
        {
          name: 'emergency',
          label: this.$q.screen.lt.md ? 'Prioridade' : 'P',
          field: 'emergency',
          align: 'center',
          sortable: true,
          template: true
        },
        {
          name: 'status',
          label: this.$q.screen.lt.md ? 'Status' : 'S',
          field: 'status',
          align: 'center',
          sortable: true,
          template: true
        },
        // {
        //   name: 'id',
        //   label: 'ID',
        //   field: 'id',
        //   align: 'left',
        //   sortable: true
        // },
        {
          name: 'type',
          label: 'Tipo',
          field: row => row.ticketType.name,
          align: 'left',
          sortable: true
        },
        {
          name: 'description',
          label: 'Descrição',
          field: 'description',
          format: (val, row) => `${val?.substring(0, 36)}...`,
          align: 'left',
          sortable: false,
          template: true
        },
        {
          name: 'user',
          label: 'Usuário',
          field: row => row.user.name,
          align: 'left',
          sortable: true
        },
        {
          name: 'created_at',
          label: 'Criado Em',
          field: 'createdAt',
          align: 'left',
          sortable: true,
          template: true
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'left',
          sortable: false,
          template: true
        }
      ]
    }
  },
  methods: {
    emergencyColor (emergency) {
      switch (emergency?.toLowerCase()) {
        case 'low':
          return 'yellow-8'
        case 'intermediate':
          return 'orange-8'
        case 'high':
          return 'red-8'
        default:
          return 'gray'
      }
    },
    statusIcon (status) {
      switch (status?.toLowerCase()) {
        case 'new':
          return 'far fa-star'
        case 'in_attendance':
          return 'fas fa-star-half-alt'
        case 'closed':
          return 'fas fa-star'
        default:
          return 'far fa-star'
      }
    },
    async changeStatus (ticket, status) {
      const ticketCopy = cloneDeep(ticket)
      ticketCopy.status = status

      const res = await this.$store.dispatch(`${this.resName}/save`, { [this.resName]: ticketCopy })
      if (res) {
        this.$q.notify({ message: 'Status alterado com sucesso', type: 'positive', icon: 'fas fa-check-circle' })
      } else {
        this.$q.notify({ message: 'Erro ao alterar status', type: 'negative', icon: 'fas fa-exclamation-triangle' })
      }
    }
  },
  computed: {
    resName () {
      return this.modelInstance.singularResourceName
    }
  },
  components: {
    Manager
  }
}
</script>

<style scoped>
  .ticket_card {
    width: 100%;
    max-width: 300px;
    height: 100%;
    min-height: 290px;
    max-height: 290px;
  }
</style>
