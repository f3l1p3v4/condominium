<template>
  <Manager
          :model-instance="modelInstance"
          :table-title="tableTitle"
          :table-columns="tableColumns"
  >
    <!--    <template #column-actions>-->
    <!--      <td><p>Bruno</p></td>-->
    <!--    </template>-->

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
                <q-avatar icon="fas fa-edit" text-color="primary"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Remover</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-btn-dropdown>

      </td>
    </template>

    <!--    <template #modalForm>-->
    <!--&lt;!&ndash;      <CondoModalForm v-model="modal" :form-model="curRes" :title="modalTitle" />&ndash;&gt;-->
    <!--    </template>-->

  </Manager>
</template>

<script>
import Manager from '../base/Manager'
import Condo from '../../models/Condo'

export default {
  name: 'CondoManager',
  data () {
    return {
      modelInstance: new Condo(),
      tableTitle: 'Condomínios',
      tableColumns: [
        {
          name: 'id',
          label: 'ID',
          field: 'id',
          align: 'left',
          sortable: true
        },
        {
          name: 'name',
          label: 'Name',
          field: 'name',
          align: 'left',
          sortable: true
        },
        {
          name: 'actions',
          label: 'Actions',
          align: 'left',
          sortable: true
        }
      ],
      modal: false,
      curRes: {},
      modalTitle: 'Condo'
    }
  },
  components: {
    Manager
  }
}
</script>

<style scoped>

</style>
