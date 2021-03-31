import BaseModel from '../lib/BaseModel'
import User from '../models/User'
import TicketMessage from './TicketMessage'
import TicketType from './TicketType'
import Constants from './../lib/Constants'

export default class Ticket extends BaseModel {
  constructor (data = null) {
    super(data, 'ticket', 'tickets')

    this.fields = {
      id: data?.id,
      created_at: data?.['created_at'],
      updated_at: data?.['updated_at'],
      human_elapsed_creation_time: data?.['human_elapsed_creation_time'],
      user: new User(data?.user),
      emergency: data?.emergency,
      translated_emergency: data?.['translated_emergency'],
      status: data?.status,
      translated_status: data?.['translated_status'],
      description: data?.description,
      // ticketType: data?.['ticketType'],
      ticket_type: new TicketType(data?.['ticket_type']),
      ticket_messages: [...new Array(data?.['ticket_messages']?.length)]
        .map((t, i) => new TicketMessage(data?.['ticket_messages']?.[i]))
    }

    /* VALIDATORS */
    this.validators = {
      description: [
        (val) => { return !!val || 'Campo Requerido' },
        (val) => { return (val.length >= 10 && val.length <= 1024) || 'Entre 10 e 1024 caracteres' }
      ],
      emergency: [
        (val) => { return !!val || 'Campo Requerido' }
      ],
      ticket_type: [
        (val) => { return !!val || 'Campo Requerido' }
      ]
    }

    this.relations = {
      ticket_type: Constants.RELATION_TYPES.BELONGS_TO
    }
  }

  /* */
  static dashboard () {

  }

  /* GETTERS AND SETTERS **********************************************************************************************/
  get id () {
    return this.fields.id
  }

  get description () {
    return this.fields.description
  }

  get ticketType () {
    return this.fields.ticket_type
  }

  get ticketMessages () {
    return this.fields.ticket_messages
  }

  get user () {
    return this.fields.user
  }

  get humanElapsedCreationTime () {
    return this.fields.human_elapsed_creation_time
  }

  get status () {
    return this.fields.status
  }

  get translatedStatus () {
    return this.fields.translated_status
  }

  get emergency () {
    return this.fields.emergency
  }

  get translatedEmergency () {
    return this.fields.translated_emergency
  }

  get createdAt () {
    return this.fields.created_at
  }

  set description (description) {
    this.fields.description = description
  }

  set emergency (emergency) {
    this.fields.emergency = emergency
  }

  set translatedEmergency (translatedEmergency) {
    this.fields.translated_emergency = translatedEmergency
  }

  set ticketType (ticketType) {
    this.fields.ticket_type = ticketType
  }

  set status (status) {
    this.fields.status = status
  }

  set translatedStatus (translatedStatus) {
    this.fields.translated_status = translatedStatus
  }
  /********************************************************************************************************************/
}

Ticket.singularResourceName = 'ticket'
Ticket.pluralResourceName = 'tickets'
