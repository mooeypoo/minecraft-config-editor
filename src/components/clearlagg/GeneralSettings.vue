<template>
  <div class="px-5 pb-5">
    <v-select
      label="Language"
      :items=langaugeItems
      autocomplete
      required
      v-model="$store.state.file.json.settings.language"
    ></v-select>
    <v-checkbox
      label="Update the plugin automatically"
      hint="Automatically download a new version of this plugin if one becomes available."
      persistent-hint
      v-model="$store.state.file.json.settings['auto-update']"
    ></v-checkbox>
    <v-checkbox
      label="Force configuration update"
      hint="Dictates whether or not clearlag will reset your config with a newer version. Settings this to false will make clearlag update your config rather then resetting"
      persistent-hint
      v-model="$store.state.file.json['config-updater']['force-update']"
    ></v-checkbox>
    <v-checkbox
      label="Enable API"
      hint=""
      persistent-hint
      v-model="$store.state.file.json.settings['enable-api']"
    ></v-checkbox>
    <v-checkbox
      label="Use internal TPS"
      hint="Should Clearlag use Spigot's /tps? (Updated by minutes, much slower, but more accurate!)"
      persistent-hint
      v-model="$store.state.file.json.settings['use-internal-tps']"
    ></v-checkbox>
    <v-card-title>
      <v-switch
        v-model="$store.state.file.json['global-broadcasts'].enabled"
        hint="Enable global chat broadcasts"
      ></v-switch>
      Broadcasts
    </v-card-title>
    <v-row
      v-if="$store.state.file.json['global-broadcasts'].enabled"
    >
      <v-col>
        <v-checkbox
          label="Use asynchronous thread for broadcasts"
          hint="Broadcasts will be processed in a different CPU thread. This is better for performance, but may result in mismatch timing for the broadcast text in chat."
          persistent-hint
          :disabled="!$store.state.file.json['global-broadcasts'].enabled"
          v-model="$store.state.file.json['global-broadcasts'].async"
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row
      v-if="$store.state.file.json['global-broadcasts'].enabled"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-checkbox
          v-model="$store.state.file.json['global-broadcasts']['use-permission-for-broadcasts']"
          label="Use permission"
          hint="Broadcasts will be processed in a different thread."
          persistent-hint
          :disabled="!$store.state.file.json['global-broadcasts'].enabled"
        ></v-checkbox>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="$store.state.file.json['global-broadcasts'].permission"
          :rules="permissionRule"
          :disabled="!$store.state.file.json['global-broadcasts']['use-permission-for-broadcasts']"
          label="Permission name"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ClearLaggGeneralSettings',
  data: () => ({
    language: null,
    // TODO: Maybe fetch latest langaugeds from the language repo?
    // at https://api.github.com/repos/bob7l/Clearlag-Languages/contents
    langaugeItems: [
      { value: 'BrazilianPortuguese', text: 'Brazilian Portuguese' },
      { value: 'ChineseSimplified', text: 'Simplified Chinese' },
      { value: 'ChineseTraditional', text: 'Traditional Chinese' },
      { value: 'Czech', text: 'Czech' },
      { value: 'English', text: 'English' },
      { value: 'French', text: 'French' },
      { value: 'German', text: 'German' },
      { value: 'Japanese', text: 'Japanese' },
      { value: 'Korean', text: 'Korean' },
      { value: 'Polish', text: 'Polish' },
      { value: 'Russian', text: 'Russian' },
      { value: 'Spanish', text: 'Spanish' }
    ],
    permissionRule: [
      v => /^[a-zA-Z0-9.]*$/.test(v) || 'Permission can only inlclude alphanumeric characters, and no spaces.'
    ]
  }),
  methods: {
  }
}
</script>
