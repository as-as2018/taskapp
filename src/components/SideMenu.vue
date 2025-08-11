<script>
export default {
  name: 'SideMenu',
  data() {
    return {
      menuItems: [
        { name: 'Dashboard', path: '/', icon: 'mdi-light:home' },
        { name: 'Tasks', path: '/tasks', icon: 'mdi-light:check-circle' },
      ]
    }
  },
  props: {
    active: { type: Boolean, default: false }
  },
  emits: ['close'],
}
</script>

<template>
  <div class="relative">

    <!-- Sidebar -->
    <transition name="slide">
      <aside
        v-show="active"
        class="slide"
        :class="{
          'translate-x-0': active,
          '-translate-x-full md:translate-x-0': !active
        }"
      >
        <!-- Menu Items -->
        <div
          v-for="{ name, path, icon } in menuItems"
          :key="name"
          class="mb-2"
        >
          <router-link
            :to="path"
            class="slink-warpper"           
            @click.native="$emit('close')"
          >
            <Icon :icon="icon" width="20" height="20" class="slink-icon" />
            <span class="slink-title">{{ name }}</span>
          </router-link>
        </div>
      </aside>
    </transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
