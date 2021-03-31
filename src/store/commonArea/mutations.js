import CommonArea from '../../models/CommonArea'

export function SET_DATA (state, data) {
  state.data = data
}

export function UPDATE_DATA (state, resData) {
  const resObj = new CommonArea(resData)
  const objIndex = state.data.findIndex(Obj => Obj.id === resObj.id)

  if (objIndex >= 0) {
    state.data.splice(objIndex, 1, resObj)
  } else {
    state.data.push(resObj)
  }
}

export function REMOVE_DATA (state, payload) {
  const objIndex = state.data.findIndex(Obj => Obj.id === payload?.['common_area']?.id)

  if (objIndex >= 0) {
    state.data.splice(objIndex, 1)
  }
}
