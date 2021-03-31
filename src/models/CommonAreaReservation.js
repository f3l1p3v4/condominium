import BaseModel from '../lib/BaseModel'
import User from '../models/User'
// import CommonArea from '../models/CommonArea'
import Constants from 'src/lib/Constants'

export default class CommonAreaReservation extends BaseModel {
  constructor (data = null) {
    super(data, 'common_area_reservation', 'common_area_reservations')

    /* FIELDS */
    this.fields = {
      id: data?.id,
      user: new User(data?.user),
      common_area: data?.['common_area'],
      common_area_id: data?.['common_area_id'],
      start_time: data?.['start_time'],
      end_time: data?.['end_time'],
      created_at: data?.['created_at'],
      updated_at: data?.['updated_at']
    }

    /* VALIDATORS */
    this.validators = {
    }

    this.relations = {
      common_area: Constants.RELATION_TYPES.BELONGS_TO
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

  get startTime () {
    return this.fields.start_time
  }

  get endTime () {
    return this.fields.end_time
  }

  get user () {
    return this.fields.user
  }

  get commonArea () {
    return this.fields.common_area
  }

  get commonAreaID () {
    return this.fields.common_area_id
  }

  set id (id) {
    this.fields.id = id
  }

  set startTime (startTime) {
    this.fields.start_time = startTime
  }

  set commonAreaID (commonAreaID) {
    this.fields.common_area_id = commonAreaID
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

CommonAreaReservation.singularResourceName = 'common_area_reservation'
CommonAreaReservation.pluralResourceName = 'common_area_reservations'
