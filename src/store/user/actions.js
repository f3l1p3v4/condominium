import User from '../../models/User'

export async function fetchFromAPI ({ commit }) {
  commit('SET_DATA', await User.getAll())
}

export async function save ({ commit }, payload) {
  const response = await payload.user.save()
  if (response.success === true) {
    commit('UPDATE_DATA', response.data)
  }
  return response
}

export async function destroy ({ commit }, payload) {
  const response = await payload.user.destroy()
  if (response.success === true) {
    commit('REMOVE_USER', payload)
  }
  return response
}
