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
    getLatestTokenDetails() {
        let role = null
        if (this.$state.tokensMap.size > 0)
        {
          role = this.$state.tokensMap.get(this.latestToken);
          
        }
        return role
    },
    addToken (token, userId, roleId, firstName, lastName) {
      let detailsMap = new Map();
      detailsMap['roleId'] = roleId;
      detailsMap['userId'] = userId;
      detailsMap['firstName'] = firstName;
      detailsMap['lastName'] = lastName;
      this.tokensMap.set(token, detailsMap);  
    },
    isLoggedIn() {
        return this.tokensMap.size != 0
    },
    logOut() {
        this.tokensMap.clear();
    }
  }
})
