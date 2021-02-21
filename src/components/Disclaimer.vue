<template>
  <v-card flat color="grey" class="my-5 lighten-2">
    <v-card-title>Disclaimer!</v-card-title>
    <v-card-text align="left">
      <p>
        This interface website was design to simplify the editing of some Minecraft plugin configuration files.
        <strong>The developer(s) and owners cannot and do not take any responsibility at all for the resulting config file, or its behavior</strong>
      </p>
      <p>
        It is up to the server admins to verify the behavior and operation of any and all config files before uploading them to a production/functional server.
      </p>
      <p>That said, we'd love to hear from you!</p>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between">
      <v-btn
        text
        target="_blank"
        href="https://github.com/mooeypoo/minecraft-config-editor/issues"
      >
        <v-icon left>mdi-spider</v-icon> Report a bug
      </v-btn>
      <v-btn
        text
        target="_blank"
        href="https://github.com/mooeypoo/minecraft-config-editor/issues"
      >
        <v-icon left>mdi-gift</v-icon> Suggest a feature!
      </v-btn>
      <v-btn
        text
        target="_blank"
        href="https://www.buymeacoffee.com/mooeypoo"
      >
        <v-icon left>mdi-heart</v-icon>Support me
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Disclaimer'
}
</script>
