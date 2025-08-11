<template>
  <div class="flex gap-4 mt-6 overflow-x-auto">
    <BoardColumn
      v-for="col in columns"
      :key="col.id"
      :title="col.title"
      :cards="col.cards"
      @update-cards="updateColumnCards(col.id, $event)"
    />
  </div>
</template>

<script>
import BoardColumn from '@components/kanbanboard/BoardColumn.vue';

export default {
  name: "Board",
  components: { BoardColumn },
  props: {
    tasks: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns:[
      { id: 1, title: 'To Do', cards: [] },
      { id: 2, title: 'In Progress', cards: [] },
      { id: 3, title: 'Pending', cards: [] },
      { id: 4, title: 'Completed', cards: [] }
      ]
    };
  },
  emits: ["update:columns"],
  methods: {
    updateColumnCards(columnId, newCards) {
      const updated = this.columns.map(col =>
        col.id === columnId ? { ...col, cards: newCards } : col
      );
      this.$emit("update:columns", updated);
    }
  },
  beforeMount() {
    console.log('Board component loaded',JSON.parse(JSON.stringify(this.tasks)));
    this.columns.forEach(col => {
      col.cards = this.tasks.filter(task => task.status === col.title);
    });
  }
  
};
</script>
