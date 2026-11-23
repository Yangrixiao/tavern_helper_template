<template>
  <header class="world-header" :class="{ 'sex-active': isSexMode }">
    <div class="top-bar">
      <div class="brand-group">
        <span class="sect-crest">
          <i class="fa-solid fa-yin-yang fa-spin-pulse" style="--fa-animation-duration: 6s"></i>
          洛圣都合欢宗
        </span>
        <span class="region-badge" :class="regionTierClass">
          <i class="fa-solid fa-location-dot"></i>
          {{ store.data.世界.当前区域 }}
        </span>
        <span class="scene-text">
          <i class="fa-solid fa-street-view"></i>
          {{ store.data.世界.当前场景 }}
        </span>
      </div>

      <div class="time-stage-group">
        <span class="datetime-pill">
          <i class="fa-regular fa-calendar"></i>
          {{ store.data.世界.当前日期 }}
          <span class="divider">|</span>
          <i class="fa-regular fa-clock"></i>
          {{ store.data.世界.当前时段 }}
        </span>

        <span class="stage-pill" :class="{ 'stage-combat': isSexMode }">
          <i :class="stageIcon"></i>
          {{ store.data.世界.性爱分幕进度 }}
        </span>
      </div>
    </div>

    <!-- 情境可见：进入五态交合实战时自动展开五态弹性循环网轨迹 -->
    <div v-if="isSexMode" class="sex-cycle-bar">
      <div class="cycle-title">
        <i class="fa-solid fa-fire-flame-curved"></i>
        <span>合欢五态弹性循环网</span>
        <span class="cycle-hint">多轮变速抽插 · 连环高潮采补 · 2-5发浓精连射倍增</span>
      </div>
      <div class="cycle-track">
        <template v-for="(state, idx) in sexStates" :key="state.name">
          <div
            class="cycle-node"
            :class="{
              active: store.data.世界.性爱分幕进度 === state.name,
            }"
          >
            <i :class="state.icon"></i>
            <span>{{ state.short }}</span>
          </div>
          <span v-if="idx < sexStates.length - 1" class="cycle-arrow">⇄</span>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const sexStates = [
  { name: '前戏挑逗态', short: '前戏挑逗', icon: 'fa-solid fa-hand-sparkles' },
  { name: '慢磨缠绵态', short: '慢磨缠绵', icon: 'fa-solid fa-water' },
  { name: '狂桩暴肏态', short: '狂桩暴肏', icon: 'fa-solid fa-bolt-lightning' },
  { name: '高潮灌精态', short: '高潮灌精', icon: 'fa-solid fa-droplet' },
  { name: '余韵复燃态', short: '余韵复燃', icon: 'fa-solid fa-rotate' },
] as const;

const isSexMode = computed(() => store.data.世界.性爱分幕进度 !== '日常探索');

const regionTierClass = computed(() => {
  const region = store.data.世界.当前区域;
  if (region === '富人山庄区' || region === '商业金融区') return 'tier-high';
  if (region === '网红海滩区' || region === '夜店娱乐区') return 'tier-mid';
  return 'tier-low';
});

const stageIcon = computed(() => {
  const stage = store.data.世界.性爱分幕进度;
  switch (stage) {
    case '日常探索':
      return 'fa-solid fa-compass';
    case '前戏挑逗态':
      return 'fa-solid fa-hand-sparkles';
    case '慢磨缠绵态':
      return 'fa-solid fa-water';
    case '狂桩暴肏态':
      return 'fa-solid fa-bolt-lightning';
    case '高潮灌精态':
      return 'fa-solid fa-droplet';
    case '余韵复燃态':
      return 'fa-solid fa-rotate';
    default:
      return 'fa-solid fa-heart-pulse';
  }
});
</script>

<style lang="scss" scoped>
.world-header {
  background: linear-gradient(135deg, rgba(28, 16, 44, 0.96) 0%, rgba(18, 10, 28, 0.98) 100%);
  border-bottom: 1px solid var(--c-border);
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.world-header.sex-active {
  background: linear-gradient(135deg, rgba(56, 14, 42, 0.96) 0%, rgba(28, 10, 32, 0.98) 100%);
  border-bottom-color: var(--c-border-highlight);
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.brand-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.sect-crest {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 800;
  font-size: 0.88rem;
  letter-spacing: 0.04em;
  color: var(--c-accent-gold);
  background: var(--c-accent-gold-soft);
  border: 1px solid var(--c-border-gold);
  padding: 3px 9px;
  border-radius: 6px;
  text-shadow: 0 0 8px rgba(245, 185, 66, 0.35);
}

.region-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 5px;
  border: 1px solid var(--c-border);
  background: var(--c-surface-elevated);
  color: var(--c-text-main);
}

.region-badge.tier-high {
  border-color: var(--c-border-gold);
  color: var(--c-accent-gold);
}

.region-badge.tier-mid {
  border-color: var(--c-border-highlight);
  color: var(--c-primary);
}

.region-badge.tier-low {
  color: var(--c-text-secondary);
}

.scene-text {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
  color: var(--c-text-secondary);
  font-weight: 500;
}

.time-stage-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.datetime-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--c-text-muted);
  background: rgba(13, 8, 20, 0.65);
  border: 1px solid var(--c-border);
  padding: 3px 9px;
  border-radius: 5px;
}

.divider {
  opacity: 0.4;
}

.stage-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--c-surface-elevated);
  border: 1px solid var(--c-border);
  color: var(--c-text-secondary);
}

.stage-pill.stage-combat {
  background: linear-gradient(90deg, rgba(255, 42, 85, 0.28), rgba(255, 59, 139, 0.28));
  border-color: var(--c-primary);
  color: #fff;
  box-shadow: 0 0 12px rgba(255, 59, 139, 0.4);
  animation: pulseStage 2s infinite ease-in-out;
}

.sex-cycle-bar {
  background: rgba(13, 8, 20, 0.72);
  border: 1px solid var(--c-border-highlight);
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cycle-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 0.74rem;
  font-weight: 700;
  color: var(--c-primary);
}

.cycle-hint {
  font-weight: 400;
  font-size: 0.7rem;
  color: var(--c-text-muted);
}

.cycle-track {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px;
}

.cycle-node {
  flex: 1;
  min-width: 82px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 6px;
  border-radius: 5px;
  font-size: 0.72rem;
  font-weight: 600;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  color: var(--c-text-muted);
  transition: all 0.25s ease;
}

.cycle-node.active {
  background: linear-gradient(135deg, var(--c-primary), var(--c-danger));
  border-color: #fff;
  color: #fff;
  font-weight: 800;
  box-shadow: 0 0 10px rgba(255, 59, 139, 0.55);
  transform: translateY(-1px);
}

.cycle-arrow {
  color: var(--c-text-muted);
  font-size: 0.75rem;
  opacity: 0.65;
}

@keyframes pulseStage {
  0%,
  100% {
    box-shadow: 0 0 8px rgba(255, 59, 139, 0.35);
  }
  50% {
    box-shadow: 0 0 16px rgba(255, 42, 85, 0.65);
  }
}
</style>
