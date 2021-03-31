export function getData (state) {
  return scope => {
    switch (scope) {
      case 'found':
        return state.data.filter(state => state.rawFoundType === 'found')
      case 'lost':
        return state.data.filter(state => state.rawFoundType === 'lost')
    }

    return state.data
  }
}

export function isLoadingData (state) {
  return state.isLoadingData
}
