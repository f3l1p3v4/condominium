import BaseModel from '../lib/BaseModel'
import Person from 'src/models/Person'
import Constants from 'src/lib/Constants'

export default class Vehicle extends BaseModel {
  constructor (data = null) {
    super(data, 'vehicle', 'vehicles')

    this.fields = {
      id: data?.id,
      created_at: data?.['created_at'],
      updated_at: data?.['updated_at'],
      brand: data?.brand,
      model: data?.model,
      color: data?.color,
      person: new Person(data?.person),
      license_plate: data?.['license_plate']
    }

    /* VALIDATORS */
    this.validators = {
      brand: [
        (val) => { return !!val || 'Campo Requirido' }
      ],
      model: [
        (val) => { return !!val || 'Campo Requirido' }
      ],
      color: [
        (val) => { return !!val || 'Campo Requirido' }
      ],
      license_plate: [
        (val) => { return !!val || 'Campo Requirido' },
        (val) => { return (val.length >= 7 && val.length <= 7) || 'Obrigatório 3 Letras e 4 números' }
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

  get brand () {
    return this.fields.brand
  }

  get model () {
    return this.fields.model
  }

  get color () {
    return this.fields.color
  }

  get licensePlate () {
    return this.fields.license_plate
  }

  get person () {
    return this.fields.person
  }

  set brand (brand) {
    this.fields.brand = brand
  }

  set model (model) {
    this.fields.model = model
  }

  set licensePlate (licensePlate) {
    this.fields.license_plate = licensePlate
  }

  set color (color) {
    this.fields.color = color
  }

  set person (person) {
    this.fields.person = person
  }
  /********************************************************************************************************************/
}

Vehicle.singularResourceName = 'vehicle'
Vehicle.pluralResourceName = 'vehicles'
