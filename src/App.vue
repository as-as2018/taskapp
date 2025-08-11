<script>
import SideMenu from './components/SideMenu.vue';
import Topbar from './components/Topbar.vue';

export default {
  name: 'App',
  components: { SideMenu, Topbar },
  data() {
    return {
      sidebarActive: true
    }
  },
  methods: {
    toggleSidebar() {
      this.sidebarActive = !this.sidebarActive
    },
  }
}
</script>

<template>
  <div data-theme="light" id="vue-app">
    <!-- Pass toggle event handler -->
    <Topbar :sidebarActive="sidebarActive"  @toggle-sidebar="toggleSidebar" />

    <div class="main flex w-full">
      <!-- Pass active state + close event -->
      <SideMenu  :active="sidebarActive" @close="toggleSidebar" />

      <div class="main-content overflow-auto w-full h-screen">
        <router-view />
      </div>
    </div>
  </div>
</template>
