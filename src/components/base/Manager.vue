<template>
  <div class="q-pa-md">
    <q-table
            :columns="tableColumns"
            :data="getAllData"
            :loading="tableIsLoadingData"
            row-key="id"
            :title="tableTitle"
            :filter="filter"
            :grid="$q.screen.lt.md"
            :pagination.sync="pagination"
            binary-state-sort
            flat
    >
      <!-- QTable top slot insertion -->
      <template #top="props">

        <!-- Default new resource button -->
        <div class="col-xs-4 col-sm-3 col-md-3" v-if="newResBtn">
          <q-btn color="primary" unelevated :disable="tableLoading" label="Novo" @click="newResource"  />
        </div>

        <!-- Filter input -->
        <div class="col-xs-8 col-sm-6 col-md-6">
          <q-input  debounce="300" outlined v-model="filter" clearable placeholder="Procurar">
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <!-- Fullscreen button -->
        <div v-if="$q.screen.gt.sm" class="col-xs-4 col-sm-4 col-md-1">
          <q-btn
                  flat round dense
                  :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                  @click="props.toggleFullscreen"
          />
        </div>

    <!-- Slot for extra action buttons (for q-table top) -->
        <slot name="actions" />
      </template>

      <!-- slots for custom columns definitions -->
      <template v-for="(column, i) in tableColumnsNames" #[`body-cell-${column}`]="props">
        <slot :name="`column-${column}`" :props="props" :edit="editResource" :destroy="destroyResource">
          <td :key="i">{{props.row.fields[column]}}</td>
        </slot>
      </template>

      <!-- Slot for grid mode -->
      <template v-if="$scopedSlots.grid" #item="props">
        <slot name="grid" :props="props" :destroy="destroyResource" />
      </template>

    </q-table>

    <slot name="modalForm"/>

    <!-- remove resource confirmation dialog --->
    <q-dialog v-model="removeResDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="fas fa-trash" text-color="red" />
          <span class="q-ml-sm">Tem certeza disso? Esse processo não pode ser desfeito! Os dados apagados não poderão ser recuperados</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn unelevated label="Cancelar" color="secondary" v-close-popup />
          <q-btn unelevated label="Remover" color="primary" @click="destroyResource" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { modelFactory, snakeToCamel } from '../../lib/Common'
import { Notify } from 'quasar'
// import Ticket from '../../models/Ticket'
export default {
  name: 'Manager',
  props: {
    modelInstance: {
      type: Object,
      required: true
    },
    modelFilter: {
      type: Object,
      required: false
    },
    customScope: {
      type: String,
      required: false
    },
    customScopeParams: {
      type: Object,
      required: false
    },
    tableTitle: {
      type: String,
      required: true
    },
    tableColumns: {
      type: Array,
      required: true
    },
    modelCustomData: {
      type: Object,
      required: false
    },
    newResBtn: {
      type: Boolean,
      required: false,
      default: true
    },
    defaultActions: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      tableLoading: false,
      formModel: {},
      newResAllowed: true,
      removeResDialog: false,
      inFullscreen: false,
      filter: '',
      pagination: {
        sortBy: 'id',
        descending: true,
        rowsPerPage: 25
      }
    }
  },
  methods: {
    newResource () {
      const formModel = modelFactory(this.modelInstance.singularResourceName, this.modelCustomData)
      this.$router.push({ name: `new_${formModel.singularResourceName}`, params: { formModel: formModel } })
    },
    editResource (resObj) {
      this.$router.push({ name: `edit_${resObj.singularResourceName}`, params: { formModel: resObj } })
    },
    destroyResource (resObj) {
      this.$q.dialog({
        title: 'Você tem certeza disso?',
        message: 'Esse processo não poderá ser desfeito! Os dados perdidos não poderão ser recuperados!',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        const response = await this.$store.dispatch(`${snakeToCamel(resObj.singularResourceName)}/destroy`, { [resObj.singularResourceName]: resObj })
        if (response.success === true) {
          Notify.create({ message: 'Removido com sucesso', type: 'positive', icon: 'fas fa-check-circle' })
        } else if (response.status === 422) {
          Notify.create({ message: 'Erro ao remover dados', type: 'negative', icon: 'fas fa-exclamation-triangle' })
        } else if (response.status === 403) {
          Notify.create({ message: 'Ação não autorizada', type: 'negative', icon: 'fas fa-exclamation-triangle' })
        }
      })
      // const formModel = modelFactory(this.modelInstance.singularResourceName, resObj)
    }
  },
  computed: {
    getAllData () {
      if (this.customScope) {
        return this.$store.getters[`${snakeToCamel(this.modelInstance.singularResourceName)}/${this.customScope}`](this.customScopeParams)
      } else {
        return this.$store.getters[`${snakeToCamel(this.modelInstance.singularResourceName)}/getData`]
      }
    },
    tableColumnsNames () {
      return this.tableColumns.filter(column => column.template).map(column => column.name)
    },
    tableIsLoadingData () {
      return this.$store.getters[`${snakeToCamel(this.modelInstance.singularResourceName)}/isLoadingData`]
    }
  },
  beforeMount () {
    this.$store.dispatch(`${snakeToCamel(this.modelInstance.singularResourceName)}/fetchFromAPI`, this.modelFilter)
  },
  mounted () {
    this.$emit('refs', this.$refs)
    this.$emit('table-data', this.getAllData)
  }
}
</script>

<style scoped>

</style>
