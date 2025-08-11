<template>
    <!-- View Toggle -->
    <div class="flex gap-2 items-center mb-4 border-b border-border p-2">
      <button
        @click="view = 'board'"
        :class="view === 'board' ? 'bg-primary text-white' : 'bg-surface'"
        class="px-3 py-1 rounded border-1 border-border cursor-pointer"
      >
        Board
      </button>
      <button
        @click="view = 'table'"
        :class="view === 'table' ? 'bg-primary text-white' : 'bg-surface'"
        class="px-3 py-1 rounded border-1 border-border cursor-pointer"
      >
        Table
      </button>

      <button
        class="ml-auto bg-primary text-white px-3 py-1 rounded"
        @click="openCreateModal"
      >
        + Add Task
      </button>
    </div>

    <!-- Board View -->
    <Board
      v-if="view === 'board'"
      :tasks="tasks"
      @update:columns="updateColumns"
      @edit-task="openEditModal"
    />

    <!-- Table View -->
    <TableData
      v-else
      :tasks="tasks"
      @task-updated="handleTaskUpdated"
      @task-deleted="handleTaskDeleted"
      @edit-task="openEditModal"
    />

    <!-- Task Modal -->
    <TaskFormModal
      :visible="showModal"
      :task="selectedTask"
      @close="showModal = false"
      @update="handleTaskUpdated"
      @save="handleSaveTask"
    />
</template>

<script>
import Board from "@components/kanbanboard/Board.vue";
import TableData from "@components/TableData/TableData.vue";
import TaskFormModal from "@components/TaskFormModal.vue";
import  useTaskStore  from "@stores/taskStore";
import { mapState,mapActions } from "pinia";


export default {
  components: { Board, TableData, TaskFormModal },
  data() {
    return {
      view: "board",
      showModal: false,
      // selectedTask: null,
    };
  },
  methods: {
    ...mapActions(useTaskStore, ['loadTasks', 'setTasks', 'setSelectedTask','updateTask','deleteTask', 'deleteTask', 'moveTask']),
    openCreateModal() {
      this.selectedTask = null;
      this.showModal = true;
    },
    openEditModal(task) {
      console.log('Editing task:', task);
      this.setSelectedTask(task);
      // this.selectedTask = task;
      this.showModal = true;
    },
    handleSaveTask(task) {
      this.setTasks(task);
      console.log('Task saved:', task);
      this.showModal = false;
    },
    handleTaskUpdated(task) {
      console.log('Task updated:', task);
      // task && this.updateTask(task);
      this.showModal = false;
      
    },
    handleTaskDeleted(task) {
      console.log('Task deleted:', task);
      task.id && this.deleteTask(task.id);
      
    },
    updateColumns(columns) {
      // Handle column updates if needed
      console.log('Columns updated:', columns);
    }
  },
 computed: {
    ...mapState(useTaskStore, ['tasks','selectedTask']),
  },
  beforeMount() {
    this.loadTasks();
  },  
 
};
</script>
