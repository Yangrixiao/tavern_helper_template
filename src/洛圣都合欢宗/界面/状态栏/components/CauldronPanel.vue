<template>
  <div class="cauldron-panel">
    <div v-if="!_.isEmpty(store.data.炉鼎名册)" class="cauldron-grid">
      <article
        v-for="(info, name) in store.data.炉鼎名册"
        :key="name"
        class="cauldron-card"
        :class="{ imprinted: info.合欢淫印 }"
      >
        <div class="card-head">
          <div class="head-left">
            <span class="tier-badge" :class="getTierClass(info.评级)">
              {{ info.评级 }}
            </span>
            <h4 class="cauldron-name">{{ name }}</h4>
            <span v-if="info.合欢淫印" class="imprint-badge">
              <i class="fa-solid fa-heart-circle-bolt"></i>
              合欢淫印已烙
            </span>
          </div>

          <div class="head-right">
            <span class="stage-tag">
              <i class="fa-solid fa-link"></i>
              {{ info.恶堕阶段 }}
            </span>
            <span class="count-tag">
              采补 <strong>{{ info.累计采补次数 }}</strong> 次
            </span>
          </div>
        </div>

        <!-- 身份与外貌简述 -->
        <p class="appearance-desc">{{ info.身份与外貌简述 }}</p>

        <!-- 专属名器 -->
        <div class="mingqi-row" :class="{ 'has-mingqi': info.专属名器 && info.专属名器 !== '无' }">
          <span class="mingqi-label">
            <i class="fa-solid fa-gem"></i>
            专属名器
          </span>
          <span class="mingqi-val">{{ info.专属名器 || '凡俗肉穴（无特殊名器）' }}</span>
        </div>

        <!-- 当前状态与调教指令 -->
        <div class="status-row">
          <span class="status-label">
            <i class="fa-solid fa-sliders"></i>
            当前状态与调教：
          </span>
          <span class="status-val">{{ info.当前状态与调教指令 }}</span>
        </div>
      </article>
    </div>

    <div v-else class="empty-box">
      <i class="fa-solid fa-book-skull"></i>
      <span>炉鼎名册尚无记录，快去物色洛圣都的极品尤物吧！</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useDataStore } from '../store';

const store = useDataStore();

function getTierClass(tier: string): string {
  const upper = (tier || '').toUpperCase();
  if (upper.includes('S')) return 'tier-s';
  if (upper.includes('A')) return 'tier-a';
  if (upper.includes('B')) return 'tier-b';
  return 'tier-c';
}
</script>

<style lang="scss" scoped>
.cauldron-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 10px;
}

.cauldron-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  position: relative;
}

.cauldron-card.imprinted {
  border-color: var(--c-border-highlight);
  box-shadow: inset 0 0 14px rgba(255, 59, 139, 0.12);
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
}

.head-left {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.tier-badge {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 900;
  padding: 2px 7px;
  border-radius: 5px;
  letter-spacing: 0.03em;
}

.tier-s {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
  color: #fff;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.45);
}

.tier-a {
  background: var(--c-primary-soft);
  border: 1px solid var(--c-primary);
  color: var(--c-primary);
}

.tier-b {
  background: rgba(56, 182, 255, 0.16);
  border: 1px solid rgba(56, 182, 255, 0.45);
  color: var(--c-stamina);
}

.tier-c {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--c-border);
  color: var(--c-text-muted);
}

.cauldron-name {
  font-size: 0.9rem;
  font-weight: 800;
  color: #fff;
}

.imprint-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 0.66rem;
  font-weight: 800;
  padding: 1px 6px;
  border-radius: 999px;
  background: var(--c-danger-soft);
  border: 1px solid var(--c-danger);
  color: var(--c-danger);
}

.head-right {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.7rem;
}

.stage-tag {
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--c-surface-elevated);
  border: 1px solid var(--c-border);
  color: var(--c-text-secondary);
  font-weight: 600;
}

.count-tag {
  color: var(--c-text-muted);
  font-family: var(--font-mono);
}

.count-tag strong {
  color: var(--c-accent-gold);
}

.appearance-desc {
  font-size: 0.77rem;
  line-height: 1.42;
  color: var(--c-text-secondary);
}

.mingqi-row {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 6px;
  background: rgba(13, 8, 20, 0.5);
  border: 1px solid var(--c-border);
  font-size: 0.74rem;
}

.mingqi-row.has-mingqi {
  border-color: var(--c-border-gold);
  background: rgba(245, 185, 66, 0.08);
}

.mingqi-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 800;
  color: var(--c-accent-gold);
  white-space: nowrap;
  flex-shrink: 0;
}

.mingqi-val {
  color: var(--c-text-main);
  line-height: 1.38;
}

.status-row {
  font-size: 0.74rem;
  line-height: 1.4;
  padding-top: 4px;
  border-top: 1px dashed var(--c-border);
  color: var(--c-text-muted);
}

.status-label {
  color: var(--c-primary);
  font-weight: 700;
}

.status-val {
  color: var(--c-text-secondary);
}

.empty-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 18px;
  color: var(--c-text-muted);
  font-size: 0.8rem;
  background: var(--c-surface);
  border: 1px dashed var(--c-border);
  border-radius: 8px;
}
</style>
