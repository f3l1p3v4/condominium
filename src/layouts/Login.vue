<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-light-green window-height window-width row justify-center items-center">
        <div class="column">
          <div class="row">
            <h3 class="text-white q-my-md">RESOLVA+</h3>
          </div>
          <div class="row">
            <q-card bordered class="q-pa-xl shadow-1" square>
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input clearable filled autofocus label="email" square type="email" v-model="email" tabindex="1"/>
                  <q-input clearable filled label="senha" square type="password" v-model="password" tabindex="2" @keyup.enter="login"/>
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn class="full-width" color="light-green-7" label="Entrar" size="lg" unelevated @click="login"/>
              </q-card-actions>
              <q-card-section class="text-center q-pa-none">
<!--                <p class="text-grey-6">Not reigistered? Created an Account</p>-->
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login () {
      const success = await this.$store.dispatch('auth/requestToken', { email: this.email, password: this.password })
      if (success === true) {

      } else {
        this.$q.notify({ message: 'Login ou senha inválidos', type: 'negative', icon: 'fas fa-exclamation-triangle' })
      }
    }
  }
}
</script>
