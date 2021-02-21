import Vue from 'vue'
import Vuex from 'vuex'
// import YAWN from 'yawn-yaml'
import YAWN from './lib/yawn'
const yaml = require('js-yaml')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    loading: false,
    file: {
      originalText: '',
      json: null
    }
  },
  getters: {
    isError: state => !!state.error,
    isLoading: state => !!state.loading,
    isFileLoaded: state => !!state.file.originalText,
    getErrorMessage: state => {
      return state.error
    },
    getNewConfig: state => {
      // Reload the original yaml text in YAWN so we can keep comments
      const yawn = new YAWN(state.file.originalText)
      let clone = {}
      // Deep copy the json
      try {
        clone = JSON.parse(JSON.stringify(state.file.json))
      } catch (e) {
        // This should never happen
      }

      // Apply changes
      yawn.json = clone

      // Return a new yaml text
      return yawn.yaml
    }
  },
  mutations: {
    setFileText (state, fileText) {
      state.file.originalText = fileText
    },
    setFileJson (state, json) {
      state.file.json = json
      console.log('state.file.json', state.file.json)
    },
    setError (state, error) {
      state.error = error
    },
    setLoading (state, isLoading) {
      state.loading = isLoading
    }
  },
  actions: {
    reset (store) {
      store.commit('setFileText', '')
      store.commit('setFileJson', null)
      store.commit('setError', null)
    },
    setNewFile (store, filetext) {
      let yamldoc
      // Get document, or throw exception on error
      try {
        yamldoc = yaml.load(filetext)
      } catch (e) {
        // Couldn't parse the yaml
        store.commit(
          'setError',
          'Could not read the given file. Are you sure it\'s a configuration yaml?'
        )
        console.log('File loading error', e)
        return
      }

      // Check that we recognize the structure
      // TODO: Move this to a proper class/validator
      // also, check all/most the high-level props...
      // for now, this will be a quickie-check
      if (
        !yamldoc['config-version'] ||
        yamldoc['config-version'] !== 20
      ) {
        console.log('err')
        // Couldn't parse the yaml
        store.commit(
          'setError',
          'I can\'t recognize this config as a ClearLagg config. Are you sure you\'re giving me the right file?'
        )
        return
      }

      // success
      store.commit('setFileJson', yamldoc)
      store.commit('setFileText', filetext)
    },
    setNewFileFromBlank (store) {
      return fetch('./original.config.yml')
        .then(response => response.text())
        .then(text => {
          try {
            store.commit('setFileText', text)
            const doc = yaml.load(text)
            store.commit('setFileJson', doc)
          } catch (e) {
            // Reset
            store.commit('setFileText', '')
            store.commit('setFileJson', {})
            // Set error
            store.commit('setError', e)
            console.log('File loading error', e)
          }
        })
    },
    clearErrors (store) {
      store.commit('setError', null)
    },
    resetFile (store) {
      store.commit('resetFile')
    },
    setLoading (store, isLoading) {
      store.commit('setLoading', isLoading)
    }
  }
})
