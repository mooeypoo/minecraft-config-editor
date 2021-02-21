<template>
  <div id="upload-file">
    <v-card>
      <v-card-title class="display-2 text--primary">Give me your config...</v-card-title>
      <v-card-text>
        <v-row align="center" justify="center">
          <v-col align="center">
            <v-img
              contain
              alt="Zombie asking for your config"
              class="shrink mt-1 hidden-sm-and-down"
              src="../assets/Zombie_in_Minecraft-small.jpg"
              width="200"
            />
          </v-col>
          <v-col align="center" justify="center">
            <v-file-input
              label="Click to upload config.yml file"
              show-size
              @change="onChangeFile"
            ></v-file-input>
            <p>Load your ClearLagg config to the field above</p>
              <v-btn
                color="secondary"
                large
                @click="onCreateNewConfigClick"
              >Or click here to generate a new config!</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UploadFile',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'isFileLoaded'
    ])
  },
  methods: {
    onCreateNewConfigClick () {
      this.$store.dispatch('setLoading', true)
      this.$store.dispatch('reset')
      this.$store.dispatch('setNewFileFromBlank')
        .then(() => {
          this.$store.dispatch('setLoading', false)
        })
    },
    onChangeFile (file) {
      // TODO: check first that there's no file already loaded
      // before allowing for an alternative
      const reader = new FileReader()
      this.$store.dispatch('setLoading', true)
      this.$store.dispatch('reset')
      reader.onload = event => {
        this.$store.dispatch('setNewFile', event.target.result)
        this.$store.dispatch('setLoading', false)
      }
      reader.readAsText(file)
    }
  }
}
</script>

<style lang="less">
</style>
