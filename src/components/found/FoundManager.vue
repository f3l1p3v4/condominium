<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-xs-12">
        <q-btn-toggle
          v-model="filterFoundType"
          rounded
          unelevated
          spread
          toggle-color="primary"
          color="white"
          text-color="primary"
          :options="[
          {label: 'Achados', value: 'found'},
          {label: 'Perdidos', value: 'lost'}
        ]"
        />
      </div>
    </div>

    <Manager
        :model-instance="modelInstance"
        :table-title="tableTitle"
        :table-columns="tableColumns"
        :custom-scope="filterFoundType"
    >

      <template #column-actions="{props, edit, destroy}">
        <td>
          <q-btn-dropdown color="primary" flat rounded icon="fas fa-cog">
            <q-list>

              <q-item clickable v-close-popup @click="edit(props.row)" v-if="$auth.can('editFound', { found: props.row })">
                <q-item-section avatar>
                  <q-avatar icon="fas fa-edit" text-color="primary"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Editar</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="destroy(props.row)" v-if="props.row.user.id === $auth.userID">
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
            {{ props.row.description }}
          </q-card-section>

          <q-space></q-space>

          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-btn
                      unelevated
                      label="Editar"
                      color="primary"
                      :to="{name: 'edit_found', params: {formModel: props.row}}"
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
import Found from '../../models/Found'

export default {
  name: 'FoundManager',
  data () {
    return {
      modelInstance: new Found(),
      filterFoundType: 'found',
      tableTitle: 'Perdidos',
      tableColumns: [
        {
          name: 'found_type',
          label: 'Tipo',
          field: 'foundType',
          align: 'left'
        },
        {
          name: 'user',
          label: 'Usuário',
          field: row => row.user.name,
          sortable: true,
          align: 'left'
        },
        {
          name: 'description',
          label: 'Descrição',
          field: 'description',
          sortable: true,
          align: 'left'
        },
        {
          name: 'created_at',
          label: 'Criado Em',
          field: 'createdAt',
          sortable: true,
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
