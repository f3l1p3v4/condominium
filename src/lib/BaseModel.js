import api from '../services/api_communicator'
import { modelFactory } from '../lib/Common'
import Constants from '../lib/Constants'

export default class BaseModel {
  constructor (data = null, singularResourceName, pluralResourceName) {
    if (data !== null && data !== undefined && data?.id) {
      this.fields = { ...data }
      this.is_persisted = true
    } else {
      this.is_persisted = false
    }

    this.errors = {}
    this.validators = {}
    this.relations = {}
    this.singularResourceName = singularResourceName
    this.pluralResourceName = pluralResourceName
  }

  request (url, filters = {}) {
    return api.generalRequest(url, filters).then(response => {
      return response.data
    }).catch(error => {
      return error
    })
  }

  postRequest (url, body = {}) {
    return api.generalPost(url, body).then(response => {
      return response.data
    }).catch(error => {
      return error
    })
  }

  static request (url, filters = {}) {
    return api.generalRequest(url, filters).then(response => {
      return response.data
    }).catch(error => {
      return error
    })
  }

  get id () {
    return this.fields.id
  }

  setID (id) {
    this.fields.id = id
  }

  get singularResourceName () {
    return this._singularResourceName
  }

  get pluralResourceName () {
    return this._pluralResourceName
  }

  set singularResourceName (singularResourceName) {
    this._singularResourceName = singularResourceName
  }

  set pluralResourceName (pluralResourceName) {
    this._pluralResourceName = pluralResourceName
  }

  static getAll (filters = {}) {
    const ConstructorName = this.prototype.constructor.singularResourceName.toUpperCase()

    return api.getResources(this, filters).then(response => {
      const resources = []

      response.data.forEach(element => {
        resources.push(modelFactory(ConstructorName, element))
      })
      return resources
    }).catch(error => { return error })
  }

  static get (id, filters = {}) {
    const ConstructorName = this.prototype.constructor.singularResourceName.toUpperCase()

    return api.getResource(id, this, filters).then(response => {
      return modelFactory(ConstructorName, response.data)
    }).catch(error => {
      return error
    })
  }

  destroyHasMany (nestedRes) {
    return api.destroyNestedResource(this, nestedRes).then(data => {
      switch (data.status) {
        case 200:
          return { success: true, data: data.data }
        case 422:
          return { success: false, data: data.data }
      }
    }).catch(error => { return { success: false, data: error.response.data } })
  }

  addNested (nestedRes) {
    return api.addNestedResource(this, nestedRes).then(data => {
      switch (data.status) {
        case 200:
          return { success: true, data: data.data }
        case 422:
          return { success: false, data: data.data }
      }
    }).catch(error => { return { success: false, data: error.response.data } })
  }

  save () {
    this.errors = {}
    return this.is_persisted ? this._update() : this._create()
  }

  destroy () {
    return api.destroyResource(this).then(data => {
      switch (data.status) {
        case 200:
          return { success: true, data: data.data, status: 200 }
        case 403:
          return { success: false, data: data.data, status: 403 }
        case 422:
          return { success: false, data: data.data, status: 422 }
      }
    }).catch(error => { return { success: false, data: error.response.data } })
  }

  _create () {
    return api.createResource(this).then(data => {
      switch (data.status) {
        case 200:
          this._is_persisted = true
          return { success: true, data: data.data, status: 200 }
        case 422:
          this._parseErrors(data.data)
          return { success: false, data: data.data, status: 422 }
      }
    }).catch(error => {
      switch (parseInt(error.response.status)) {
        case 422:
          this._parseErrors(error.response.data)
          break
      }
      return { success: false, data: error.response.data, status: 422 }
    })
  }

  _update () {
    return api.updateResource(this).then(data => {
      switch (data.status) {
        case 200:
          return { success: true, data: data.data }
        case 422:
          this._parseErrors(data.data)
          return { success: false, data: data.data }
      }
    }).catch(error => { return { success: false, data: error.response.data } })
  }

  extractFields (baseModel) {
    const data = {}
    this.recursiveExtractFields(this, data)
    return data
  }

  extractFromArray (array, data) {
    array.forEach(element => {
      if (element === null && element === undefined) return

      if (Array.isArray(element) === false && !(element instanceof Object)) {
        data.push(element)
      } else if (Array.isArray(element) === true) {
      }
    })
  }

  recursiveExtractFields (baseModel, data = {}, parentRelationType = null) {
    if (!baseModel?.fields) return

    let dataKeyTemplate = null
    // const dataKeyTemplate = parentRelationType ? `${baseModel.singularResourceName}_id` : baseModel.singularResourceName

    /* If has relation */
    if (parentRelationType) {
      /* If relation is just a string (convention over configuration) */
      if (typeof parentRelationType === 'string' || parentRelationType instanceof String) {
        switch (parentRelationType) {
          case Constants.RELATION_TYPES.BELONGS_TO:
            dataKeyTemplate = `${baseModel.singularResourceName}_id`
            data[dataKeyTemplate] = baseModel.id
            return
        }
      } else { /* relation field is a hash */
        switch (parentRelationType.type) {
          case Constants.RELATION_TYPES.BELONGS_TO:
            dataKeyTemplate = parentRelationType.fk
            data[dataKeyTemplate] = baseModel.id
            return
        }
      }
    }

    dataKeyTemplate = baseModel.singularResourceName
    data[dataKeyTemplate] = {}

    /* Iterate over model fields .. prop[0] is the field name and prop[1] is the field value */
    Object.entries(baseModel.fields).forEach(prop => {
      if (prop[1] === null || prop[1] === undefined) return

      if (this.getRelationType(prop[0] !== null)) {
        return this.recursiveExtractFields(prop[1], data[dataKeyTemplate], this.getRelationType(prop[0])) /* is relation */
      }

      if (Array.isArray(prop[1]) === false && !(prop[1] instanceof Object)) { /* is string or int value */
        data[dataKeyTemplate][prop[0]] = prop[1]
      } else if (Array.isArray(prop[1]) === true) { /* is array */
        data[dataKeyTemplate][prop[0]] = []
        this.extractFromArray(prop[1], data[dataKeyTemplate][prop[0]])
      } else {
        console.log('debug', prop[0], this.getRelationType(prop[0]))
        this.recursiveExtractFields(prop[1], data[dataKeyTemplate], this.getRelationType(prop[0])) /* is object/relation */
      }
    })
  }

  hasErrorInField (fieldName) {
    console.log('guedes', typeof this.errors?.[fieldName], fieldName)
    return typeof this.errors?.[fieldName] === 'string'
  }

  hasRelation (fieldName) {
    return !!this.relations[fieldName]
  }

  getRelationType (fieldName) {
    return this.hasRelation(fieldName) ? this.relations[fieldName] : null
  }

  _parseErrors (errorData) {
    console.log(Object.entries(errorData))
    const self = this
    Object.entries(errorData).forEach(keyValPair => {
      const fieldName = keyValPair[0]
      const fieldValue = keyValPair[1]
      fieldValue.forEach(error => {
        self.errors[fieldName] = error
      })
    })
  }
}
