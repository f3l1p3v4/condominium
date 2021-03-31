<template>
  <div class="q-pa-sm q-gutter-y-md">
    <div class="row">
      <div class="float-left col">
        <q-btn unelevated round size="sm" color="primary" icon="fas fa-arrow-left" @click="$router.go(-1)" />
      </div>

      <div class="float-right col">
        <q-btn v-if="$auth.can('canDestroyTicket', { ticket: ticket })"
               unelevated
               round
               size="sm"
               color="red"
               icon="fas fa-trash"
               class="q-ml-sm float-right"
               @click="destroyTicket"
        />
        <q-btn v-if="$auth.can('canEditTicket', { ticket: ticket })"
               unelevated
               round
               size="sm"
               color="primary"
               icon="fas fa-edit"
               class="q-ml-sm float-right"
               :to="{ name: `edit_${ticket.singularResourceName}`, params: { formModel: ticket } }"
        />
      </div>

    </div>
    <div class="text-h4">
      [{{ticket.ticketType.name}}]
    </div>

    <div class="row">
      <div class="column">
        <q-chip size="md" outline square :color="emergencyColor(ticket.emergency)" icon="fas fa-info-circle">
          {{ticket.translatedEmergency}}
        </q-chip>
      </div>
      <div class="column">
        <q-chip size="md" outline square color="primary" :icon="statusIcon(ticket.status)">
          {{ticket.translatedStatus}}
        </q-chip>
      </div>
      <div class="column">
        <q-chip size="md" outline square icon="fas fa-user">
          {{ticket.user.name}}
        </q-chip>
      </div>
      <div class="column">
        <q-chip size="md" outline square icon="fas fa-clock">
          {{ticket.createdAt}}
        </q-chip>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class=" ticket-description text-weight-bold">{{ticket.description}}</div>
      </div>
      <q-separator></q-separator>
    </div>
    <div class="row">
      <q-timeline color="primary">
        <q-timeline-entry v-for="message in ticket.ticketMessages" :key="message.id"
                          :title="message.user.name"
                          :subtitle="message.createdAt"
                          icon="fas fa-user"
                          side="right"
                          :color="commentColor(message)"

        >
          <div>
            {{message.message}}
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>
    <div class="row">
      <div class="col-12">
        <q-input
                  v-model="commentField"
                  type="textarea"
                  label="Inserir Comentário"
                  counter
                  filled
        >

        </q-input>
      </div>
      <div class="col-12">
        <q-btn unelevated color="primary" label="Enviar" :loading="commentBtnLoading" @click="appendMessage"
        />
      </div>
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script>
import Ticket from '../../models/Ticket'
import TicketMessage from '../../models/TicketMessage'
export default {
  name: 'TicketDetails',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      ticket: new Ticket(),
      loading: true,
      commentField: '',
      commentBtnLoading: false
    }
  },
  methods: {
    emergencyColor (emergency) {
      switch (emergency?.toLowerCase()) {
        case 'low':
          return 'yellow-8'
        case 'intermediate':
          return 'orange-8'
        case 'high':
          return 'red-8'
        default:
          return 'gray'
      }
    },
    statusIcon (status) {
      switch (status?.toLowerCase()) {
        case 'new':
          return 'far fa-star'
        case 'in_attendance':
          return 'fas fa-star-half-alt'
        case 'closed':
          return 'fas fa-star'
        default:
          return 'far fa-star'
      }
    },
    async appendMessage () {
      this.commentBtnLoading = true
      const res = await this.ticket.addNested(new TicketMessage({ message: this.commentField }))
      if (res?.success === true) {
        this.ticket.ticketMessages.push(res.data)
        this.commentField = ''
      }
      this.commentBtnLoading = false
    },
    commentColor (ticketMessage) {
      switch (ticketMessage?.user?.userType) {
        case 'manager':
          return 'primary'
        default:
          return 'grey-8'
      }
    },
    destroyTicket () {
      this.$q.dialog({
        title: 'Você tem certeza disso?',
        message: 'Esse processo não poderá ser desfeito! Os dados perdidos não poderão ser recuperados!',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        const response = await this.ticket.destroy()
        if (response?.success === true) {
          this.$q.notify({ message: 'Removido com sucesso', type: 'positive', icon: 'fas fa-check-circle' })
          this.$router.push({ name: 'tickets_list' })
        } else {
          this.$q.notify({ message: 'Erro ao remover dados', type: 'negative', icon: 'fas fa-exclamation-triangle' })
        }
      })
    }
  },
  computed: {
    ticketUserID () {
      return this.ticket?.user?.id
    },
    userID () {
      return this.$store.getters['auth/getID']
    }
  },
  async beforeMount () {
    this.ticket = await Ticket.get(this.id)
    this.loading = false
  }
}
</script>

<style scoped>
  .ticket-title {
    font-size:1.25rem;
    font-weight:500;
    line-height:2rem;
  }

  .ticket-description {
    font-size: 1.50em;
  }
</style>
