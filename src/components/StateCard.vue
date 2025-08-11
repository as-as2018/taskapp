<template>
  <div 
    class="flex items-center justify-between p-4 rounded-lg shadow transition"
    :style="{ backgroundColor: bgColor, color: textColor }"
  >
    <div>
      <div class="text-3xl font-bold">{{ number }}</div>
      <div class="opacity-90 text-sm">{{ label }}</div>
    </div>
    <Icon :icon="icon" class="text-4xl" />
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'StatCard',
  components: {
    Icon
  },
  props: {
    number: {
      type: [Number, String],
      required: true
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true // e.g. "mdi:check-circle"
    },
    bgColor: {
      type: String,
      default: 'var(--color-primary)'
    },
    textColor: {
      type: String,
      default: 'var(--color-surface)'
    }
  }
}
</script>
