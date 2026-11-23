<template>
  <header class="world-header">
    <div class="header-top">
      <div class="brand-badge">
        <i class="fa-solid fa-yin-yang brand-icon"></i>
        <span class="brand-title">阴阳合欢谱</span>
        <span class="brand-sub">LOS SANTOS EROTIC SYSTEM</span>
      </div>
      <div class="time-pill">
        <i class="fa-regular fa-clock"></i>
        <span>{{ store.data.世界.当前时间 }}</span>
      </div>
    </div>

    <div class="location-bar">
      <div class="region-tag">
        <i :class="regionIcon"></i>
        <span>{{ store.data.世界.当前区域 }}</span>
      </div>
      <div class="spot-text" :title="store.data.世界.当前具体地点">
        <i class="fa-solid fa-location-dot spot-pin"></i>
        <span>{{ store.data.世界.当前具体地点 }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const regionIcon = computed(() => {
  const region = store.data.世界.当前区域;
  switch (region) {
    case '市中心':
      return 'fa-solid fa-city';
    case '富人山庄区':
      return 'fa-solid fa-crown';
    case '好麦坞':
      return 'fa-solid fa-film';
    case '威尼斯海滩':
      return 'fa-solid fa-umbrella-beach';
    case '中产社区':
      return 'fa-solid fa-house-chimney-window';
    case '贫民区':
      return 'fa-solid fa-fire-flame-curved';
    case '夜店一条街':
      return 'fa-solid fa-martini-glass-citrus';
    case '国际机场与交通动脉':
      return 'fa-solid fa-plane-arrival';
    default:
      return 'fa-solid fa-compass';
  }
});
</script>

<style lang="scss" scoped>
.world-header {
  padding: 10px 14px;
  background: linear-gradient(135deg, rgba(38, 20, 48, 0.96) 0%, rgba(20, 13, 28, 0.98) 100%);
  border-bottom: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.brand-badge {
  display: flex;
  align-items: center;
  gap: 7px;
}

.brand-icon {
  color: var(--c-primary);
  font-size: 1.05rem;
  filter: drop-shadow(0 0 6px rgba(255, 59, 125, 0.6));
}

.brand-title {
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 0.98rem;
  letter-spacing: 0.08em;
  background: linear-gradient(90deg, #ff7eb3, #f5b942);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-sub {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--c-text-muted);
  letter-spacing: 0.06em;
  padding-left: 4px;
  border-left: 1px solid var(--c-border);
}

.time-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--c-surface-glass);
  border: 1px solid var(--c-border-subtle);
  font-size: 0.76rem;
  color: var(--c-text-secondary);
}

.time-pill i {
  color: var(--c-accent-gold);
}

.location-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  background: rgba(12, 8, 16, 0.55);
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid var(--c-border-subtle);
}

.region-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 5px;
  background: var(--c-primary-soft);
  border: 1px solid var(--c-border);
  color: var(--c-primary-hover);
  font-weight: 600;
  font-size: 0.76rem;
  white-space: nowrap;
}

.spot-text {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  color: var(--c-text-primary);
  flex: 1;
  min-width: 160px;
}

.spot-pin {
  color: var(--c-accent-gold);
  font-size: 0.78rem;
}

@media (max-width: 520px) {
  .brand-sub {
    display: none;
  }
}
</style>
