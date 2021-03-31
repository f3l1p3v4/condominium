import BaseModel from '../lib/BaseModel'
import Condo from './Condo'
import Constants from '../lib/Constants'
// import CommonAreaReservation from './CommonAreaReservation'
import { date } from 'quasar'

export default class CommonArea extends BaseModel {
  constructor (data = null) {
    super(data, 'common_area', 'common_areas')

    /* FIELDS */
    this.fields = {
      id: data?.id,
      name: data?.name,
      condo: new Condo(data?.condo),
      opening_hours_start: data?.['opening_hours_start'],
      opening_hours_end: data?.['opening_hours_end'],
      created_at: data?.['created_at'],
      updated_at: data?.['updated_at'],
      working_days: data?.['working_days'] || [],
      usage_interval: data?.['usage_interval']
      // common_area_reservations: [...new Array(data?.['common_area_reservations']?.length)]
      //   .map((t, i) => new CommonAreaReservation(data?.['common_area_reservations']?.[i]))
    }

    /* VALIDATORS */
    this.validators = {
      name: [
        (val) => { return !!val || 'Campo Requerido' },
        (val) => { return (val.length >= 5 && val.length <= 55) || 'Entre 10 e 55 caracteres' }
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

  get condo () {
    return this.fields.condo
  }

  get createdAt () {
    return this.fields.created_at
  }

  get updatedAt () {
    return this.fields.updated_at
  }

  get openingHoursStart () {
    return this.fields.opening_hours_start
  }

  get openingHoursEnd () {
    return this.fields.opening_hours_end
  }

  get workingDays () {
    return this.fields.working_days
  }

  get usageInterval () {
    return this.fields.usage_interval
  }

  get commonAreaReservations () {
    return this.fields.common_area_reservations
  }

  set id (id) {
    this.fields.id = id
  }

  set name (name) {
    this.fields.name = name
  }

  set condo (condo) {
    this.fields.condo = condo
  }

  set openingHoursStart (openingHoursStart) {
    this.fields.opening_hours_start = openingHoursStart
  }

  set openingHoursEnd (openingHoursEnd) {
    this.fields.opening_hours_end = openingHoursEnd
  }

  set workingDays (workingDays) {
    this.fields.working_days = workingDays
  }

  set usageInterval (usageInterval) {
    this.fields.usage_interval = usageInterval
  }

  set commonAreaReservations (commonAreaReservations) {
    this.fields.commonAreaReservations = commonAreaReservations
  }

  /* CUSTOM METHODS AND REQUESTS */
  availableReservations (date) {
    return this.request(`common_areas/${this.id}/available_reservations`, { date: date })
  }

  createReservation (rawDate, hour, usageInterval) {
    const tokenizedDate = rawDate.split('/')
    const builtDate = new Date(`${tokenizedDate[2]}-${tokenizedDate[1]}-${tokenizedDate[0]} ${hour}`)
    const parsedStart = date.formatDate(builtDate, 'YYYY-MM-DDTHH:mm:ss')

    const builtEnd = date.addToDate(builtDate, { hours: parseInt(usageInterval) })
    const parsedEnd = date.formatDate(builtEnd, 'YYYY-MM-DDTHH:mm:ss')

    return this.postRequest(`common_areas/${this.id}/create_reservation`, { start_time: parsedStart, end_time: parsedEnd })
  }
  /********************************************************************************************************************/

  static reservationsFeed (params) {
    return this.request('common_areas/reservations_feed', params)
  }
}

CommonArea.singularResourceName = 'common_area'
CommonArea.pluralResourceName = 'common_areas'
