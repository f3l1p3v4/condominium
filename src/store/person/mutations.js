import Person from '../../models/Person'

export function SET_DATA (state, data) {
  state.data = data
}

export function UPDATE_DATA (state, userData) {
  const personObj = new Person(userData)
  const personIndex = state.data.findIndex(Person => Person.id === personObj.id)

  if (personIndex >= 0) {
    state.data.splice(personIndex, 1, personObj)
  } else {
    state.data.push(personObj)
  }
}

export function REMOVE_PERSON (state, payload) {
  const userIndex = state.data.findIndex(Person => Person.id === payload?.person?.id)

  if (userIndex >= 0) {
    state.data.splice(userIndex, 1)
  }
}

export function SET_LOADING_DATA (state, loading) {
  this.isLoadingData = loading
}
