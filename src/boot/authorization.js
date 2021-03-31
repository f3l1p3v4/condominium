import Vue from 'vue'
import AuthEngine from '../lib/Authorization'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ store }) => {
  Vue.prototype.$auth = new AuthEngine(store)
}
