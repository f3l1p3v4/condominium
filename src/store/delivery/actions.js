import Delivery from '../../models/Delivery'

export async function fetchFromAPI ({ commit }) {
  commit('SET_LOADING_DATA', true)
  commit('SET_DATA', await Delivery.getAll())
  commit('SET_LOADING_DATA', false)
}

export async function save ({ commit }, payload) {
  const response = await payload.delivery.save()
  if (response.success === true) {
    commit('UPDATE_DATA', response.data)
  }
  return response
}

export async function destroy ({ commit }, payload) {
  const response = await payload.delivery.destroy()
  if (response.success === true) {
    commit('REMOVE_DELIVERY', payload)
  }
  return response
}

export async function updateFields ({ commit, dispatch }, payload) {
  const obj = payload.obj
  const fields = payload.fields

  console.log(obj, fields)

  Object.entries(fields).forEach(field => {
    obj[field[0]] = field[1]
  })

  console.log('new obj', obj)

  dispatch('save', obj)
}
