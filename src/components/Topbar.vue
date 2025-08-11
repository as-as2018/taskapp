<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'Topbar',
  props: {
    sidebarActive: { type: Boolean, default: false }
  },
  components: { Icon },
  emits: ['toggle-sidebar'],
  methods: {
    toggleTheme() {
      const appDiv = document.getElementById('vue-app');
      console.log(appDiv);
      
      const currentTheme = appDiv.getAttribute('data-theme');
      console.log(currentTheme);
      appDiv.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
    }
  },

}
</script>

<template>
  <div class="topbar flex justify-between items-center bg-surface shadow-2xl">
    <div class="flex items-center  gap-2 border-r border-border py-4"
      :class="sidebarActive ? 'w-64 justify-between' : 'w-16 justify-center'">
      <!-- Sidebar Toggle Icon -->
      <span @click="$emit('toggle-sidebar')"
        class="cursor-pointer bg-primary hover:bg-primary/60  text-white rounded-xl shadow-xl">
        <Icon icon="ei:navicon" width="40" height="40" />
      </span>
      <span  v-show="sidebarActive" class="text-text font-semibold pr-2 ">Task App</span>
    </div>
    <div @click="toggleTheme" class="topbar-right p-2 shadow-lg rounded-full bg-primary hover:bg-primary/60  text-white cursor-pointer">
      <Icon  icon="iconamoon:mode-light-bold" class="text-text-hover" width="24" height="24" />
    </div>
  </div>
</template>
