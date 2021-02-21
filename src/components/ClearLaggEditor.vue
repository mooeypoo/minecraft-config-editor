<template>
  <div
    id='editor-clearlagg'
  >
    <v-container
      class='editor-clearlagg-tabs'
      fluid
    >
      <v-row>
        <v-col>
          <v-sheet elevation="6">
            <v-tabs
              v-model="tab"
              background-color="gray"
              dark
              next-icon="mdi-arrow-right"
              prev-icon="mdi-arrow-left"
              show-arrows
            >
              <v-tabs-slider color="yellow"></v-tabs-slider>
              <v-tab
                @click="$vuetify.goTo(getScrollTarget(data.name), scrollOptions/*{ container: '.editor-clearlagg-container'}*/)"
                v-for="data in tabs"
                :key="data.name"
              >
                {{data.menu}}
              </v-tab>
            </v-tabs>

          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <div class="editor-clearlagg-container">
        <v-row
          class="my-10"
          justify="center"
          id="tab-general-settings"
        >
          <v-col cols=9>
            <v-card>
              <v-card-title>{{getTabTitle('general-settings')}}</v-card-title>
              <v-card-subtitle>{{getTabDescription('general-settings')}}</v-card-subtitle>
              <ClearLaggGeneralSettings />
            </v-card>
          </v-col>
        </v-row>

        <v-row
          class="my-10"
          justify="center"
          id="tab-lag-monitor"
        >
          <v-col cols=9>
            <v-card>
              <v-card-title>{{getTabTitle('lag-monitor')}}</v-card-title>
              <v-card-subtitle>{{getTabDescription('lag-monitor')}}</v-card-subtitle>
              <ClearLaggLagMonitor />
            </v-card>
          </v-col>
        </v-row>

        <v-row
          class="my-10"
          justify="center"
          id="tab-limiters"
        >
          <v-col cols=9>
            <v-card>
              <v-card-title>{{getTabTitle('limiters')}}</v-card-title>
              <v-card-subtitle>{{getTabDescription('limiters')}}</v-card-subtitle>
              <ClearLaggLimiters />
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import ClearLaggGeneralSettings from './clearlagg/GeneralSettings'
import ClearLaggLagMonitor from './clearlagg/LagMonitor'
import ClearLaggLimiters from './clearlagg/Limiters'

export default {
  name: 'ClearLaggEditor',
  components: {
    ClearLaggGeneralSettings,
    ClearLaggLagMonitor,
    ClearLaggLimiters
  },
  data () {
    return {
      tab: null,
      tabs: [
        {
          name: 'general-settings',
          menu: 'General',
          title: 'General plugin settings',
          description: 'General settings for the behavior of the plugin and its environment.'
        },
        {
          name: 'lag-monitor',
          menu: 'Monitoring',
          title: 'RAM and lag monitors',
          description: 'Output data to the logs when certain lag-related conditions are met. Aimed at helping admins review stack-traces of errors to find the cause of lag-producing issues.'
        },
        {
          name: 'limiters',
          menu: 'Limiters',
          title: 'Chunk and Entity Limiters'
        }
      ]
    }
  },
  computed: {
    scrollOptions: () => ({
      duration: 100,
      offset: 0,
      easing: 'easeInOutQuad',
      container: '.editor-clearlagg-container'
    })
  },
  methods: {
    getTabTitle (tabName) {
      const tab = this.tabs.filter(data => data.name === tabName)
      return tab[0] && tab[0].title
    },
    getTabDescription (tabName) {
      const tab = this.tabs.filter(data => data.name === tabName)
      return tab[0] && tab[0].description
    },
    getScrollTarget (tabId) {
      return `#tab-${tabId}`
    }
  }
}
</script>

<style lang="less">
.editor-clearlagg {
  &-container {
    // 100% height - top bar - tab height - container padding - footer - threshhold
    height: calc(100vh - 70px - 60px - 24px - 104px - 20px);
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>
