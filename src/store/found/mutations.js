import Found from '../../models/Found'

export function SET_DATA (state, data) {
  state.data = data
}

export function UPDATE_DATA (state, userData) {
  const foundObj = new Found(userData)
  const foundIndex = state.data.findIndex(Found => Found.id === foundObj.id)

  if (foundIndex >= 0) {
    state.data.splice(foundIndex, 1, foundObj)
  } else {
    state.data.push(foundObj)
  }
}

export function REMOVE_FOUND (state, payload) {
  const userIndex = state.data.findIndex(Found => Found.id === payload?.found?.id)

  if (userIndex >= 0) {
    state.data.splice(userIndex, 1)
  }
}

export function SET_LOADING_DATA (state, loading) {
  this.isLoadingData = loading
}
