import Event from '../../models/Event'

export function SET_DATA (state, data) {
  state.data = data
}

export function UPDATE_DATA (state, eventData) {
  const eventObj = new Event(eventData)
  const eventIndex = state.data.findIndex(Event => Event.id === eventObj.id)

  if (eventIndex >= 0) {
    state.data.splice(eventIndex, 1, eventObj)
  } else {
    state.data.push(eventObj)
  }
}

export function REMOVE_EVENT (state, payload) {
  const eventIndex = state.data.findIndex(Event => Event.id === payload?.event?.id)

  if (eventIndex >= 0) {
    state.data.splice(eventIndex, 1)
  }
}

export function SET_LOADING_DATA (state, loading) {
  this.isLoadingData = loading
}
