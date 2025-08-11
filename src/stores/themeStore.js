import { defineStore } from "pinia";

const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: "light",
  }),

  getters: {
    getTheme: (state) => state.theme,
  },

  actions: {
   
    toggleTheme() {
        const appDiv = document.getElementById('vue-app');
        console.log(appDiv);
        
        const currentTheme = appDiv.getAttribute('data-theme');
        console.log(currentTheme);
        this.theme = currentTheme === 'light' ? 'dark' : 'light';
        appDiv.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
     
    },
   
   
  },

  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, key: 'theme-store' }
    ]
  }
});

export default useThemeStore;
