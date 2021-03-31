import BaseModel from '../lib/BaseModel'
import Condo from './Condo'
import Constants from '../lib/Constants'

export default class TicketType extends BaseModel {
  constructor (data = null) {
    super(data, 'ticket_type', 'ticket_types')

    /* FIELDS */
    this.fields = {
      id: data?.id,
      name: data?.name,
      condo: new Condo(data?.condo),
      created_at: data?.['created_at'],
      updated_at: data?.['updated_at'],
      num_of_tickets: data?.['num_of_tickets']
    }

    /* VALIDATORS */
    this.validators = {
      name: [
        (val) => { return !!val || 'Campo Requerido' },
        (val) => { return (val.length >= 5 && val.length <= 55) || 'Entre 10 e 55 caracteres' }
      ]
    }

    this.relations = {
      condo: Constants.RELATION_TYPES.BELONGS_TO
    }
  }

  /* GETTERS AND SETTERS **********************************************************************************************/
  get id () {
    return this.fields.id
  }

  get name () {
    return this.fields.name
  }

  get condo () {
    return this.fields.condo
  }

  get createdAt () {
    return this.fields.created_at
  }

  get updatedAt () {
    return this.fields.updated_at
  }

  get numOfTickets () {
    return this.fields.num_of_tickets
  }

  set id (id) {
    this.fields.id = id
  }

  set name (name) {
    this.fields.name = name
  }

  set condo (condo) {
    this.fields.condo = condo
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

TicketType.singularResourceName = 'ticket_type'
TicketType.pluralResourceName = 'ticket_types'
