import { defineStore } from 'pinia'

export const useTokensStore = defineStore('tokensStore', {
  state: () => ({
    tokensMap: new Map()
  }),
  getters: {

    // role '1' = admin
    // role '2' = user
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
    getLatestTokenRole() {
        let role = null
        if (this.$state.tokensMap.size > 0)
        {
          role = this.$state.tokensMap.get(this.latestToken);
          
        }
        return role
    },
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
