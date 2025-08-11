import { defineStore } from "pinia";

const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [],
    selectedTask: null,
  }),

  getters: {
    getTasks: (state) => state.tasks,
    getSelectedTask: (state) => state.selectedTask,
  },

  actions: {
    async loadTasks() {
      this.loading = true;
      this.error = null;

      try {
        // Simulate API call - replace with actual API
        const mockTasks = [
          {
            id: 1,
            title: "Setup project",
            description: "Initialize repository and create project structure",
            dueDate: "2025-08-10",
            priority: "High",
            tags: ["setup", "project"],
            status: "To Do",
            columnId: 1,
            createdAt: "2025-01-01T10:00:00Z",
            updatedAt: "2025-01-01T10:00:00Z",
            completed: false,
          },
          {
            id: 2,
            title: "Install dependencies",
            description: "Install Vue, Tailwind, and vue-draggable-next",
            dueDate: "2025-08-12",
            priority: "Medium",
            tags: ["npm", "setup"],
            status: "To Do",
            columnId: 1,
            createdAt: "2025-01-01T11:00:00Z",
            updatedAt: "2025-01-01T11:00:00Z",
            completed: false,
          },
          {
            id: 3,
            title: "Create Kanban UI",
            description: "Build the drag-and-drop Kanban layout",
            dueDate: "2025-08-14",
            priority: "High",
            tags: ["UI", "kanban"],
            status: "In Progress",
            columnId: 2,
            createdAt: "2025-01-01T12:00:00Z",
            updatedAt: "2025-01-01T12:00:00Z",
            completed: false,
          },
          {
            id: 4,
            title: "Design wireframes",
            description: "Mock up the layout for the Kanban board",
            dueDate: "2025-08-07",
            priority: "Low",
            tags: ["design"],
            status: "Pending",
            columnId: 3,
            createdAt: "2025-01-01T09:00:00Z",
            updatedAt: "2025-01-01T09:00:00Z",
            completed: false,
          },
          {
            id: 5,
            title: "Design wireframes",
            description: "Mock up the layout for the Kanban board",
            dueDate: "2025-08-07",
            priority: "Low",
            tags: ["design"],
            status: "Completed",
            columnId: 4,
            createdAt: "2025-01-01T09:00:00Z",
            updatedAt: "2025-01-01T09:00:00Z",
            completed: true,
          },
        ];

        // this.tasks = mockTasks;
        this.tasks=this.tasks
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
    setTasks(task) {
      const newTask = {
        ...task,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        completed: task.status === 'Completed'
      }
      
      this.tasks.push(newTask)
      return newTask
    },
    setSelectedTask(task) {
      this.selectedTask = task;
    },
    updateTask(updatedTask) {
      console.log("Updating task:", updatedTask);
       const index = this.tasks.findIndex(task => task.id === updatedTask.id)
      if (index !== -1) {
        this.tasks[index] = {
          ...updatedTask,
          columnId:updatedTask.status==='To Do'?1:updatedTask.status==='Pending'?3:updatedTask.status==='In Progress'?2:4,
          updatedAt: new Date().toISOString(),
          completed: updatedTask.status === 'Completed'
        }
      }
    },
    deleteTask(taskId) {
      const index = this.tasks.findIndex(task => task.id === taskId)
      if (index !== -1) {
        this.tasks.splice(index, 1)
      }
    },
  },

  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, key: 'task-store' }
    ]
  }
});

export default useTaskStore;
