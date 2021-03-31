export default class AuthEngine {
  constructor (store) {
    this._store = store
  }

  can (permission, payload = {}) {
    if (!permission) return false

    const role = this._store.getters['auth/getUserType']
    return this[permission](role, payload)
  }

  role () {
    return this._store.getters['auth/getUserType']
  }

  userID () {
    return this._store.getters['auth/getID']
  }

  showCondosMenu (role) {
    switch (role) {
      case 'admin':
        return true
      default:
        return false
    }
  }

  canEditTicket (role, payload) {
    return this.isMyTicket(role, payload?.ticket) && payload?.ticket.status === 'new'
  }

  canDestroyTicket (role, payload) {
    return this.isMyTicket(role, payload?.ticket) && payload?.ticket.status === 'new'
  }

  isMyTicket (role, ticket) {
    return parseInt(ticket?.user?.id) === parseInt(this.userID())
  }

  showTicketTypesMenu (role) {
    switch (role) {
      case 'admin':
      case 'manager':
        return true
      default:
        return false
    }
  }

  showManagementMenu (role) {
    switch (role) {
      case 'admin':
      case 'supervisor':
      case 'manager':
        return true
      default:
        return false
    }
  }

  showDashboardMenu (role) {
    switch (role) {
      case 'admin':
      case 'manager':
        return true
      default:
        return false
    }
  }

  showCondosInUserForm (role) {
    switch (role) {
      case 'admin':
      case 'supervisor':
        return true
      default:
        return false
    }
  }

  showCondosInTicketTypeForm (role) {
    switch (role) {
      case 'admin':
      case 'supervisor':
        return true
      default:
        return false
    }
  }

  createNewDelivery (role) {
    switch (role) {
      case 'admin':
      case 'supervisor':
      case 'manager':
        return true
      default:
        return false
    }
  }

  destroyDelivery (role) {
    switch (role) {
      case 'admin':
      case 'supervisor':
      case 'manager':
        return true
      default:
        return false
    }
  }

  editDelivery (role) {
    switch (role) {
      case 'admin':
      case 'supervisor':
      case 'manager':
        return true
      default:
        return false
    }
  }

  editFound (role, payload) {
    const found = payload.found
    return parseInt(found?.user?.id) === parseInt(this.userID()) || role === 'admin' || role === 'manager'
  }
}
