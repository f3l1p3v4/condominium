import axios from 'axios'

export default class APICommunicator {
  static getResources (res, filters = {}) {
    return axios.get(res.pluralResourceName, { params: filters })
  }

  static getResource (id, baseRes) {
    return axios.get(baseRes.pluralResourceName + `/${id}`)
  }

  static createResource (baseRes) {
    return axios.post(baseRes.pluralResourceName, baseRes.extractFields(baseRes))
  }

  static updateResource (baseRes, data) {
    return axios.put(baseRes.pluralResourceName + `/${baseRes.id}`, baseRes.extractFields(baseRes))
  }

  static destroyResource (baseRes, data) {
    return axios.delete(baseRes.pluralResourceName + `/${baseRes.id}`, data)
  }

  static addNestedResource (baseRes, nestedRes) {
    return axios.post(baseRes.pluralResourceName + `/${baseRes.id}/${nestedRes.pluralResourceName}`, nestedRes.extractFields(nestedRes))
  }

  static destroyNestedResource (baseRes, nestedRes) {
    return axios.delete(baseRes.pluralResourceName + `/${baseRes.id}/remove_${nestedRes.singularResourceName}/${nestedRes.id}`)
  }

  static generalRequest (url, filters = {}) {
    return axios.get(url, {
      params: filters
    })
  }

  static generalPost (url, body = {}) {
    return axios.post(url, body)
  }
}
