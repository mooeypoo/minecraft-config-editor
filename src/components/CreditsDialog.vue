<template>
  <v-dialog
    v-model="dialog"
    width="80%"
  >
    <v-card>
      <v-card-title class="headline">
        Pssssssssst, you there...
      </v-card-title>
      <v-card-text>
        <v-row align="center" justify="center">
          <v-col align="center" class="col-2">
            <v-img
              contain
              alt="Creeper about to go BOOM on your config!"
              class="shrink mt-1 hidden-sm-and-down"
              src="../assets/Creeper_in_Minecraft.png"
              width="200"
            />
          </v-col>
          <v-col align="center" justify="center" class="col-10">
            <h2>Thank you for being here!</h2>
            <p>This tool was created with <v-icon color="red">mdi-heart</v-icon> by Moriel Schottlender (mooeypoo).</p>
            <Disclaimer />

            <!-- credits -->
            <v-card flat color="grey" class="my-5 lighten-2">
              <v-card-title>Image credits!</v-card-title>
              <v-card-text align="left">
                <p>Images are used with accordance to their (open source compliant!) copyrights:</p>
                <p>
                  <ul>
                    <li>Minecraft cube (logo): <a href="https://commons.wikimedia.org/wiki/File:Minecraft_cube.svg">Albin Olsson</a>, Public domain, via Wikimedia Commons</li>
                    <li>Zombie: <a href="https://commons.wikimedia.org/wiki/File:Zombie_in_Minecraft.jpg">KiKijessup</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons</li>
                    <li>Creeper: <a href="https://commons.wikimedia.org/wiki/File:Creeper_in_MInecraft.png">KiKijessup</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons</li>
                    <li>Enderman: <a href="https://commons.wikimedia.org/wiki/File:Enderman.png">KiKijessup</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0">CC BY-SA 4.0</a>, via Wikimedia Commons</li>
                  </ul>
                </p>
              </v-card-text>
            </v-card>

          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          x-large
          color="green"
          dark
          @click="close"
        >
          <v-icon left>mdi-heart</v-icon>&nbsp;Got it!
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Disclaimer from './Disclaimer'
export default {
  name: 'CreditsDialog',
  data: () => ({
    dialog: false
  }),
  components: {
    Disclaimer
  },
  methods: {
    open () {
      this.dialog = true
    },
    close () {
      this.dialog = false
    }
  }
}
</script>
