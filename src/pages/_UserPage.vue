<template>
  <q-page class="flex">
    <UserManager />
  </q-page>
</template>

<script>
import UserManager from '../components/user/_UserManager'
export default {
  name: 'UserPage',
  components: {
    UserManager
  }
}
</script>
