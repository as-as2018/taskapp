<template>
  <div
    class="bg-surface border border-border rounded-lg my-4 p-4 shadow-sm hover:shadow-md transition cursor-pointer"
  >
    <!-- Title & Status -->
    <div class="flex justify-between items-start">
      <h3 class="font-semibold text-text text-lg">
        {{ task.title }}
      </h3>
      <span
        class="text-xs px-2 py-1 rounded-full"
        :class="statusClasses"
      >
        {{ task.status }}
      </span>
    </div>

    <!-- Description -->
    <p class="text-sm text-text-secondary mt-2 line-clamp-3">
      {{ task.description }}
    </p>

    <!-- Due Date & Priority -->
    <div class="flex justify-between items-center mt-3">
      <div class="text-xs text-text-secondary">
        📅 {{ formattedDueDate }}
      </div>
      <span
        class="text-xs px-2 py-1 rounded-full"
        :class="priorityClasses"
      >
        {{ task.priority }}
      </span>
    </div>

    <!-- Tags -->
    <div class="flex flex-wrap gap-2 mt-3">
      <span
        v-for="tag in task.tags"
        :key="tag"
        class="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
      >
        #{{ tag }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardCard",
  props: {
    task: {
      type: Object,
      required: true,
      validator(value) {
        return (
          "title" in value &&
          "description" in value &&
          "dueDate" in value &&
          "priority" in value &&
          "tags" in value &&
          "status" in value
        );
      }
    }
  },
  computed: {
    priorityClasses() {
      switch (this.task.priority) {
        case "High":
          return "bg-red-100 text-red-600";
        case "Medium":
          return "bg-yellow-100 text-yellow-600";
        case "Low":
          return "bg-green-100 text-green-600";
        default:
          return "bg-gray-100 text-gray-600";
      }
    },
    statusClasses() {
      return this.task.status === "Completed"
        ? "bg-green-100 text-green-700"
        : "bg-gray-200 text-gray-700";
    },
    formattedDueDate() {
      try {
        return new Date(this.task.dueDate).toLocaleDateString();
      } catch {
        return this.task.dueDate;
      }
    }
  }
};
</script>
