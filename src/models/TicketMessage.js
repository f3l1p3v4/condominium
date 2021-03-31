import BaseModel from '../lib/BaseModel'
import User from '../models/User'

export default class TicketMessage extends BaseModel {
  constructor (data = null) {
    super(data, 'ticket_message', 'ticket_messages')

    this.fields = {
      id: data?.id || null,
      message: data?.message || '',
      created_at: data?.['created_at'] || '',
      updated_at: data?.['updated_at'] || '',
      user: new User(data?.user)
    }

    /* VALIDATORS */
    this.validators = {
      // name: [
      //   (val) => { return !!val || 'Campo Requerido' },
      //   (val) => { return (val.length >= 10 && val.length <= 155) || 'Entre 10 e 155 caracteres' }
      // ],
      // cpf: [
      //   (val) => { return !!val || 'Campo Requerido' }
      // ],
      // dateOfBirth: [
      // ],
      // phone1: [],
      // phone2: [],
      // address_street: [],
      // address_number: [],
      // address_neighborhood: [],
      // address_zipcode: []
    }
  }

  /* GETTERS AND SETTERS **********************************************************************************************/
  get id () {
    return this.fields.id
  }

  get message () {
    return this.fields.message
  }

  get createdAt () {
    return this.fields.created_at
  }

  get user () {
    return this.fields.user
  }

  set message (message) {
    this.fields.message = message
  }

  // set operationGroups (operationGroups) {
  //   this.fields.operation_groups = [...operationGroups]
  // }
  //
  // set operationGroupIds (operationGroupIdsArray) {
  //   this.fields.operation_group_ids = operationGroupIdsArray
  // }
  /********************************************************************************************************************/
}

TicketMessage.singularResourceName = 'ticket_message'
TicketMessage.pluralResourceName = 'ticket_messages'
