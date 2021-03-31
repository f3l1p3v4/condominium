import Vue from 'vue'
import Vuex from 'vuex'

import layout from './layout'
import user from './user'
import auth from './auth'
import ticket from './ticket'
import ticketType from './ticketType'
import condo from './condo'
import commonArea from './commonArea'
import commonAreaReservation from './commonAreaReservation'
import delivery from './delivery'
import found from './found'
import person from './person'
import personType from './personType'
import event from './event'
import pet from './pet'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      layout,
      auth,
      user,
      ticket,
      ticketType,
      condo,
      commonArea,
      commonAreaReservation,
      delivery,
      found,
      person,
      personType,
      event,
      pet
    },

    // enable strict mode (adds overhead!)
    // for dev.env mode only
    strict: process.env.DEV
  })

  return Store
}
