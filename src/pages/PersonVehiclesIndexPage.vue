<template>
  <q-page class="flex">
    <div class="q-ma-sm">
      <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Pessoas" icon="fas fa-user" :to="{name: 'people'}" />
          <q-breadcrumbs-el :label="'teste'" icon="fas fa-user" />
        </q-breadcrumbs>
      </div>

      <VehiclesManager custom-scope="fromUser" :custom-scope-params="{personID: parseInt($route.query.id)}" :person-id=" $route.query.id" />
    </div>
  </q-page>
</template>

<script>
import VehiclesManager from '../components/vehicle/VehicleManager'
export default {
  name: 'PersonVehiclesIndexPage',
  components: { VehiclesManager }
}
</script>

<style scoped>

</style>
