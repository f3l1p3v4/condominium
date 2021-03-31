import BaseModel from '../lib/BaseModel'
import User from './User'
import Constants from '../lib/Constants'

export default class Delivery extends BaseModel {
  constructor (data = null) {
    super(data, 'delivery', 'deliveries')

    this.fields = {
      id: data?.id,
      created_at: data?.['created_at'],
      updated_at: data?.['updated_at'],
      description: data?.description,
      observations: data?.observations,
      status: data?.status,
      raw_status: data?.['raw_status'],
      recipient: new User(data?.recipient),
      responsible: new User(data?.responsible)
    }

    /* VALIDATORS */
    this.validators = {
      description: [
        (val) => { return !!val || 'Campo Requirido' },
        (val) => { return (val.length >= 10 && val.length <= 1024) || 'Entre 10 e 1024 caracteres' }
      ],
      recipient: [
        (val) => { return !!val || 'Campo Requirido' }
      ],
      observations: [
        (val) => { return !!val || 'Campo Requirido' }
      ]
    }

    this.relations = {
      recipient: { type: Constants.RELATION_TYPES.BELONGS_TO, fk: 'recipient_id' },
      responsible: { type: Constants.RELATION_TYPES.BELONGS_TO, fk: 'user_id' }
    }
  }

  /* GETTERS AND SETTERS **********************************************************************************************/
  get id () {
    return this.fields.id
  }

  get createdAt () {
    return this.fields.created_at
  }

  get description () {
    return this.fields.description
  }

  get observations () {
    return this.fields.observations
  }

  get recipient () {
    return this.fields.recipient
  }

  get responsible () {
    return this.fields.responsible
  }

  get status () {
    return this.fields.status
  }

  get rawStatus () {
    return this.fields.raw_status
  }

  set description (description) {
    this.fields.description = description
  }

  set observations (observations) {
    this.fields.observations = observations
  }

  set recipient (recipient) {
    this.fields.recipient = recipient
  }

  set responsible (responsible) {
    this.fields.responsible = responsible
  }

  set status (status) {
    this.fields.status = status
  }
  /********************************************************************************************************************/
}

Delivery.singularResourceName = 'delivery'
Delivery.pluralResourceName = 'deliveries'
