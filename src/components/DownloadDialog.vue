<template>
  <v-dialog
    v-model="dialog"
    width="80%"
  >
    <v-card>
      <v-card-title class="headline">
        Get your new config
      </v-card-title>
      <v-card-text>
        <v-row align="center" justify="center">
          <v-col align="center" class="col-4">
            <v-img
              contain
              alt="This enderman is willing to give you your config file..."
              class="shrink mt-1 hidden-sm-and-down"
              src="../assets/Enderman.png"
            />
          </v-col>
          <v-col align="center" justify="center" class="col-8">
            <div v-if="showFile">
              <h2>Your config is ready!</h2>
              <v-textarea
                solo
                label="New config"
                :value="newFileContents"
                height="500"
                class="config-textarea"
              ></v-textarea>
            </div>
            <div v-if="!showFile">
              <v-row align="center" justify="center">
                <h2>Your config is ready, but...</h2>
                <Disclaimer />
              </v-row>
              <v-row align="center" justify="center">
                <v-col align="center" class="col-4">
                  <v-btn
                    @click="close"
                    text
                    color="green"
                  >
                  Cancel
                  </v-btn>
                </v-col>
                <v-col align="center" class="col-8">
                  <v-btn
                    @click=showFileText
                    x-large
                    color="secondary"
                  >
                  I got it! Give me my config!
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import Disclaimer from './Disclaimer'

export default {
  name: 'DownloadDialog',
  components: {
    Disclaimer
  },
  data: () => ({
    dialog: false,
    showFile: false,
    newFileContents: ''
  }),
  computed: {
    ...mapGetters([
      'getNewConfig'
    ])
  },
  methods: {
    reset () {
      this.newFileContents = ''
      this.showFile = false
    },
    open () {
      this.dialog = true
      // reset
      this.reset()
    },
    close () {
      this.dialog = false
      // reset
      this.reset()
    },
    showFileText () {
      // Get the new file text
      this.newFileContents = this.$store.getters.getNewConfig

      // Change state to show result
      this.showFile = true
    }
  }
}
</script>

<style lang="less">
.config-textarea {
  font-family: 'Courier New', Courier, monospace;
}
</style>
