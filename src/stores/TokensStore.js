import { defineStore } from 'pinia'

export const useTokensStore = defineStore('tokensStore', {
  state: () => ({
    tokensMap: new Map()
  }),
  getters: {
    latestToken: state => {
      let role = null
      if (state.tokensMap.size > 0)
      {
        role = myMap.get(Array.from(state.tokensMap.keys()).pop());
        
      }
      return role
    },
  },
  actions: {
    addToken (token, role) {
      this.tokensMap[token] = role;  
    },
    isLoggedIn() {
        return this.tokensMap.size != 0
    }
  }
})
