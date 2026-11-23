<template>
  <section class="hero-stats">
    <!-- 体力条区块 -->
    <div class="stamina-row" :class="{ 'is-low': isLowStamina, 'is-empty': store.data.主角.体力 <= 0 }">
      <div class="stamina-header">
        <div class="stamina-label">
          <i class="fa-solid fa-bolt-lightning stamina-icon"></i>
          <span>纯阳体力</span>
          <span class="stamina-status-tag" :class="staminaStateClass">{{ staminaStateText }}</span>
        </div>

        <div class="stamina-right">
          <span class="stamina-numbers">
            <strong>{{ store.data.主角.体力 }}</strong>
            <small>/ {{ store.data.主角.体力上限 }}</small>
          </span>
          <div class="stamina-controls">
            <button
              type="button"
              class="mini-btn"
              title="消耗 10 点体力"
              :disabled="store.data.主角.体力 <= 0"
              @click="adjustStamina(-10)"
            >
              -10
            </button>
            <button
              type="button"
              class="mini-btn"
              title="恢复 10 点体力"
              :disabled="store.data.主角.体力 >= store.data.主角.体力上限"
              @click="adjustStamina(10)"
            >
              +10
            </button>
          </div>
        </div>
      </div>

      <div class="stamina-track">
        <div
          class="stamina-fill"
          :class="staminaStateClass"
          :style="{ width: staminaPercent + '%' }"
        ></div>
      </div>

      <div v-if="isLowStamina" class="stamina-warning">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <span v-if="store.data.主角.体力 <= 0">
          阳气枯竭（体力归零）！金枪难举，只能休战进食睡眠或服用商城丹药！
        </span>
        <span v-else>
          体力低于 30！持久力与精液量下降、易腿软早泄，小心被柳三娘嘲笑软脚虾！
        </span>
      </div>
    </div>

    <!-- 核心货币与积分网格 -->
    <div class="currency-grid">
      <div class="stat-pill hehuan-pill">
        <div class="pill-icon">
          <i class="fa-solid fa-heart-pulse"></i>
        </div>
        <div class="pill-body">
          <span class="pill-label">合欢点（仙缘采补）</span>
          <div class="pill-value-row">
            <span class="pill-value">{{ store.data.主角.合欢点 }}</span>
            <span class="pill-hint">满100可具象化师姐</span>
          </div>
        </div>
      </div>

      <div class="stat-pill money-pill">
        <div class="pill-icon">
          <i class="fa-solid fa-sack-dollar"></i>
        </div>
        <div class="pill-body">
          <span class="pill-label">美金资产（猎艳消费）</span>
          <div class="pill-value-row">
            <span class="pill-value">${{ formattedMoney }}</span>
            <span class="pill-hint">砸钱开路</span>
          </div>
        </div>
      </div>

      <div class="stat-pill score-pill">
        <div class="pill-icon">
          <i class="fa-solid fa-trophy"></i>
        </div>
        <div class="pill-body">
          <span class="pill-label">猎艳积分 / 悬赏权限</span>
          <div class="pill-value-row">
            <span class="pill-value">{{ store.data.主角.猎艳积分 }} <small>pts</small></span>
            <span class="star-unlock-badge">
              <i class="fa-solid fa-star"></i>
              已开 {{ store.data.主角.已解锁最高任务星级 }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useDataStore } from '../store';

const store = useDataStore();

const staminaPercent = computed(() => {
  const max = Math.max(1, store.data.主角.体力上限);
  return _.clamp(Math.round((store.data.主角.体力 / max) * 100), 0, 100);
});

const isLowStamina = computed(() => store.data.主角.体力 < 30);

const staminaStateClass = computed(() => {
  if (store.data.主角.体力 <= 0) return 'state-empty';
  if (store.data.主角.体力 < 30) return 'state-danger';
  if (store.data.主角.体力 < 60) return 'state-warn';
  return 'state-healthy';
});

const staminaStateText = computed(() => {
  if (store.data.主角.体力 <= 0) return '金枪难举';
  if (store.data.主角.体力 < 30) return '腿软透支';
  if (store.data.主角.体力 < 60) return '尚可再战';
  return '龙精虎猛';
});

const formattedMoney = computed(() => {
  return Number(store.data.主角.金钱 || 0).toLocaleString('en-US');
});

function adjustStamina(delta: number) {
  const max = store.data.主角.体力上限;
  store.data.主角.体力 = _.clamp(store.data.主角.体力 + delta, 0, max);
}
</script>

