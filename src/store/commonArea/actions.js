import CommonArea from '../../models/CommonArea'

export async function fetchFromAPI ({ commit }) {
  commit('SET_DATA', await CommonArea.getAll())
}

export async function save ({ commit }, payload) {
  const response = await payload.common_area.save()
  if (response.success === true) {
    commit('UPDATE_DATA', response.data)
  }
  return response
}

export async function destroy ({ commit }, payload) {
  const response = await payload.common_area.destroy()
  if (response.success === true) {
    commit('REMOVE_DATA', payload)
  }
  return response
}
