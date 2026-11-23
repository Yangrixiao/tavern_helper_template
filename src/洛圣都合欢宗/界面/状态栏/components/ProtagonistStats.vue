<template>
  <section class="protagonist-stats">
    <!-- 现金 ($) -->
    <div class="stat-card cash-card">
      <div class="stat-icon">
        <i class="fa-solid fa-sack-dollar"></i>
      </div>
      <div class="stat-body">
        <div class="stat-label-row">
          <span class="stat-label">随身美金</span>
          <span class="stat-tier">{{ cashTierLabel }}</span>
        </div>
        <div class="stat-value cash-val">${{ formattedCash }}</div>
      </div>
    </div>

    <!-- 合欢点 -->
    <div class="stat-card hehuan-card">
      <div class="stat-icon">
        <i class="fa-solid fa-fire-flame-Simple fa-fire"></i>
      </div>
      <div class="stat-body">
        <div class="stat-label-row">
          <span class="stat-label">合欢采补点</span>
          <span class="stat-tier">插穴高潮产点</span>
        </div>
        <div class="stat-value hehuan-val">
          {{ store.data.主角.合欢点 }}
          <span class="unit">点</span>
        </div>
      </div>
    </div>

    <!-- 体力 (0-100) -->
    <div class="stat-card stamina-card">
      <div class="stat-icon">
        <i class="fa-solid fa-mars-double"></i>
      </div>
      <div class="stat-body">
        <div class="stat-label-row">
          <span class="stat-label">龙根阳元体力</span>
          <span class="stamina-num" :class="staminaColorClass">
            {{ store.data.主角.体力 }}/100 · {{ staminaStatusText }}
          </span>
        </div>
        <div class="stamina-track">
          <div
            class="stamina-fill"
            :class="staminaColorClass"
            :style="{ width: store.data.主角.体力 + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const formattedCash = computed(() => {
  return Number(store.data.主角.现金 || 0).toLocaleString('en-US');
});

const cashTierLabel = computed(() => {
  const cash = store.data.主角.现金;
  if (cash < 500) return '底层生存线';
  if (cash < 3000) return '街区温饱级';
  if (cash < 15000) return '夜店小金主';
  if (cash < 50000) return '名利场猎手';
  return '洛圣都豪客';
});

const staminaStatusText = computed(() => {
  const val = store.data.主角.体力;
  if (val >= 80) return '龙精虎猛';
  if (val >= 50) return '蓄势勃发';
  if (val >= 25) return '酣战微喘';
  return '精元将涸';
});

const staminaColorClass = computed(() => {
  const val = store.data.主角.体力;
  if (val >= 60) return 'stamina-high';
  if (val >= 30) return 'stamina-mid';
  return 'stamina-low';
});
</script>

<style lang="scss" scoped>
.protagonist-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 10px 14px;
  background: var(--c-bg-base);
  border-bottom: 1px solid var(--c-border);
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  position: relative;
  overflow: hidden;
}

.stat-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.cash-card .stat-icon {
  background: var(--c-cash-soft);
  color: var(--c-cash);
  border: 1px solid rgba(46, 229, 157, 0.35);
}

.hehuan-card .stat-icon {
  background: var(--c-accent-gold-soft);
  color: var(--c-accent-gold);
  border: 1px solid var(--c-border-gold);
}

.stamina-card .stat-icon {
  background: var(--c-primary-soft);
  color: var(--c-primary);
  border: 1px solid var(--c-border-highlight);
}

.stat-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.stat-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}

.stat-label {
  font-size: 0.72rem;
  color: var(--c-text-muted);
  font-weight: 600;
}

.stat-tier {
  font-size: 0.66rem;
  padding: 1px 5px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--c-text-secondary);
}

.stat-value {
  font-family: var(--font-mono);
  font-size: 1.05rem;
  font-weight: 800;
  line-height: 1.15;
}

.cash-val {
  color: var(--c-cash);
  text-shadow: 0 0 8px rgba(46, 229, 157, 0.25);
}

.hehuan-val {
  color: var(--c-accent-gold);
  text-shadow: 0 0 8px rgba(245, 185, 66, 0.25);
}

.unit {
  font-size: 0.72rem;
  font-weight: 600;
  opacity: 0.85;
}

.stamina-num {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
}

.stamina-num.stamina-high {
  color: var(--c-stamina);
}

.stamina-num.stamina-mid {
  color: var(--c-accent-gold);
}

.stamina-num.stamina-low {
  color: var(--c-danger);
}

.stamina-track {
  width: 100%;
  height: 7px;
  background: rgba(13, 8, 20, 0.8);
  border: 1px solid var(--c-border);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 2px;
}

.stamina-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s ease;
}

.stamina-fill.stamina-high {
  background: linear-gradient(90deg, #2563eb, var(--c-stamina));
}

.stamina-fill.stamina-mid {
  background: linear-gradient(90deg, #d97706, var(--c-accent-gold));
}

.stamina-fill.stamina-low {
  background: linear-gradient(90deg, #991b1b, var(--c-danger));
}

@media (max-width: 640px) {
  .protagonist-stats {
    grid-template-columns: 1fr;
  }
}
</style>
