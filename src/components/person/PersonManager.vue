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

              <q-item clickable v-close-popup :to="{name: 'person_vehicles', query: {id: props.row.id }}">
<!--                <q-item clickable v-close-popup :to="{name: 'person_vehicles', params: { person: props.row }}">-->
                <q-item-section avatar>
                  <q-avatar icon="fas fa-car" text-color="primary"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>Veículos</q-item-label>
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
              {{ props.row.name }}
            </div>
          </q-card-section>

          <q-card-section>
            <div class="text-subtitle2">CPF</div>
            {{ props.row.cpf }}
          </q-card-section>

          <q-card-section>
            <div class="text-subtitle2">Telefone</div>
            {{ props.row.phone }}
          </q-card-section>

          <q-card-section>
            <div class="text-subtitle2">Tipo</div>
            {{ props.row.personType.name }}
          </q-card-section>

          <q-space></q-space>

          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-btn
                      unelevated
                      label="Editar"
                      color="primary"
                      :to="{name: 'edit_person', params: {formModel: props.row}}"
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
import Person from '../../models/Person'

export default {
  name: 'PersonManager',
  data () {
    return {
      modelInstance: new Person(),
      tableTitle: 'Pessoas',
      tableColumns: [
        {
          name: 'name',
          label: 'Nome',
          field: 'name',
          align: 'left'
        },
        {
          name: 'person_type',
          label: 'Tipo',
          field: person => person.personType.name,
          align: 'left'
        },
        {
          name: 'cpf',
          label: 'CPF',
          field: 'cpf',
          align: 'left'
        },
        {
          name: 'phone',
          label: 'Telefone',
          field: 'phone',
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
    min-height: 280px;
    max-height: 290px;
  }
</style>
