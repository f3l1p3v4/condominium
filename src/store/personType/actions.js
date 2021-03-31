import PersonType from '../../models/PersonType'

export async function fetchFromAPI ({ commit }) {
  commit('SET_DATA', await PersonType.getAll())
}

export async function save ({ commit }, payload) {
  console.log(payload)
  const response = await payload.person_type.save()
  if (response.success === true) {
    commit('UPDATE_DATA', response.data)
  }
  return response
}

export async function destroy ({ commit }, payload) {
  const response = await payload.person_type.destroy()
  if (response.success === true) {
    commit('REMOVE_DATA', payload)
  }
  return response
}
