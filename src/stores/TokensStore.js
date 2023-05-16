import { defineStore } from 'pinia'

export const useTokensStore = defineStore('tokensStore', {
  state: () => ({
    tokensMap: new Map()
  }),
  getters: {
    latestTokenRole: state => {
      let role = null
      if (state.tokensMap.size > 0)
      {
        role = myMap.get(latestToken);
        
      }
      return role
    },
    latestToken: state => {
        let token = null
        if (state.tokensMap.size > 0)
        {
          token = Array.from(state.tokensMap.keys()).pop();          
        }
        return token
      }
  },
  actions: {
    addToken (token, role) {
      this.tokensMap.set(token, role);  
    },
    isLoggedIn() {
        return this.tokensMap.size != 0
    },
    logOut() {
        this.tokensMap.clear();
    }
  }
})
