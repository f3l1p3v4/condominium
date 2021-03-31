export function TOGGLE_LEFT_DRAWER_STATE (state, data) {
  if (data === '' || data === undefined) {
    state.left_drawer_open = !state.left_drawer_open
  } else {
    state.left_drawer_open = data
  }
}
