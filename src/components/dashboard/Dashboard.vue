<template>
  <div class="q-col-gutter-y-md">
    <div class="row q-col-gutter-sm">
      <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 col-xl-1">
        <q-card class="bg-grey-8 text-white dashboard_card">
          <q-card-section>
            <div class="row">
              <div class="col-4">
                <q-icon name="fas fa-book" size="2.7em"/>
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="col">
                    <div class="text-h6">Total</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="text-h2">
                      {{totalStatusTicket}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 col-xl-1">
        <q-card class="bg-cyan-7 text-white dashboard_card">
          <q-card-section>
            <div class="row">
              <div class="col-4">
                <q-icon name="far fa-star" size="2.7em"/>
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="col">
                    <div class="text-h6">Novo</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="text-h2">
                      {{totalStatusTicket}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 col-xl-1">
        <q-card class="bg-orange-7 text-white dashboard_card">
          <q-card-section>
            <div class="row">
              <div class="col-4">
                <q-icon name="fas fa-star-half-alt" size="2.7em"/>
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="col">
                    <div class="text-h6">Em Atend.</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="text-h2">
                      {{inAttendanceStatusTickets}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 col-xl-1">
        <q-card class="bg-green-7 text-white dashboard_card">
          <q-card-section>
            <div class="row">
              <div class="col-4">
                <q-icon name="fas fa-star" size="2.7em"/>
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="col">
                    <div class="text-h6">Finalizado</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="text-h2">
                      {{closedStatusTickets}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-xs-12 col-sm-8 col-md-6 col-lg-4 col-xl-4">
        <q-card class="dashboard_ticket_type_chart_card">
          <q-card-section class="bg-primary">
            <div class="bg-primary text-white text-h5">Tipos de Chamado</div>
          </q-card-section>
          <q-card-section>
            <TicketTypesPieChart />
          </q-card-section>
        </q-card>
      </div>

    </div>
  </div>

</template>

<script>
import TicketTypesPieChart from '../dashboard/TicketTypesPieChart'
import BaseModel from '../../lib/BaseModel'
export default {
  name: 'Dashboard',
  data () {
    return {
      dashboardData: {}
    }
  },
  computed: {
    totalStatusTicket () {
      return this.dashboardData.ticket_count_by_status?.['Total'] || 0
    },
    newStatusTickets () {
      return this.dashboardData.ticket_count_by_status?.['Novo'] || 0
    },
    inAttendanceStatusTickets () {
      return this.dashboardData.ticket_count_by_status?.['Em atendimento'] || 0
    },
    closedStatusTickets () {
      return this.dashboardData.ticket_count_by_status?.['Finalizado'] || 0
    }
  },
  async beforeMount () {
    this.dashboardData = await BaseModel.request('dashboard')
  },
  components: {
    TicketTypesPieChart
  }
}
</script>

<style scoped>
  .dashboard_card {
    width: 100%;
    max-width: 300px;
    height: 100%;
    max-height: 150px;
  }

  .dashboard_ticket_type_chart_card {
    width: 100%;
    /*max-width: 300px;*/
    height: 100%;
    max-height: 450px;
  }
</style>
