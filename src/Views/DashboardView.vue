<template>
  <div class="p-6 space-y-8 bg-surface text-[var(--color-text)]">
    <h2 class="text-text text-2xl font-bold">Task Statistics</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <StateCard
        v-for="(stat, index) in stats"
        :key="index"
        :number="stat.number"
        :label="stat.label"
        :icon="stat.icon"
        :bgColor="stat.bgColor"
        :textColor="stat.textColor"
      />
    </div>
  </div>
</template>

<script>
import StateCard from '@components/StateCard.vue';

export default {
  name: 'StatsView',
  components: {
    StateCard
  },
  data() {
    return {
      stats: [
        { number: 12, label: 'Total Tasks', icon: 'mdi:clipboard-list', bgColor: 'var(--color-primary)', textColor: 'var(--color-surface)' },
        { number: 8, label: 'Completed', icon: 'mdi:check-circle', bgColor: 'var(--color-primary)', textColor: 'var(--color-surface)' },
        { number: 3, label: 'Pending', icon: 'mdi:clock-outline', bgColor: 'var(--color-primary)', textColor: 'var(--color-surface)' },
        { number: 1, label: 'Overdue', icon: 'mdi:alert', bgColor: 'var(--color-primary)', textColor: 'var(--color-surface)' },
        { number: 5, label: 'Completed Today', icon: 'mdi:calendar-today', bgColor: 'var(--color-primary)', textColor: 'var(--color-surface)' },
        { number: 9, label: 'Completed This Week', icon: 'mdi:calendar-week', bgColor: 'var(--color-primary)', textColor: 'var(--color-surface)' }
      ]
    }
  }
}
</script>
