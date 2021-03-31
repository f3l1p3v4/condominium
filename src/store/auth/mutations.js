export function SET_ACCESS_TOKEN (state, token) {
  state.accessToken = token
}

export function SET_MINE_DATA (state, mineData) {
  state.id = mineData?.id
  state.userType = mineData?.['user_type']
  state.name = mineData?.name
}

export function RESET_SESSION_DATA (state) {
  state.id = null
  state.userType = ''
  state.name = ''
  state.accessToken = ''
}
