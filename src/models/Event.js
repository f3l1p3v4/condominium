import BaseModel from '../lib/BaseModel'

export default class Event extends BaseModel {
  constructor (data = null) {
    super(data, 'event', 'events')

    this.fields = {
      id: data?.id,
      title: data?.title,
      date: data?.date,
      created_at: data?.['created_at'],
      updated_at: data?.['updated_at'],
      description: data?.description
    }

    /* VALIDATORS */
    this.validators = {
      title: [
        (val) => { return !!val || 'Campo Requerido' },
        (val) => { return (val.length >= 4 && val.length <= 20) || 'Entre 4 e 20 caracteres' }
      ],
      description: [
        (val) => { return !!val || 'Campo Requerido' },
        (val) => { return (val.length >= 10 && val.length <= 1024) || 'Entre 10 e 1024 caracteres' }
      ],
      date: [
        (val) => { return !!val || 'Campo Requerido' }
      ]
    }
  }

  /* GETTERS AND SETTERS **********************************************************************************************/
  get id () {
    return this.fields.id
  }

  get createdAt () {
    return this.fields.created_at
  }

  get title () {
    return this.fields.title
  }

  get date () {
    return this.fields.date
  }

  get description () {
    return this.fields.description
  }

  set title (title) {
    this.fields.title = title
  }

  set description (description) {
    this.fields.description = description
  }

  set date (date) {
    this.fields.date = date
  }
  /********************************************************************************************************************/
}

Event.singularResourceName = 'event'
Event.pluralResourceName = 'events'
