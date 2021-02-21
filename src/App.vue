<template>
  <v-app>
    <v-app-bar
      app
      class="blue lighten-3"
    >
      <v-img
        alt="Minecraft config editor"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        max-height="50"
        src="./assets/minecraft_cube.svg"
        width="50"
      />
      <v-toolbar-title>Minecraft plugin config editor</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title>ClearLagg config</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
        href="https://www.buymeacoffee.com/mooeypoo"
        target="_blank"
        text
      >
        <v-icon>mdi-heart</v-icon>
        <span class="mx-2">Support this</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-app-bar>

<!-- <pre>{{ $store.state.file.json }}</pre> -->
    <v-main>
      <v-overlay :value="isLoading">
        <v-progress-circular
          indeterminate
          size="100"
          color="pink"
        ></v-progress-circular>
      </v-overlay>

      <v-container fill-height v-if="!isFileLoaded">
        <v-row align="center" justify="center">
          <v-col cols="6">
            <v-alert
              v-if="getErrorMessage"
              border="bottom"
              color="pink darken-1"
              dark
            >
            {{ getErrorMessage }}
            </v-alert>
            <UploadFile />
          </v-col>
        </v-row>
      </v-container>

      <ClearLaggEditor v-if="isFileLoaded" />

      <v-footer fixed class="grey darken-3" v-if="isFileLoaded">
        <v-row justify="center" class="py-5">
          <v-col md="2">
            <v-btn
              color="warning"
              text
              x-large
              @click="onResetButtonClick"
            >
              Reset
            </v-btn>
          </v-col>
          <v-col md="4">
            <v-btn
              color="success"
              x-large
              @click="onDownloadButtonClick"
            >
              Get new Config file
            </v-btn>
          </v-col>
        </v-row>
      </v-footer>

    <!-- Reset dialog -->
    <ResetDialog ref="resetDialog" />
    <!-- Download dialog -->
    <DownloadDialog ref="downloaDialog" />

    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import UploadFile from './components/UploadFile'
import ClearLaggEditor from './components/ClearLaggEditor'
import ResetDialog from './components/ResetDialog'
import DownloadDialog from './components/DownloadDialog'

export default {
  name: 'App',
  components: {
    UploadFile,
    ClearLaggEditor,
    ResetDialog,
    DownloadDialog
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters([
      'isError',
      'getErrorMessage',
      'isLoading',
      'isFileLoaded'
    ])
  },
  methods: {
    onResetButtonClick () {
      this.$refs.resetDialog.open()
    },
    onDownloadButtonClick () {
      this.$refs.downloaDialog.open()
    }
  }
}
</script>

<style lang="less">
body {
  overflow-y: hidden;
}
.theme--light.v-application#app {
  background-color: #607d8b;
}
</style>
