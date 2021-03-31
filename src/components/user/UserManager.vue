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
          <div class="text-subtitle1">{{props.row.translatedUserType}}</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-btn
                      unelevated
                      label="Editar"
                      color="primary"
                      :to="{name: 'edit_user', params: {formModel: props.row}}"
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
import User from '../../models/User'

export default {
  name: 'UserManager',
  data () {
    return {
      modelInstance: new User(),
      tableTitle: 'Usuários',
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
          label: 'Name',
          field: 'name',
          align: 'left',
          sortable: true
        },
        {
          name: 'email',
          label: 'Email',
          field: 'email',
          align: 'left',
          sortable: true
        },
        {
          name: 'translated_user_type',
          label: 'Tipo',
          field: 'translatedUserType',
          align: 'left',
          sortable: true
        },
        {
          name: 'created_at',
          label: 'Data de Criação',
          field: 'createdAt',
          align: 'left',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Acões',
          align: 'left',
          sortable: true,
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
  .ticket_card {
    width: 100%;
    max-width: 300px;
    height: 100%;
    min-height: 220px;
    max-height: 220px;
  }
</style>
