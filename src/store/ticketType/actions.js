import TicketType from '../../models/TicketType'

export async function fetchFromAPI ({ commit }) {
  commit('SET_DATA', await TicketType.getAll())
}

export async function save ({ commit }, payload) {
  console.log(payload)
  const response = await payload.ticket_type.save()
  if (response.success === true) {
    commit('UPDATE_DATA', response.data)
  }
  return response
}

export async function destroy ({ commit }, payload) {
  const response = await payload.ticket_type.destroy()
  if (response.success === true) {
    commit('REMOVE_DATA', payload)
  }
  return response
}
