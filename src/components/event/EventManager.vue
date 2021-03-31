<template>
  <div>
    <Manager
        :model-instance="modelInstance"
        :table-title="tableTitle"
        :table-columns="tableColumns"
    >

      <template #column-actions="{props, edit, destroy}">
        <td>
          <q-btn-dropdown color="primary" flat rounded icon="fas fa-cog">
            <q-list>

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

            </q-list>
          </q-btn-dropdown>

        </td>
      </template>

      <template #grid="{props, destroy}" ref="template_grid">
        <q-card flat class="bg-grey-2 found_card q-ma-sm q-pa-xs" :ref="`card_${props.row.id}`">
          <q-card-section>
            <div class="text-h6">
              {{ props.row.title }}
            </div>
          </q-card-section>

          <q-card-section>
            {{ props.row.description }}
          </q-card-section>

          <q-card-section>
            {{ localizeDate(props.row.date) }}
          </q-card-section>

          <q-space></q-space>

          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-btn
                      unelevated
                      label="Editar"
                      color="primary"
                      :to="{name: 'edit_event', params: {formModel: props.row}}"
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
              <div class="float-right">
                Criado em {{props.row.createdAt}}
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
import Event from '../../models/Event'
import { date } from 'quasar'

export default {
  name: 'PersonManager',
  data () {
    return {
      modelInstance: new Event(),
      tableTitle: 'Eventos',
      tableColumns: [
        {
          name: 'title',
          label: 'Título',
          field: 'title',
          align: 'left'
        },
        {
          name: 'description',
          label: 'Descrição',
          field: 'description',
          align: 'left'
        },
        {
          name: 'date',
          label: 'Data',
          field: 'date',
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
  .found_card {
    width: 100%;
    max-width: 300px;
    height: 100%;
    min-height: 200px;
    max-height: 290px;
  }
</style>
