<template>
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

    <template #grid="{props}" ref="template_grid">
      <q-card flat class="bg-grey-2 ticket_card q-ma-sm q-pa-xs" :ref="`card_${props.row.id}`">
        <q-card-section>
          <div class="text-h6">
            {{props.row.name}}
          </div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-btn
                unelevated
                label="Editar"
                color="primary"
                :to="{name: 'edit_person_type', params: {formModel: props.row}}"
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
              {{`Data de Criação: ${props.row.createdAt}`}}
            </div>
          </q-card-section>
        </div>
      </q-card>
    </template>

  </Manager>
</template>

<script>
import Manager from '../base/Manager'
import PersonType from '../../models/PersonType'

export default {
  name: 'PersonTypeManager',
  data () {
    return {
      modelInstance: new PersonType(),
      tableTitle: 'Tipos de Pessoas',
      tableColumns: [
        {
          name: 'name',
          label: 'Nome',
          field: 'name',
          align: 'left',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Ações',
          align: 'left',
          sortable: false,
          template: true
        }
      ],
      modal: false,
      curRes: {}
    }
  },
  components: {
    Manager
  }
}
</script>

<style scoped>

</style>
