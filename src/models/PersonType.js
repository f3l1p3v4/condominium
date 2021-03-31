import BaseModel from '../lib/BaseModel'

export default class PersonType extends BaseModel {
  constructor (data = null) {
    super(data, 'person_type', 'person_types')

    /* FIELDS */
    this.fields = {
      id: data?.id,
      name: data?.name,
      created_at: data?.['created_at'],
      updated_at: data?.['updated_at']
    }

    /* VALIDATORS */
    this.validators = {
      name: [
        (val) => { return !!val || 'Campo Requerido' },
        (val) => { return (val.length >= 5 && val.length <= 55) || 'Entre 10 e 55 caracteres' }
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

PersonType.singularResourceName = 'person_type'
PersonType.pluralResourceName = 'person_types'
