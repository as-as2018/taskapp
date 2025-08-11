<template>
  <div class="p-4 bg-surface border border-border rounded-lg">
    <!-- Controls -->
    <div class="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
      <div class="flex gap-2 flex-wrap items-center">
        <!-- Tags Dropdown -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium">Tags</label>
          <select v-model="selectedTag" class="px-2 py-1 border border-primary rounded">
            <option value="">All</option>
            <option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
        </div>

        <!-- Priority -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium">Priority</label>
          <select v-model="selectedPriority" class="px-2 py-1 border border-primary rounded">
            <option value="">All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

          <!-- Status -->
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium">Status</label>
            <select v-model="selectedStatus" class="px-2 py-1 border border-primary rounded">
              <option value="">All</option>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
          </div>
      </div>

      <!-- Search + Clear + Export -->
      <div class="flex gap-2 items-center flex-wrap">
        <input
          v-model="q"
          placeholder="Search title/description..."
          class="px-3 py-1 border border border-primary rounded min-w-[220px]"
        />
        <button @click="clearFilters" class="px-3 py-1 border  border-primary rounded text-sm cursor-pointer">Clear</button>

        <!-- Export Buttons -->
        <button @click="exportJSON" class="px-3 py-1 border border-primary text-text rounded text-sm cursor-pointer">Export JSON</button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto" ref="taskTable">
      <table class="w-full table-auto text-left">
        <thead class="bg-surface border-b border-border">
          <tr class="text-sm text-text-muted">
            <th class="px-3 py-2">#</th>
            <th class="px-3 py-2">Title</th>
            <th class="px-3 py-2">Description</th>
            <th class="px-3 py-2 cursor-pointer text-nowrap" @click="toggleSort('dueDate')">
              Due Date
              <span v-if="sortBy === 'dueDate'">{{ sortDir === 1 ? '↑' : '↓' }}</span>
            </th>
            <th class="px-3 py-2 cursor-pointer text-nowrap" @click="toggleSort('createdAt')">
              Created
              <span v-if="sortBy === 'createdAt'">{{ sortDir === 1 ? '↑' : '↓' }}</span>
            </th>
            <th class="px-3 py-2">Priority</th>
            <th class="px-3 py-2">Tags</th>
            <th class="px-3 py-2">Status</th>
            <th class="px-3 py-2">Column</th>
            <th class="px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(task, idx) in filteredSortedTasks"
            :key="task.id + '-' + task.columnId"
            :class="task.completed ? 'opacity-80' : ''"
            class="odd:bg-surface"
          >
            <td class="px-3 py-2 align-top">{{ idx + 1 }}</td>
            <td class="px-3 py-2 align-top font-semibold">{{ task.title }}</td>
            <td class="px-3 py-2 align-top text-sm text-text-secondary">{{ task.description }}</td>
            <td class="px-3 py-2 align-top text-sm">{{ formatDate(task.dueDate) }}</td>
            <td class="px-3 py-2 align-top text-sm">{{ formatDate(task.createdAt) }}</td>
            <td class="px-3 py-2 align-top">
              <span :class="priorityBadgeClass(task.priority)" class="text-xs px-2 py-0.5 rounded-full">
                {{ task.priority }}
              </span>
            </td>
            <td class="px-3 py-2 align-top text-nowrap">
              <span
                v-for="t in task.tags"
                :key="t"
                class="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded mr-1"
              >
                #{{ t }}
              </span>
            </td>
            <td class="px-3 py-2 align-top">
              <label class="inline-flex items-center gap-2">                
                <span class="text-sm">{{ task?.status }}</span>
              </label>
            </td>
            <td class="px-3 py-2 align-top text-nowrap">{{ task.status }}</td>
            <td class="px-3 py-2 align-top flex flex-nowrap gap-1">
              <button @click="openEdit(task)" class="px-2 py-1 border border-primary rounded  w-10"><Icon icon="mingcute:edit-line"class="text-primary"  width="24" height="24" /></button>
              <button @click="deleteTask(task)" class="px-2 py-1 border border-red-600 rounded w-10"><Icon icon="pajamas:remove" class="text-red-600" width="24" height="24" /></button>
            </td>
          </tr>

          <tr v-if="filteredSortedTasks.length === 0">
            <td colspan="10" class="px-3 py-6 text-center text-text-muted">No tasks found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: "TableData",
  props: {
    tasks: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      q: "",
      selectedTag: "",
      selectedPriority: "",
      selectedStatus: "",
      sortBy: "dueDate",
      sortDir: 1,
    };
  },
  computed: {
    allTags() {
      const s = new Set();
      this.tasks.forEach((t) => (t.tags || []).forEach((tag) => s.add(tag)));
      return Array.from(s);
    },
    filteredSortedTasks() {
      let out = this.tasks.slice();

      if (this.q.trim()) {
        const q = this.q.trim().toLowerCase();
        out = out.filter(
          (t) =>
            (t.title || "").toLowerCase().includes(q) ||
            (t.description || "").toLowerCase().includes(q)
        );
      }

      if (this.selectedTag) {
        out = out.filter((t) => (t.tags || []).includes(this.selectedTag));
      }

      if (this.selectedPriority) {
        out = out.filter((t) => t.priority === this.selectedPriority);
      }

      if (this.selectedStatus) {
        const wantCompleted = this.selectedStatus === "Completed";
        out = out.filter((t) => !!t.completed === wantCompleted);
      }

      if (this.sortBy) {
        out.sort((a, b) => {
          const aVal = a[this.sortBy] ? new Date(a[this.sortBy]).getTime() : 0;
          const bVal = b[this.sortBy] ? new Date(b[this.sortBy]).getTime() : 0;
          return (aVal - bVal) * this.sortDir;
        });
      }

      return out;
    }
  },
  methods: {
    clearFilters() {
      this.q = "";
      this.selectedTag = "";
      this.selectedPriority = "";
      this.selectedStatus = "";
      this.sortBy = "dueDate";
      this.sortDir = 1;
    },
    formatDate(d) {
      if (!d) return "-";
      try {
        return new Date(d).toLocaleDateString();
      } catch {
        return d;
      }
    },
    priorityBadgeClass(p) {
      if (p === "High") return "bg-red-100 text-red-600";
      if (p === "Medium") return "bg-yellow-100 text-yellow-600";
      if (p === "Low") return "bg-green-100 text-green-600";
      return "bg-gray-100 text-gray-600";
    },
    toggleSort(field) {
      if (this.sortBy === field) this.sortDir = -this.sortDir;
      else {
        this.sortBy = field;
        this.sortDir = 1;
      }
    },
    openEdit(task) {  
      this.$emit("edit-task", task);
    },
  
    deleteTask(task) {
      this.$emit("task-deleted", task);
    },
  
    exportJSON() {
      const dataStr = JSON.stringify(this.filteredSortedTasks, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "tasks.json";
      link.click();
      URL.revokeObjectURL(url);
    }
  }
};
</script>
