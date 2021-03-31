<template>
  <q-page class="flex">
    <UserManager />
  </q-page>
</template>

<script>
import UserManager from '../components/user/UserManager'
export default {
  name: 'UserIndexPage',
  components: {
    UserManager
  }
}
</script>
