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
      @close="closeModal"
      @update="handleTaskUpdated"
      @save="handleSaveTask"
    />
</template>

<script>
import Board from "@components/kanbanboard/Board.vue";
import TableData from "@components/TableData/TableData.vue";
import TaskFormModal from "@components/TaskFormModal.vue";
import useTaskStore from "@stores/TaskStore";
import { mapState, mapActions } from "pinia";
import { useWebNotification } from "@vueuse/core";

export default {
  components: { Board, TableData, TaskFormModal },
  data() {
    return {
      view: "board",
      showModal: false,
    };
  },
  setup() {
    const { isSupported, show } = useWebNotification();

    const sendNotification = (title, body) => {
      if (!isSupported.value) {
        console.warn("Notifications not supported in this browser.");
        return;
      }
      show({
        title,
        body,
        icon: "/icons/task.png", // optional icon
      });
    };

    return { sendNotification };
  },
  methods: {
    ...mapActions(useTaskStore, [
      "loadTasks",
      "setTasks",
      "setSelectedTask",
      "resetSelectedTask",
      "updateTask",
      "deleteTask",
      "moveTask"
    ]),

    openCreateModal() {
      this.selectedTask = null;
      this.showModal = true;
    },

    openEditModal(task) {
      this.setSelectedTask(task);
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.resetSelectedTask();
    },

    handleSaveTask(task) {
      this.setTasks(task);
      this.sendNotification("Task Added ✅", `Task "${task.title}" has been created.`);
      this.showModal = false;
    },

    handleTaskUpdated(task) {
      task && this.updateTask(task);
      this.sendNotification("Task Updated ✏️", `Task "${task.title}" has been updated.`);
      this.showModal = false;
    },

    handleTaskDeleted(task) {
      task.id && this.deleteTask(task.id);
      this.sendNotification("Task Deleted 🗑️", `Task "${task.title}" has been removed.`);
    },

    updateColumns(selectedCard) {
      this.openEditModal(selectedCard);
    }
  },
  computed: {
    ...mapState(useTaskStore, ["tasks", "selectedTask"]),
  },
  beforeMount() {
    this.loadTasks();
  }
};
</script>

