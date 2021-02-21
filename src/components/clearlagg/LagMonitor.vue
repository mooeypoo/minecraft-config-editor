<template>
  <div class="px-5 pb-5">
    <v-btn
      class="mt-3 mx-5"
      text
      color="secondary"
      href="https://dev.bukkit.org/projects/clearlagg/pages/finding-the-cause-of-lag-spikes"
      target="_blank"
    >
      <v-icon>mdi-web</v-icon> More information about lag spikes
    </v-btn>
    <v-card-title>
      <v-switch
        v-model="$store.state.file.json['lag-spike-helper'].enabled"
        label="Enable monitoring of lag spikes"
        hint="This will print error backtraces to the server logs"
        persistent-hint
      ></v-switch>
    </v-card-title>

    <v-row
      class="mt-5 mx-5"
      v-if="$store.state.file.json['lag-spike-helper'].enabled"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="$store.state.file.json['lag-spike-helper']['min-elapsed-time']"
          :rules="numRule"
          :disabled="!$store.state.file.json['lag-spike-helper'].enabled"
          hint="It is unadvisable to use numbers under 80 milliseconds."
          persistent-hint
          label="What is the minumum time between ticks that is considered 'freeze'?"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="$store.state.file.json['lag-spike-helper']['check-interval']"
          :rules="numRule"
          :disabled="!$store.state.file.json['lag-spike-helper'].enabled"
          label="How often to run this monitor? (in milliseconds)"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row
      class="mx-5"
      v-if="$store.state.file.json['lag-spike-helper'].enabled"
    >
      <v-col>
        <v-checkbox
          v-model="$store.state.file.json['lag-spike-helper']['follow-stack']"
          label="Print all error stack traces"
          hint="This can be very spammy, but can also help in finding the cause of specific lag-producing issues."
          persistent-hint
          :disabled="!$store.state.file.json['lag-spike-helper'].enabled"
        ></v-checkbox>
      </v-col>
    </v-row>

    <v-card-title>
      <v-switch
        v-model="$store.state.file.json['ram-meter'].enabled"
        label="Enable memory (RAM) monitoring"
        persistent-hint
        hint="If this is enabled, then if RAM usage goes above the stated limit, the given commands are executed."
      ></v-switch>
    </v-card-title>
    <v-card-text
      v-if="$store.state.file.json['ram-meter'].enabled"
    >It's perfectly normal for your server to be using a lot of memory. The JVM's garbage collector will automatically free memory.<br />Only use this if you have very little memory that can't support the server.</v-card-text>
    <v-row
      class="mt-5 mx-5"
      v-if="$store.state.file.json['ram-meter'].enabled"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="$store.state.file.json['ram-meter']['ram-limit']"
          :rules="numRule"
          :disabled="!$store.state.file.json['ram-meter'].enabled"
          hint="What amount of RAM used (in MB) should trigger the commands?"
          persistent-hint
          label="RAM Threshhold limit (MB). Do not set it exactly to your max allocated RAM amount"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="$store.state.file.json['ram-meter']['interval']"
          :rules="numRule"
          :disabled="!$store.state.file.json['ram-meter'].enabled"
          label="How often should this check be performed? (in milliseconds)"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row
      class="mt-5 mx-5"
      v-if="$store.state.file.json['ram-meter'].enabled"
    >
      <v-col>
        <v-list
          dense
          :disabled="!$store.state.file.json['ram-meter'].enabled"
        >
          <v-subheader>Commands</v-subheader>
          <v-list-item
            v-for="(cmd, i) in $store.state.file.json['ram-meter'].commands"
            :key="i"
          >
            <v-btn
              text
              @click="removeRAMMeterCmd(cmd)"
              :disabled="!$store.state.file.json['ram-meter'].enabled"
            ><v-icon color="red">mdi-delete-forever</v-icon></v-btn>
            <v-list-item-content>
              <v-list-item-title v-text="cmd"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-text-field
              v-model=newRAMMeterCmd
              label="Add command"
              @keydown.enter="addRAMMeterCmd"
              :disabled="!$store.state.file.json['ram-meter'].enabled"
            >
            </v-text-field>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  name: 'ClearLaggLagMonitor',
  data: () => ({
    newRAMMeterCmd: null,
    numRule: [
      v => /^[0-9]*$/.test(v) || 'Times or durations must be numbers only.'
    ]
  }),
  methods: {
    removeRAMMeterCmd (cmd) {
      const index = this.$store.state.file.json['ram-meter'].commands.indexOf(cmd)
      this.$store.state.file.json['ram-meter'].commands.splice(index, 1)
    },
    addRAMMeterCmd (e) {
      this.$store.state.file.json['ram-meter'].commands.push(this.newRAMMeterCmd)
      this.newRAMMeterCmd = ''
    }
  }
}
</script>

<style lang="less">
</style>
