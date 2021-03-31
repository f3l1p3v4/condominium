<template>
  <q-layout view="lHh Lpr lFf" @scroll="scroll_handler">
    <q-header>
      <TopToolbar/>
    </q-header>

    <q-drawer
            :value="leftDrawerOpen"
            behavior="mobile"
            show-if-above
            overlay
            bordered
            elevated
            content-class="bg-grey-1"
            @hide="$store.commit('layout/TOGGLE_LEFT_DRAWER_STATE', false)"
    >
      <LeftMenu/>
    </q-drawer>

      <q-page-container>
        <transition enter-active-class="animated fadeIn" mode="out-in">
          <router-view />
        </transition>
      </q-page-container>
    <q-footer>
    </q-footer>
  </q-layout>
</template>

<script>
import LeftMenu from 'components/layout/LeftMenu'
import TopToolbar from '../components/layout/TopToolbar'

export default {
  name: 'MainLayout',

  components: {
    TopToolbar,
    LeftMenu
  },

  data () {
    return {
      show_menus: true
    }
  },
  methods: {
    scroll_handler (e) {
      // if (e.direction === 'down' && e.position >= 200) {
      //   this.show_menus = false
      // } else if (e.direction === 'up' && e.position <= 100) {
      //   this.show_menus = true
      // }
    }
  },
  computed: {
    leftDrawerOpen () {
      return this.$store.getters['layout/leftDrawerOpen']
    }
  }
}
</script>
