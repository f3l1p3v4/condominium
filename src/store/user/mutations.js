import User from '../../models/User'

export function SET_DATA (state, data) {
  state.data = data
}

export function UPDATE_DATA (state, userData) {
  const userObj = new User(userData)
  const userIndex = state.data.findIndex(User => User.id === userObj.id)

  if (userIndex >= 0) {
    state.data.splice(userIndex, 1, userObj)
  } else {
    state.data.push(userObj)
  }
}

export function REMOVE_USER (state, payload) {
  const userIndex = state.data.findIndex(User => User.id === payload?.user?.id)

  if (userIndex >= 0) {
    state.data.splice(userIndex, 1)
  }
}
