<template>
  <q-page class="flex">
    <PetManager />
  </q-page>
</template>

<script>
import PetManager from 'components/pet/PetManager'
export default {
  name: 'PetIndexPage',
  components: { PetManager }
}
</script>
