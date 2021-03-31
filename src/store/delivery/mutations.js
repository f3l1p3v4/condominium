import Delivery from '../../models/Delivery'

export function SET_DATA (state, data) {
  state.data = data
}

export function UPDATE_DATA (state, userData) {
  const deliveryObj = new Delivery(userData)
  const deliveryIndex = state.data.findIndex(Delivery => Delivery.id === deliveryObj.id)

  if (deliveryIndex >= 0) {
    state.data.splice(deliveryIndex, 1, deliveryObj)
  } else {
    state.data.push(deliveryObj)
  }
}

export function REMOVE_DELIVERY (state, payload) {
  const userIndex = state.data.findIndex(User => User.id === payload?.User?.id)

  if (userIndex >= 0) {
    state.data.splice(userIndex, 1)
  }
}

export function SET_LOADING_DATA (state, loading) {
  this.isLoadingData = loading
}
