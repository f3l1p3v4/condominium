import BaseModel from '../lib/BaseModel'
import Condo from './Condo'
import Constants from '../lib/Constants'

export default class User extends BaseModel {
  constructor (data = null) {
    super(data, 'user', 'users')

    this.fields = {
      id: data?.id || null,
      name: data?.name || '',
      email: data?.email || '',
      password: data?.password || '',
      user_type: data?.['user_type'],
      condo: new Condo(data?.condo),
      translated_user_type: data?.['translated_user_type'],
      created_at: data?.['created_at'],
      updated_at: data?.['updated_at']
    }

    /* VALIDATORS */
    this.validators = {
      name: [
        (val) => { return !!val || 'Campo Requerido' },
        (val) => { return (val.length >= 10 && val.length <= 155) || 'Entre 10 e 125 caracteres' }
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

  get password () {
    return this.email.password
  }

  get email () {
    return this.fields.email
  }

  get userType () {
    return this.fields.user_type
  }

  get translatedUserType () {
    return this.fields.translated_user_type
  }

  get condo () {
    return this.fields.condo
  }

  get createdAt () {
    return this.fields.created_at
  }

  set name (name) {
    this.fields.name = name
  }

  set password (password) {
    this.fields.password = password
  }

  set email (email) {
    this.fields.email = email
  }

  set userType (userType) {
    this.fields.user_type = userType
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

User.singularResourceName = 'user'
User.pluralResourceName = 'users'
