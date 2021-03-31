<template>
  <div>
    <Manager
        :model-instance="modelInstance"
        :table-title="tableTitle"
        :table-columns="tableColumns"
        :newResBtn="$auth.can('createNewDelivery')"
    >

      <template #column-actions="{props, edit, destroy}">
        <td>
          <q-btn-dropdown color="primary" flat rounded icon="fas fa-cog">
            <q-list>

              <q-item clickable v-close-popup @click="edit(props.row)" v-if="$auth.can('editDelivery')">
                <q-item-section avatar>
                  <q-avatar icon="fas fa-edit" text-color="primary"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Editar</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="destroy(props.row)" v-if="$auth.can('destroyDelivery')">
                <q-item-section avatar>
                  <q-avatar icon="fas fa-trash" text-color="red"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Remover</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup v-if="props.row.rawStatus === 'registered'" @click="setDeliveredStatus(props.row)">
                <q-item-section avatar>
                  <q-avatar icon="fas fa-check" text-color="primary"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Marcar como Entregue</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-btn-dropdown>

        </td>
      </template>

      <template #grid="{props, edit, destroy}" ref="template_grid">
        <q-card flat class="bg-grey-2 delivery_card q-ma-sm q-pa-xs" :ref="`card_${props.row.id}`">
          <q-card-section>
            <div class="text-h6">
              {{props.row.recipient.name}}
            </div>
          </q-card-section>

          <q-card-section>
            {{ props.row.description }}
          </q-card-section>

          <q-card-section>
            {{ props.row.observations }}
          </q-card-section>

          <q-card-section>
            Situação: <b>{{props.row.status}}</b>
          </q-card-section>

          <q-space></q-space>

          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-4">
                <q-btn
                      unelevated
                      label="Editar"
                      color="primary"
                      :to="{name: 'edit_delivery', params: {formModel: props.row}}"
                >
                </q-btn>
              </div>

              <div class="col-4">
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

          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <q-btn
                  unelevated
                  label="Marcar como Entregue"
                  color="primary"
                  v-if="props.row.rawStatus === 'registered'"
                  @click="setDeliveredStatus(props.row)"
                >
                </q-btn>
              </div>
            </div>
          </q-card-section>

          <div class="relative-position vertical-bottom">
            <q-card-section class="relative-position vertical-bottom">
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
import Delivery from '../../models/Delivery'
import { cloneDeep } from 'lodash'

export default {
  name: 'DeliveryManager',
  data () {
    return {
      modelInstance: new Delivery(),
      tableTitle: 'Entregas',
      tableColumns: [
        {
          name: 'recipient',
          label: 'Destinatário',
          field: row => row.recipient.name,
          align: 'left'
        },
        {
          name: 'responsible',
          label: 'Responsável',
          field: row => row.responsible.name,
          align: 'left'
        },
        {
          name: 'status',
          label: 'Status',
          field: 'status',
          align: 'left'
        },
        {
          name: 'description',
          label: 'Descrição',
          field: 'description',
          align: 'left'
        },
        {
          name: 'observations',
          label: 'Observações',
          field: 'observations',
          align: 'left'
        },
        {
          name: 'created_at',
          label: 'Criado Em',
          field: 'createdAt',
          align: 'left'
        },
        {
          name: 'actions',
          label: 'Acões',
          align: 'left',
          sortable: true,
          template: true
        }
      ]
    }
  },
  methods: {
    async setDeliveredStatus (delivery) {
      const deliveryCopy = cloneDeep(delivery)
      deliveryCopy.status = 'delivered'

      const res = await this.$store.dispatch(`${deliveryCopy.singularResourceName}/save`, { [deliveryCopy.singularResourceName]: deliveryCopy })
      if (res) {
        this.$q.notify({ message: 'Status alterado com sucesso', type: 'positive', icon: 'fas fa-check-circle' })
      } else {
        this.$q.notify({ message: 'Erro ao alterar status', type: 'negative', icon: 'fas fa-exclamation-triangle' })
      }
    }
  },
  components: {
    Manager
  }
}
</script>

<style scoped>
  .delivery_card {
    width: 100%;
    max-width: 300px;
    height: 100%;
    min-height: 340px;
    max-height: 390px;
  }
</style>
