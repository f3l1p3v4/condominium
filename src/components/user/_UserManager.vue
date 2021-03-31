<template>
  <div class="q-pa-md">
    <q-table
            :columns="columns"
            :data="getAllData"
            :loading="loading"
            :pagination.sync="pagination"
            row-key="id"
            title="Usuários"
            flat
    >
      <template v-slot:top>
        <q-btn color="primary" unelevated :disable="loading" label="Novo" @click="newUser"  />
      </template>
      <template v-slot:body-cell-actions="props">
        <td>
          <q-btn-dropdown color="primary" flat rounded icon="fas fa-cog">
            <q-list>
              <q-item clickable v-close-popup @click="editUser(props.row)">
                <q-item-section avatar>
                  <q-avatar icon="fas fa-edit" text-color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Editar</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="showUserRemoveDialog(props.row)">
                <q-item-section avatar>
                  <q-avatar icon="fas fa-trash" text-color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Remover</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </td>
      </template>
    </q-table>

    <UserModalForm v-model="modal" :form-model="formModel" :title="modalTitle" />

    <q-dialog v-model="removeUserDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="fas fa-trash" text-color="red" />
          <span class="q-ml-sm">Tem certeza disso? Esse processo não pode ser desfeito!</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn unelevated label="Cancelar" color="secondary" v-close-popup />
          <q-btn unelevated label="Remover" color="primary" @click="removeUser" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import User from '../../lib/Constants'
import { notify } from '../../lib/Common'
import { cloneDeep } from 'lodash'
import UserModalForm from './UserModalForm'

export default {
  name: 'UserManager',
  data () {
    return {
      data: [],
      tableLoading: false,
      formModel: {},
      removeResDialog: false,
      modal: false,
      modalTitle: '',
      pagination: { rowsPerPage: 25 },
      tableColumns: [
        { name: 'name', label: 'Nome', field: 'name', align: 'left', sortable: true },
        { name: 'actions', label: 'Ações', align: 'left' }
      ]
    }
  },
  methods: {
    newResource () {
      this.modalTitle = 'Novo Usuário'
      this.modal = true
      this.formModel = new User()
    },
    editResource (userData) {
      this.modalTitle = `Editando ${userData.name}`
      this.modal = true
      this.formModel = cloneDeep(userData)
    },
    async removeResource (userData) {
      const response = await this.$store.dispatch('user/destroy', { agent: this.formModel })
      if (response.success === true) {
        notify('success remove')
      } else {
        notify('fail remove')
      }
    },
    showResourceRemoveDialog (userData) {
      this.removeUserDialog = true
      this.formModel = cloneDeep(userData)
    }
  },
  computed: {
    getAllData () {
      return this.$store.getters['user/getData']
    }
  },
  beforeMount () {
    this.$store.dispatch('user/fetchFromAPI')
  },
  components: { UserModalForm }
}
</script>

<style scoped>

</style>
