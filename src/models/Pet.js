import BaseModel from '../lib/BaseModel'
import Person from 'src/models/Person'
import Constants from 'src/lib/Constants'

export default class Pet extends BaseModel {
  constructor (data = null) {
    super(data, 'pet', 'pets')

    this.fields = {
      id: data?.id,
      created_at: data?.['created_at'],
      updated_at: data?.['updated_at'],
      name: data?.name,
      color: data?.color,
      race: data?.race,
      pet_type: data?.['pet_type'],
      person: new Person(data?.person)
    }

    /* VALIDATORS */
    this.validators = {
      name: [
        (val) => { return !!val || 'Campo Requirido' }
      ]
    }

    /* RELATIONS */
    this.relations = {
      person: Constants.RELATION_TYPES.BELONGS_TO
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

  get race () {
    return this.fields.race
  }

  get color () {
    return this.fields.color
  }

  get person () {
    return this.fields.person
  }

  get petType () {
    return this.fields.pet_type
  }

  set name (name) {
    this.fields.name = name
  }

  set race (race) {
    this.fields.race = race
  }

  set color (color) {
    this.fields.color = color
  }

  set person (person) {
    this.fields.person = person
  }

  set petType (petType) {
    this.fields.pet_type = petType
  }
  /********************************************************************************************************************/
}

Pet.singularResourceName = 'pet'
Pet.pluralResourceName = 'pets'
