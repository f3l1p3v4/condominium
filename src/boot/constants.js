import Constants from '../lib/Constants'
import User from '../models/User'
import Ticket from '../models/Ticket'
import TicketType from '../models/TicketType'
import Condo from '../models/Condo'
import CommonArea from '../models/CommonArea'
import CommonAreaReservation from '../models/CommonAreaReservation'
import Delivery from '../models/Delivery'
import Found from '../models/Found'
import Person from '../models/Person'
import PersonType from '../models/PersonType'
import Vehicle from '../models/Vehicle'
import Event from '../models/Event'
import Pet from '../models/Pet'

export default ({ app, router, store, Vue }) => {
  Constants.USER = User
  Constants.TICKET = Ticket
  Constants.TICKET_TYPE = TicketType
  Constants.CONDO = Condo
  Constants.COMMON_AREA = CommonArea
  Constants.DELIVERY = Delivery
  Constants.FOUND = Found
  Constants.PERSON = Person
  Constants.VEHICLE = Vehicle
  Constants.COMMON_AREA_RESERVATION = CommonAreaReservation
  Constants.EVENT = Event
  Constants.PERSON_TYPE = PersonType
  Constants.PET = Pet

  Constants.RELATION_TYPES = {}
  Constants.RELATION_TYPES.BELONGS_TO = 'belongs_to'
}
