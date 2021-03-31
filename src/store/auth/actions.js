import axios from 'axios'

export async function requestToken ({ commit }, payload) {
  try {
    const res = await axios.post('users/sign_in', {
      email: payload.email,
      password: payload.password
    })

    if (res?.status === 200 && res?.headers?.['access-token']) {
      commit('SET_ACCESS_TOKEN', res.headers['access-token'])
      axios.defaults.headers.common.Authorization = `Bearer ${res.headers['access-token']}`

      const mineData = await axios.get('users/me')
      commit('SET_MINE_DATA', mineData.data)

      /* Redirect user to main dashboard */
      this.$router.push({ name: 'tickets_list' })
      return true
    } else {
      return false
    }
  } catch (err) {
    return false
  }
}
