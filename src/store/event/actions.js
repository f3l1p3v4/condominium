import Event from '../../models/Event'

export async function fetchFromAPI ({ commit }) {
  commit('SET_LOADING_DATA', true)
  commit('SET_DATA', await Event.getAll())
  commit('SET_LOADING_DATA', false)
}

export async function save ({ commit }, payload) {
  const response = await payload.event.save()
  if (response.success === true) {
    commit('UPDATE_DATA', response.data)
  }
  return response
}

export async function destroy ({ commit }, payload) {
  const response = await payload.event.destroy()
  if (response.success === true) {
    commit('REMOVE_EVENT', payload)
  }
  return response
}

export async function updateFields ({ commit, dispatch }, payload) {
  const obj = payload.obj
  const fields = payload.fields

  Object.entries(fields).forEach(field => {
    obj[field[0]] = field[1]
  })

  dispatch('save', obj)
}
