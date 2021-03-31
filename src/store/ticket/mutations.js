import Ticket from '../../models/Ticket'

export function SET_DATA (state, data) {
  state.data = data
}

export function UPDATE_DATA (state, userData) {
  const ticketObj = new Ticket(userData)
  const ticketIndex = state.data.findIndex(ticket => ticket.id === ticketObj.id)

  if (ticketIndex >= 0) {
    state.data.splice(ticketIndex, 1, ticketObj)
  } else {
    state.data.push(ticketObj)
  }
}

export function REMOVE_USER (state, payload) {
  const userIndex = state.data.findIndex(User => User.id === payload?.user?.id)

  if (userIndex >= 0) {
    state.data.splice(userIndex, 1)
  }
}

export function SET_LOADING_DATA (state, loading) {
  this.isLoadingData = loading
}
