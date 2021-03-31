import Person from '../../models/Person'

export async function fetchFromAPI ({ commit }) {
  commit('SET_LOADING_DATA', true)
  commit('SET_DATA', await Person.getAll())
  commit('SET_LOADING_DATA', false)
}

export async function save ({ commit }, payload) {
  const response = await payload.person.save()
  if (response.success === true) {
    commit('UPDATE_DATA', response.data)
  }
  return response
}

export async function destroy ({ commit }, payload) {
  const response = await payload.person.destroy()
  if (response.success === true) {
    commit('REMOVE_PERSON', payload)
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
