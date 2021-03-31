import Found from '../../models/Found'

export async function fetchFromAPI ({ commit }) {
  commit('SET_LOADING_DATA', true)
  commit('SET_DATA', await Found.getAll())
  commit('SET_LOADING_DATA', false)
}

export async function save ({ commit }, payload) {
  const response = await payload.found.save()
  if (response.success === true) {
    commit('UPDATE_DATA', response.data)
  }
  return response
}

export async function destroy ({ commit }, payload) {
  const response = await payload.found.destroy()
  if (response.success === true) {
    commit('REMOVE_FOUND', payload)
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
