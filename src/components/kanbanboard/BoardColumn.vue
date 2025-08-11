<template>
  <div class="bg-surface border border-border rounded-lg p-4 min-w-[250px] shadow-lg">
    <h2 class="font-bold text-lg mb-4 text-text">{{ title }}</h2>


    <BoardCard v-for="value in localCards" :task="value" />
  

  </div>
</template>

<script>
import BoardCard from "@components/kanbanboard/BoardCard.vue";

export default {
  name: "Column",
  components: {
    BoardCard
  },
  props: {
    title: { type: String, required: true },
    cards: { type: Array, required: true }
  },
  data() {
    return {
      localCards: [...this.cards]
    };
  },
  watch: {
    cards(newVal) {
      this.localCards = [...newVal];
    }
  },
  methods: {
    emitUpdate() {
      this.$emit("update-cards", this.localCards);
    }
  }
};
</script>
