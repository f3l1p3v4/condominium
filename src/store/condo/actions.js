import Condo from '../../models/Condo'

export async function fetchFromAPI ({ commit }) {
  commit('SET_DATA', await Condo.getAll())
}

export async function save ({ commit }, payload) {
  const response = await payload.condo.save()
  if (response.success === true) {
    commit('UPDATE_DATA', response.data)
  }
  return response
}

export async function destroy ({ commit }, payload) {
  const response = await payload.condo.destroy()
  if (response.success === true) {
    commit('REMOVE_DATA', payload)
  }
  return response
}
