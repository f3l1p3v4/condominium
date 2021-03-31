<template>
  <q-dialog
          :value="value"
          @input="propagateDialogInput"
          :full-width="!$q.platform.is.desktop"
          size="80vw"
  >
    <q-card>

      <q-card-section>
        <slot name="title" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <slot name="content" />
      </q-card-section>

      <q-card-actions>
        <slot name="actions" />
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    propagateDialogInput (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>

</style>
