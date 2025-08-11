<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center sm:px-0"
  >
    <div
      class="bg-surface rounded-t-lg sm:rounded-lg w-full sm:max-w-lg shadow-lg 
             h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto 
             absolute bottom-0 sm:static"
    >
      <!-- Header -->
      <div class="p-4 sm:p-6 border-b flex justify-between items-center">
        <h2 class="text-primary text-lg sm:text-xl font-bold">
          {{ task ? 'Edit Task' : 'Create Task' }}
        </h2>
        <button @click="$emit('close')" class="text-primary font-bold hover:text-primary/60 cursor-pointer">
          ✕
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-4 sm:p-6 space-y-4">
        <!-- Title -->
        <div>
          <label class="block font-medium mb-1">Title</label>
          <input
            v-model="form.title"
            type="text"
            class="w-full border border-border rounded px-3 py-2 text-sm sm:text-base"
          />
          
          <span v-if="v$.form.title.$error" class="text-red-500 text-sm">
            <span v-if="v$.form.title.required">Title is required.</span>
            <span v-if="v$.form.title.minLength"> Title must be at least 3 characters.</span>
          </span>
        </div>

        <!-- Description -->
        <div>
          <label class="block font-medium mb-1">Description</label>
          <textarea
            v-model="form.description"
            class="w-full border border-border rounded px-3 py-2 text-sm sm:text-base"
            rows="3"
          ></textarea>
        
          
          <span v-if="v$.form.description.$error" class="text-red-500 text-sm">
            <span v-if="v$.form.description.required">Description is required.</span>
            <span v-if="v$.form.description.minWords"> Description must be at least 10 words.</span>
          </span>
        </div>

        <!-- Due Date -->
        <div>
          <label class="block font-medium mb-1">Due Date</label>
          <input
            v-model="form.dueDate"
            type="date"
            class="w-full border border-border rounded px-3 py-2 text-sm sm:text-base"
          />
            
          <span v-if="v$.form.dueDate.$error" class="text-red-500 text-sm">
            <span v-if="v$.form.dueDate.required">Due date is required.</span>            
          </span>
        </div>

        <!-- Priority -->
        <div>
          <label class="block font-medium mb-1">Priority</label>
          <select
            v-model="form.priority"
            class="w-full border border-border rounded px-3 py-2 text-sm sm:text-base"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <span v-if="v$.form.priority.$error" class="text-red-500 text-sm">
            Priority is required.
          </span>
        </div>

        <!-- Tags -->
        <div>
          <label class="block font-medium mb-1">Tags</label>
          <input
            v-model="form.tags"
            type="text"
            placeholder="Comma separated"
            class="w-full border border-border rounded px-3 py-2 text-sm sm:text-base"
          />
             
          <span v-if="v$.form.tags.$error" class="text-red-500 text-sm">
            <span v-if="v$.form.tags.required">tags is required.</span>
            <span v-if="v$.form.tags.commaSeparated"> Tags must be comma-separated (e.g. tag1, tag2, tag3).</span>
          </span>
        </div>

        <!-- Status -->
        <div>
          <label class="block font-medium mb-1">Status</label>
          <select
            v-model="form.status"
            class="w-full border border-border rounded px-3 py-2 text-sm sm:text-base"            
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <span v-if="v$.form.status.$error" class="text-red-500 text-sm">
            Status is required.
          </span>
        </div>

        <!-- Actions -->
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="text-white bg-red-600 px-4 py-2 cursor-pointer rounded text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-primary text-white rounded cursor-pointer text-sm sm:text-base"
          >
           {{ task?.id ? 'Update Task' : 'Create Task' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { commaSeparated, minWords } from "@validators/validators";


export default {
  name: "TaskFormModal",
  props: {
    visible: { type: Boolean, default: false },
    task: { type: Object, default: null },
  },
  data() {
    return {
      form: {
        id: null,
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        tags: "",
        status: "To Do",
        columnId: 1
      }
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      form: {
        title: { required, minLength: minLength(3) },
        description: { required, minWords: minWords(10) },
        dueDate: { required },
        priority: { required },
        tags: { required, commaSeparated },
        status: { required }
      }
    };
  },
  watch: {
    task: {
      handler(newVal) {
        this.setForm({ ...newVal });
      },
      immediate: true,
    },
  },
  methods: {
    setForm(task) {
      if (task) {
        this.form = {
          ...task,
          tags: task.tags ? task.tags.join(", ") : ""
        };
      } else {
        this.resetForm();
      }
    },
    resetForm() {
      this.form = {
        id: null,
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        tags: "",
        status: "To Do",
        columnId: 1
      };
    },
    async handleSubmit() {
      this.v$.$touch();
      if (this.v$.$invalid) return;

      if (this.form.id) {
        this.form.tags = this.form.tags
          ? this.form.tags.split(",").map(tag => tag.trim())
          : [];

          console.log("task::update", this.form);
          
        this.$emit("update", this.form);
      } else {
        this.form.tags = this.form.tags
          ? this.form.tags.split(",").map(tag => tag.trim())
          : [];
        this.form.id = Date.now();
        this.$emit("save", this.form);
      }
      this.resetForm();
      this.$emit("close");
    }
  }
};
</script>
