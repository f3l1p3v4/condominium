<template>
  <div class="q-gutter-y-md">
    <div class="row q-col-gutter-sm">
      <div class="col-12">
        <q-input
                v-model="filterTerms"
                debounce="500"
                outlined
                clearable
                placeholder="Buscar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <q-list class="rounded-borders" >
      <q-item-label header>Entregas</q-item-label>

      <q-item flat class="bg-grey-2 delivery_card q-ma-sm q-pa-xs" clickable v-ripple v-for="delivery in getAllData" :key="delivery.id" :to="{name: 'delivery', params: {id: delivery.id}}">
        <div>
          <q-item-label class="q-ma-xs" lines="1">{{`${delivery.recipient.name}`}}</q-item-label>
          <q-item-section>
            <q-item-label class="q-ma-xs" caption lines="2">
              {{delivery.description}}
            </q-item-label>
          </q-item-section>
        </div>
    </q-item>
    </q-list>
  </div>
</template>

<script>

export default {
  name: 'DeliveryList',
  data () {
    return {
      filterTerms: ''
    }
  },
  computed: {
    getAllData () {
      let res

      res = this.$store.getters['delivery/getData']

      if (this.filterTerms?.length >= 3) {
        res = res.filter(delivery => delivery.description?.toLowerCase().includes(this.filterTerms?.toLowerCase()))
      }

      return res
    }
  },
  beforeMount () {
    this.$store.dispatch('delivery/fetchFromAPI')
  }
}
</script>

<style scoped>

</style>
