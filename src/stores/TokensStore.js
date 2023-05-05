import { defineStore } from 'pinia'

export const useTokensStore = defineStore('tokensStore', {
  state: () => ({
    tokens: []
  }),
  getters: {
    latestToken: state => {
      let token = null
      if (state.tokens.length > 0)
      {
        token = state.tokens[state.tokens.length - 1]
      }
      return token
    },
  },
  actions: {
    addToken (token) {
      this.tokens.push(token)
    },
    isLoggedIn() {
        return this.tokens.length != 0
    }
  }
})
