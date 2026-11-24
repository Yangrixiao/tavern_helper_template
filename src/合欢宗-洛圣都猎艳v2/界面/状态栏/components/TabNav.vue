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
      <span v-if="tab.badge !== undefined" class="tab-badge">{{ tab.badge }}</span>
      <i class="fa-solid fa-chevron-down tab-chevron" :class="{ rotated: model === tab.id }"></i>
    </button>
  </nav>
</template>

<script setup lang="ts">
export interface TabItem {
  id: string;
  label: string;
  icon: string;
  badge?: string | number;
}

const props = defineProps<{
  tabs: TabItem[];
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
  background: #160f1d;
  border-bottom: 1px solid var(--c-border);
}

.tab-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 8px;
  background: transparent;
  border: none;
  border-right: 1px solid var(--c-border-subtle);
  color: var(--c-text-secondary);
  font-family: inherit;
  font-size: 0.79rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.tab-btn:last-child {
  border-right: none;
}

.tab-btn:hover {
  background: rgba(255, 59, 125, 0.1);
  color: var(--c-text-primary);
}

.tab-btn.active {
  background: linear-gradient(180deg, rgba(255, 59, 125, 0.22), rgba(255, 59, 125, 0.06));
  color: #ff7aa8;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--c-primary), var(--c-accent-gold));
}

.tab-badge {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  padding: 1px 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.09);
  color: var(--c-text-primary);
}

.tab-btn.active .tab-badge {
  background: var(--c-primary);
  color: #fff;
}

.tab-chevron {
  font-size: 0.65rem;
  opacity: 0.65;
  transition: transform 0.2s ease;
}

.tab-chevron.rotated {
  transform: rotate(180deg);
  opacity: 1;
}

@media (max-width: 580px) {
  .tab-nav {
    grid-template-columns: repeat(2, 1fr);
  }

  .tab-btn:nth-child(2) {
    border-right: none;
  }

  .tab-btn:nth-child(1),
  .tab-btn:nth-child(2) {
    border-bottom: 1px solid var(--c-border-subtle);
  }
}
</style>
