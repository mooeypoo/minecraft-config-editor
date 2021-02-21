<template>
  <v-dialog
    v-model="dialog"
    width="500"
  >
    <v-card>
      <v-card-title class="headline">
        Are you sure you want to reset?
      </v-card-title>
      <v-card-text>
        <v-row align="center" justify="center">
          <v-col align="center">
            <v-img
              contain
              alt="Creeper about to go BOOM on your config!"
              class="shrink mt-1 hidden-sm-and-down"
              src="../assets/Creeper_in_Minecraft.png"
              width="200"
            />
          </v-col>
          <v-col align="center" justify="center">
            <h2>Your config is about to go BOOM...</h2>
            <p>If you choose to reset, all of your changes and set parameters will be completely lost.</p>
            <p><strong>This cannot be undone!</strong></p>
            <p>Are you sure you want to reset?</p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          large
          color="green darken-2"
          @click="close"
        >
          Whoops, no, take me back!
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          large
          color="red lighten-2"
          dark
          @click="onYes"
        >
          <v-icon>mdi-alert-decagram</v-icon>&nbsp;Yes, RESET!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ResetDialog',
  data: () => ({
    dialog: false
  }),
  methods: {
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    },
    onYes () {
      // Reset
      this.$store.dispatch('reset')
      this.close()
    }
  }
}
</script>
