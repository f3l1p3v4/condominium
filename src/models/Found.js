import BaseModel from '../lib/BaseModel'
import User from '../models/User'

export default class Found extends BaseModel {
  constructor (data = null) {
    super(data, 'found', 'founds')

    this.fields = {
      id: data?.id,
      found_type: data?.['found_type'],
      raw_found_type: data?.['raw_found_type'],
      created_at: data?.['created_at'],
      updated_at: data?.['updated_at'],
      description: data?.description,
      user: new User(data?.user)
    }

    /* VALIDATORES */
    this.validators = {
      description: [
        (val) => { return !!val || 'Campo Requirido' },
        (val) => { return (val.length >= 10 && val.length <= 1024) || 'Entre 10 e 1024 caracteres' }
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

  get foundType () {
    return this.fields.found_type
  }

  get rawFoundType () {
    return this.fields.raw_found_type
  }

  get description () {
    return this.fields.description
  }

  get user () {
    return this.fields.user
  }

  set foundType (foundType) {
    this.fields.found_type = foundType
  }

  set rawFoundType (rawFoundType) {
    this.fields.raw_found_type = rawFoundType
  }

  set description (description) {
    this.fields.description = description
  }
  /********************************************************************************************************************/
}

Found.singularResourceName = 'found'
Found.pluralResourceName = 'founds'
