<template>
  <nav class="tab-nav">
    <button
      v-for="tab in props.tabs"
      :key="tab.id"
      type="button"
      class="tab-btn"
      :class="{ active: model === tab.id }"
      :aria-expanded="model === tab.id"
      @click="toggleTab(tab.id)"
    >
      <i :class="tab.icon"></i>
      <span class="tab-label">{{ tab.label }}</span>
      <span v-if="tab.count !== undefined" class="tab-count">{{ tab.count }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  tabs: {
    id: string;
    label: string;
    icon: string;
    count?: number;
  }[];
}>();

const model = defineModel<string | null>({ required: true });

function toggleTab(id: string) {
  model.value = model.value === id ? null : id;
}
</script>

<style lang="scss" scoped>
.tab-nav {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: var(--c-bg-base);
  border-bottom: 1px solid var(--c-border);
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 6px;
  border: none;
  border-right: 1px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-text-muted);
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.tab-btn:last-child {
  border-right: none;
}

.tab-btn:hover {
  background: var(--c-surface-elevated);
  color: var(--c-text-main);
}

.tab-btn.active {
  background: var(--c-surface-elevated);
  color: var(--c-primary);
  box-shadow: inset 0 -2px 0 var(--c-primary);
}

.tab-count {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  padding: 1px 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  color: var(--c-text-secondary);
}

.tab-btn.active .tab-count {
  background: var(--c-primary-soft);
  color: var(--c-primary);
}

@media (max-width: 560px) {
  .tab-nav {
    grid-template-columns: repeat(2, 1fr);
  }
  .tab-btn:nth-child(2) {
    border-right: none;
  }
  .tab-btn:nth-child(1),
  .tab-btn:nth-child(2) {
    border-bottom: 1px solid var(--c-border);
  }
}
</style>
