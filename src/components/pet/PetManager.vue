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
            <div class="row">
              <div class="col">
                <div class="text-subtitle2">Raça</div>
                {{ props.row.race }}
              </div>

              <div class="col">
                <div class="text-subtitle2">Cor</div>
                {{ props.row.color }}
              </div>
            </div>
          </q-card-section>

          <q-card-section>
            <div class="text-subtitle2">Proprietário</div>
            {{ props.row.person.name }}
          </q-card-section>

          <q-space></q-space>

          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-btn
                  unelevated
                  label="Editar"
                  color="primary"
                  :to="{name: 'edit_pet', params: {formModel: props.row}}"
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
import Pet from '../../models/Pet'

export default {
  name: 'VehicleManager',
  data () {
    return {
      modelInstance: new Pet(),
      tableTitle: 'Animais',
      tableColumns: [
        {
          name: 'name',
          label: 'Nome',
          field: 'name',
          align: 'left'
        },
        {
          name: 'race',
          label: 'Raça',
          field: 'race',
          align: 'left'
        },
        {
          name: 'color',
          label: 'Cor',
          field: 'color',
          align: 'left'
        },
        {
          name: 'person',
          label: 'Proprietário',
          field: vehicle => vehicle.person.name,
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
    max-height: 310px;
  }
</style>
