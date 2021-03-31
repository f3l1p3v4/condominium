<template>
  <div class="q-pa-sm q-gutter-y-md">
    <div class="row">
      <div class="float-left col">
        <q-btn unelevated round size="sm" color="primary" icon="fas fa-arrow-left" @click="$router.go(-1)" />
      </div>

      <div class="float-right col">
        <q-btn v-if="$auth.can('canDestroyDelivery', { delivery: delivery })"
               unelevated
               round
               size="sm"
               color="red"
               icon="fas fa-trash"
               class="q-ml-sm float-right"
               @click="destroyDelivery"
        />
        <q-btn v-if="$auth.can('canEditDelivery', { delivery: delivery })"
               unelevated
               round
               size="sm"
               color="primary"
               icon="fas fa-edit"
               class="q-ml-sm float-right"
               :to="{ name: `edit_${delivery.singularResourceName}`, params: { formModel: delivery } }"
        />
      </div>

    </div>
    <div class="text-h4">
      [{{delivery.recipient.name}}]
    </div>

    <div class="row">
      <div class="column">
        <q-chip size="md" outline square icon="fas fa-clock">
          {{delivery.createdAt}}
        </q-chip>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class=" delivery-description text-weight-bold">{{delivery.description}}</div>
      </div>
      <q-separator></q-separator>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script>
import Delivery from '../../models/Delivery'

export default {
  name: 'DeliveryDetails',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      delivery: new Delivery(),
      loading: true
    }
  },
  methods: {
    destroyDelivery () {
      this.$q.dialog({
        title: 'Você tem certeza disso?',
        message: 'Esse processo não poderá ser desfeito! Os dados perdidos não poderão ser recuperados!',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        const response = await this.delivery.destroy()
        if (response?.success === true) {
          this.$q.notify({ message: 'Removido com sucesso', type: 'positive', icon: 'fas fa-check-circle' })
          this.$router.push({ name: 'deliveries_list' })
        } else {
          this.$q.notify({ message: 'Erro ao remover dados', type: 'negative', icon: 'fas fa-exclamation-triangle' })
        }
      })
    }
  },
  computed: {
    DeliveryUserID () {
      return this.delivery?.user?.id
    },
    userID () {
      return this.$store.getters['auth/getID']
    }
  },
  async beforeMount () {
    this.ticket = await Delivery.get(this.id)
    this.loading = false
  }
}
</script>
