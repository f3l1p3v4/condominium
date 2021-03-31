import BaseModel from '../lib/BaseModel'

export default class Condo extends BaseModel {
  constructor (data = null) {
    super(data, 'condo', 'condos')

    this.fields = {
      id: data?.id || null,
      name: data?.name || ''
      // created_at: data.created_at || '',
      // updated_at: data.updated_at || ''
    }

    /* VALIDATORS */
    /* VALIDATORS */
    this.validators = {
      name: [
        (val) => { return !!val || 'Campo Requerido' },
        (val) => { return (val.length >= 10 && val.length <= 155) || 'Entre 10 e 155 caracteres' }
      ]
    }
  }

  /* GETTERS AND SETTERS **********************************************************************************************/
  get id () {
    return this.fields.id
  }

  get name () {
    return this.fields.name
  }

  get createdAt () {
    return this.fields.created_at
  }

  get updatedAt () {
    return this.fields.updated_at
  }

  set id (id) {
    this.fields.id = id
  }

  set name (name) {
    this.fields.name = name
  }
  /********************************************************************************************************************/
}

Condo.singularResourceName = 'condo'
Condo.pluralResourceName = 'condos'
