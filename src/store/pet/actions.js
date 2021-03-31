import Pet from '../../models/Pet'

export async function fetchFromAPI ({ commit }) {
  commit('SET_LOADING_DATA', true)
  commit('SET_DATA', await Pet.getAll())
  commit('SET_LOADING_DATA', false)
}

export async function save ({ commit }, payload) {
  const response = await payload.pet.save()
  if (response.success === true) {
    commit('UPDATE_DATA', response.data)
  }
  return response
}

export async function destroy ({ commit }, payload) {
  const response = await payload.pet.destroy()
  if (response.success === true) {
    commit('REMOVE_PET', payload)
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
