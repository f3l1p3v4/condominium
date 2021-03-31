import PersonType from '../../models/PersonType'

export function SET_DATA (state, data) {
  state.data = data
}

export function UPDATE_DATA (state, resData) {
  const resObj = new PersonType(resData)
  const objIndex = state.data.findIndex(Obj => Obj.id === resObj.id)

  if (objIndex >= 0) {
    state.data.splice(objIndex, 1, resObj)
  } else {
    state.data.push(resObj)
  }
}

export function REMOVE_DATA (state, payload) {
  const objIndex = state.data.findIndex(Obj => Obj.id === payload?.['person_type']?.id)

  if (objIndex >= 0) {
    state.data.splice(objIndex, 1)
  }
}
