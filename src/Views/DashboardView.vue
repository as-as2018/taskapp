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
import { mapState } from 'pinia';
import useTaskStore from '@stores/TaskStore';

export default {
  name: 'StatsView',
  components: { StateCard },

  computed: {
    ...mapState(useTaskStore, ['tasks']),

    stats() {
      const now = new Date();
      const todayDate = now.toISOString().split('T')[0];

      const totalTasks = this.tasks.length;
      const completed = this.tasks.filter(t => t.status === 'Completed').length;
      const pending = this.tasks.filter(t => t.status === 'Pending').length;

      const overdue = this.tasks.filter(t => {
        if (!t.dueDate) return false;
        return new Date(t.dueDate) < now && t.status !== 'Completed';
      }).length;

      const completedToday = this.tasks.filter(t => {
        return t.status === 'Completed' && t.completedDate === todayDate;
      }).length;

      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // start of week
      const completedThisWeek = this.tasks.filter(t => {
        if (t.status !== 'Completed' || !t.completedDate) return false;
        const date = new Date(t.completedDate);
        return date >= weekStart;
      }).length;

      return [
        { number: totalTasks, label: 'Total Tasks', icon: 'mdi:clipboard-list', bgColor: 'var(--color-primary)', textColor: 'var(--color-surface)' },
        { number: completed, label: 'Completed', icon: 'mdi:check-circle', bgColor: 'var(--color-primary)', textColor: 'var(--color-surface)' },
        { number: pending, label: 'Pending', icon: 'mdi:clock-outline', bgColor: 'var(--color-primary)', textColor: 'var(--color-surface)' },
        { number: overdue, label: 'Overdue', icon: 'mdi:alert', bgColor: 'var(--color-primary)', textColor: 'var(--color-surface)' },
        { number: completedToday, label: 'Completed Today', icon: 'mdi:calendar-today', bgColor: 'var(--color-primary)', textColor: 'var(--color-surface)' },
        { number: completedThisWeek, label: 'Completed This Week', icon: 'mdi:calendar-week', bgColor: 'var(--color-primary)', textColor: 'var(--color-surface)' }
      ];
    }
  }
}
</script>
