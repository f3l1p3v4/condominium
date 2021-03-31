import Pet from '../../models/Pet'

export function SET_DATA (state, data) {
  state.data = data
}

export function UPDATE_DATA (state, userData) {
  const petObj = new Pet(userData)
  const petIndex = state.data.findIndex(Pet => Pet.id === petObj.id)

  if (petIndex >= 0) {
    state.data.splice(petIndex, 1, petObj)
  } else {
    state.data.push(petObj)
  }
}

export function REMOVE_PET (state, payload) {
  const petIndex = state.data.findIndex(Pet => Pet.id === payload?.pet?.id)

  if (petIndex >= 0) {
    state.data.splice(petIndex, 1)
  }
}

export function SET_LOADING_DATA (state, loading) {
  this.isLoadingData = loading
}
