import Condo from '../../models/Condo'

export function SET_DATA (state, data) {
  state.data = data
}

export function UPDATE_DATA (state, resData) {
  const resObj = new Condo(resData)
  const objIndex = state.data.findIndex(Obj => Obj.id === resObj.id)

  if (objIndex >= 0) {
    state.data.splice(objIndex, 1, resObj)
  } else {
    state.data.push(resObj)
  }
}

export function REMOVE_DATA (state, payload) {
  const objIndex = state.data.findIndex(Obj => Obj.id === payload?.condo?.id)

  if (objIndex >= 0) {
    state.data.splice(objIndex, 1)
  }
}
