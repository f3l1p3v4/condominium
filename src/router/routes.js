
const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: 'users', name: 'users', component: () => import('pages/UserIndexPage.vue') },
      { path: 'users/new', name: 'new_user', component: () => import('pages/UserFormPage.vue'), props: true },
      { path: 'users/edit', name: 'edit_user', component: () => import('pages/UserFormPage.vue'), props: true },
      { path: 'ticket/:id', name: 'ticket', component: () => import('pages/TicketDetailPage.vue'), props: true },
      { path: 'tickets', name: 'tickets', component: () => import('pages/TicketIndexPage.vue') },
      { path: 'tickets_list', name: 'tickets_list', component: () => import('pages/TicketListPage.vue') },
      { path: 'tickets/new', name: 'new_ticket', component: () => import('pages/TicketFormPage.vue'), props: true },
      { path: 'tickets/edit', name: 'edit_ticket', component: () => import('pages/TicketFormPage.vue'), props: true },
      { path: 'condos', name: 'condos', component: () => import('pages/CondoIndexPage.vue') },
      { path: 'condos/new', name: 'new_condo', component: () => import('pages/CondoFormPage.vue'), props: true },
      { path: 'condos/edit', name: 'edit_condo', component: () => import('pages/CondoFormPage.vue'), props: true },
      { path: 'ticket_types', name: 'ticket_types', component: () => import('pages/TicketTypeIndexPage.vue'), props: true },
      { path: 'ticket_types/new', name: 'new_ticket_type', component: () => import('pages/TicketTypeFormPage.vue'), props: true },
      { path: 'ticket_types/edit', name: 'edit_ticket_type', component: () => import('pages/TicketTypeFormPage.vue'), props: true },
      { path: 'common_areas', name: 'common_areas', component: () => import('pages/CommonAreaIndexPage.vue'), props: true },
      { path: 'common_areas/new', name: 'new_common_area', component: () => import('pages/CommonAreaFormPage.vue'), props: true },
      { path: 'common_areas/edit', name: 'edit_common_area', component: () => import('pages/CommonAreaFormPage.vue'), props: true },
      { path: 'common_area_reservations', name: 'common_area_reservations', component: () => import('pages/CommonAreaReservationIndexPage.vue'), props: true },
      { path: 'common_area_reservations/new', name: 'new_common_area_reservation', component: () => import('pages/NewCommonAreaReservationPage'), props: true },
      { path: 'delivery/:id', name: 'delivery', component: () => import('pages/DeliveryDetailPage.vue'), props: true },
      { path: 'deliveries', name: 'deliveries', component: () => import('pages/DeliveryIndexPage.vue') },
      // { path: 'deliveries_list', name: 'deliveries_list', component: () => import('pages/DeliveryListPage.vue') },
      { path: 'deliveries/new', name: 'new_delivery', component: () => import('pages/DeliveryFormPage.vue'), props: true },
      { path: 'deliveries/edit', name: 'edit_delivery', component: () => import('pages/DeliveryFormPage.vue'), props: true },
      { path: 'founds', name: 'founds', component: () => import('pages/FoundIndexPage.vue') },
      { path: 'founds/new', name: 'new_found', component: () => import('pages/FoundFormPage.vue'), props: true },
      { path: 'founds/edit', name: 'edit_found', component: () => import('pages/FoundFormPage.vue'), props: true },
      { path: 'people', name: 'people', component: () => import('pages/PersonIndexPage.vue') },
      { path: 'people/new', name: 'new_person', component: () => import('pages/PersonFormPage.vue'), props: true },
      { path: 'people/edit', name: 'edit_person', component: () => import('pages/PersonFormPage.vue'), props: true },
      { path: 'people/vehicles', name: 'person_vehicles', component: () => import('pages/PersonVehiclesIndexPage'), props: true },
      { path: 'vehicles', name: 'vehicles', component: () => import('pages/VehicleIndexPage.vue') },
      { path: 'vehicles/new', name: 'new_vehicle', component: () => import('pages/VehicleFormPage.vue'), props: true },
      { path: 'vehicles/edit', name: 'edit_vehicle', component: () => import('pages/VehicleFormPage.vue'), props: true },
      { path: 'person_types', name: 'person_types', component: () => import('pages/PersonTypeIndexPage.vue') },
      { path: 'person_types/new', name: 'new_person_type', component: () => import('pages/PersonTypeFormPage.vue'), props: true },
      { path: 'person_types/edit', name: 'edit_person_type', component: () => import('pages/PersonTypeFormPage.vue'), props: true },
      { path: 'events', name: 'events', component: () => import('pages/EventIndexPage.vue') },
      { path: 'events/new', name: 'new_event', component: () => import('pages/EventFormPage.vue'), props: true },
      { path: 'events/edit', name: 'edit_event', component: () => import('pages/EventFormPage.vue'), props: true },
      { path: 'pets', name: 'pets', component: () => import('pages/PetIndexPage.vue') },
      { path: 'pets/new', name: 'new_pet', component: () => import('pages/PetFormPage.vue'), props: true },
      { path: 'pets/edit', name: 'edit_pet', component: () => import('pages/PetFormPage.vue'), props: true }

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/Login.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