<style lang="scss" scoped>
.hero-stats {
  padding: 10px 14px;
  background: var(--c-surface-elevated);
  border-bottom: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stamina-row {
  background: rgba(14, 9, 20, 0.65);
  border: 1px solid var(--c-border-subtle);
  border-radius: 9px;
  padding: 8px 11px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stamina-row.is-low {
  border-color: var(--c-danger);
  background: linear-gradient(90deg, rgba(255, 42, 85, 0.14), rgba(14, 9, 20, 0.75));
}

.stamina-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.stamina-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  font-weight: 600;
}

.stamina-icon {
  color: var(--c-stamina-healthy);
}

.stamina-status-tag {
  font-size: 0.7rem;
  padding: 1px 7px;
  border-radius: 999px;
  font-weight: 600;
}

.stamina-status-tag.state-healthy {
  background: rgba(46, 229, 157, 0.16);
  color: var(--c-stamina-healthy);
  border: 1px solid rgba(46, 229, 157, 0.4);
}

.stamina-status-tag.state-warn {
  background: rgba(245, 158, 11, 0.18);
  color: var(--c-stamina-warning);
  border: 1px solid rgba(245, 158, 11, 0.45);
}

.stamina-status-tag.state-danger,
.stamina-status-tag.state-empty {
  background: var(--c-danger-soft);
  color: var(--c-danger);
  border: 1px solid var(--c-danger);
}

.stamina-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stamina-numbers {
  font-family: var(--font-mono);
  font-size: 0.86rem;
}

.stamina-numbers strong {
  color: var(--c-text-primary);
}

.stamina-numbers small {
  color: var(--c-text-muted);
  margin-left: 2px;
}

.stamina-controls {
  display: flex;
  gap: 4px;
}

.mini-btn {
  padding: 2px 6px;
  font-size: 0.7rem;
  font-family: var(--font-mono);
  border-radius: 4px;
  border: 1px solid var(--c-border);
  background: var(--c-surface-card);
  color: var(--c-text-secondary);
  cursor: pointer;
  transition: all 0.15s ease;
}

.mini-btn:hover:not(:disabled) {
  background: var(--c-primary-soft);
  color: var(--c-text-primary);
  border-color: var(--c-primary);
}

.mini-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.stamina-track {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 999px;
  overflow: hidden;
}

.stamina-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s ease;
}

.stamina-fill.state-healthy {
  background: linear-gradient(90deg, #10b981, #2ee59d);
}

.stamina-fill.state-warn {
  background: linear-gradient(90deg, #d97706, #fbbf24);
}

.stamina-fill.state-danger,
.stamina-fill.state-empty {
  background: linear-gradient(90deg, #be123c, #ff2a55);
}

.stamina-warning {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.74rem;
  color: #ff809b;
  padding-top: 2px;
}

.currency-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.stat-pill {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 10px;
  border-radius: 9px;
  background: var(--c-surface-card);
  border: 1px solid var(--c-border-subtle);
}

.hehuan-pill {
  border-color: rgba(255, 59, 125, 0.35);
}

.money-pill {
  border-color: rgba(245, 185, 66, 0.35);
}

.score-pill {
  border-color: rgba(181, 137, 255, 0.35);
}

.pill-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  flex-shrink: 0;
}

.hehuan-pill .pill-icon {
  background: var(--c-primary-soft);
  color: var(--c-primary);
}

.money-pill .pill-icon {
  background: var(--c-accent-gold-soft);
  color: var(--c-accent-gold);
}

.score-pill .pill-icon {
  background: var(--c-spirit-soft);
  color: var(--c-spirit);
}

.pill-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.pill-label {
  font-size: 0.7rem;
  color: var(--c-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pill-value-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 6px;
  flex-wrap: wrap;
}

.pill-value {
  font-family: var(--font-mono);
  font-size: 0.95rem;
  font-weight: 700;
}

.hehuan-pill .pill-value {
  color: #ff6b9d;
}

.money-pill .pill-value {
  color: var(--c-accent-gold);
}

.score-pill .pill-value {
  color: #d0b3ff;
}

.pill-hint {
  font-size: 0.66rem;
  color: var(--c-text-muted);
}

.star-unlock-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 0.68rem;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--c-accent-gold-soft);
  color: var(--c-accent-gold);
  font-weight: 600;
}

@media (max-width: 640px) {
  .currency-grid {
    grid-template-columns: 1fr;
  }
}
</style>
