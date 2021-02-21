import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    light: true,
    themes: {
      light: {
        primary: colors.blue,
        // primary: colors.blue.lighten3,
        secondary: colors.blue.darken3,
        accent: '#303030',
        error: '#f44336',
        warning: '#ffc107',
        info: '#52aaf4',
        success: '#4caf50'
      }
    }
  }
})
