import BaseModel from '../lib/BaseModel'
import Constants from 'src/lib/Constants'
import PersonType from 'src/models/PersonType'

export default class Person extends BaseModel {
  constructor (data = null) {
    super(data, 'person', 'people')

    this.fields = {
      id: data?.id,
      created_at: data?.['created_at'],
      updated_at: data?.['updated_at'],
      person_type: new PersonType(data?.['person_type']),
      name: data?.name,
      cpf: data?.cpf,
      phone: data?.phone
    }

    /* VALIDATORS */
    this.validators = {
      name: [
        (val) => { return !!val || 'Campo Requirido' }
      ],
      cpf: [
        (val) => { return !!val || 'Campo Requirido' },
        (val) => { return (val.length >= 11 && val.length <= 11) || 'Obrigatório 11 números' }
      ],
      phone: [
        (val) => { return !!val || 'Campo Requirido' }
      ]
    }

    /* RELATIONS */
    this.relations = {
      person_type: Constants.RELATION_TYPES.BELONGS_TO
    }
  }

  /* GETTERS AND SETTERS **********************************************************************************************/
  get id () {
    return this.fields.id
  }

  get createdAt () {
    return this.fields.created_at
  }

  get name () {
    return this.fields.name
  }

  get cpf () {
    return this.fields.cpf
  }

  get phone () {
    return this.fields.phone
  }

  get personType () {
    return this.fields.person_type
  }

  set name (name) {
    this.fields.name = name
  }

  set cpf (cpf) {
    this.fields.cpf = cpf
  }

  set phone (phone) {
    this.fields.phone = phone
  }

  set personType (personType) {
    this.fields.person_type = personType
  }
  /********************************************************************************************************************/
}

Person.singularResourceName = 'person'
Person.pluralResourceName = 'people'
