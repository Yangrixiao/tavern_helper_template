<template>
  <div class="quest-board">
    <div class="board-header">
      <div class="board-title">
        <i class="fa-solid fa-scroll"></i>
        <span>合欢宗色情悬赏榜</span>
      </div>
      <div class="unlock-info">
        <span>当前可接最高难度：</span>
        <strong class="star-tag">{{ store.data.主角.已解锁最高任务星级 }}</strong>
      </div>
    </div>

    <div v-if="questEntries.length > 0" class="quest-list">
      <article
        v-for="[questName, quest] in questEntries"
        :key="questName"
        class="quest-card"
        :class="getStatusClass(quest.状态)"
      >
        <div class="quest-top">
          <div class="quest-title-group">
            <span class="quest-type-badge">{{ quest.类型 }}</span>
            <h4 class="quest-name">{{ questName }}</h4>
          </div>

          <div class="quest-meta-right">
            <span class="quest-stars" :title="'难度星级：' + quest.星级">
              <i
                v-for="n in parseStarCount(quest.星级)"
                :key="n"
                class="fa-solid fa-star"
              ></i>
              <small>{{ quest.星级 }}</small>
            </span>
            <span class="quest-bounty">
              <i class="fa-solid fa-sack-dollar"></i>
              {{ quest.基础赏金 }}
            </span>
            <span class="quest-status-pill" :class="getStatusClass(quest.状态)">
              {{ quest.状态 }}
            </span>
          </div>
        </div>

        <div class="quest-body">
          <div class="quest-row">
            <div class="row-label">
              <i class="fa-solid fa-crosshairs"></i>
              <span>目标与舞台</span>
            </div>
            <p class="row-content">{{ quest.目标与舞台 }}</p>
          </div>

          <div class="quest-row requirement-row">
            <div class="row-label">
              <i class="fa-solid fa-venus-mars"></i>
              <span>必达色情指标</span>
            </div>
            <p class="row-content highlight-req">{{ quest.基础色情指标 }}</p>
          </div>

          <div class="quest-row bonus-row">
            <div class="row-label">
              <i class="fa-solid fa-fire-flame-Simple"></i>
              <i class="fa-solid fa-award"></i>
              <span>进阶超额词条</span>
            </div>
            <p class="row-content highlight-bonus">{{ quest.进阶挑战词条 }}</p>
          </div>
        </div>
      </article>
    </div>

    <div v-else class="empty-quest">
      <i class="fa-solid fa-bed-pulse"></i>
      <p>当前暂无进行中的狩猎悬赏，快在洛圣都街头物色新猎物或向柳三娘索要私房悬赏吧！</p>
    </div>

    <!-- 结算公式速查底栏 -->
    <div class="formula-tip">
      <i class="fa-solid fa-calculator"></i>
      <span>
        <strong>合欢点采补公式：</strong>
        评级基数（C10 / B20 / A40 / S80）× 高潮激烈度（普通×1 / 潮吹痉挛×1.5 / 失神多重×2）× 名器倍率（×1~×4）
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const questEntries = computed(() => Object.entries(store.data.任务面板 || {}));

function parseStarCount(starStr: string): number {
  const match = (starStr || '').match(/(\d+)/);
  const num = match ? Number(match[1]) : 1;
  return Math.min(Math.max(num, 1), 5);
}

function getStatusClass(status: string): string {
  if (!status) return 'status-active';
  if (status.includes('完成') || status.includes('已结算')) return 'status-done';
  if (status.includes('失败') || status.includes('放弃')) return 'status-failed';
  return 'status-active';
}
</script>

<style lang="scss" scoped>
.quest-board {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.board-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px dashed var(--c-border);
}

.board-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.86rem;
  font-weight: 700;
  color: var(--c-accent-gold);
}

.unlock-info {
  font-size: 0.74rem;
  color: var(--c-text-secondary);
}

.star-tag {
  color: var(--c-accent-gold);
  background: var(--c-accent-gold-soft);
  padding: 1px 7px;
  border-radius: 4px;
}

.quest-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quest-card {
  background: var(--c-surface-card);
  border: 1px solid var(--c-border);
  border-radius: 10px;
  overflow: hidden;
}

.quest-card.status-done {
  border-color: rgba(46, 229, 157, 0.45);
  opacity: 0.88;
}

.quest-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding: 9px 12px;
  background: rgba(14, 9, 22, 0.65);
  border-bottom: 1px solid var(--c-border-subtle);
}

.quest-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.quest-type-badge {
  font-size: 0.68rem;
  padding: 2px 7px;
  border-radius: 4px;
  background: var(--c-primary-soft);
  color: #ff8fb8;
  border: 1px solid var(--c-border);
  font-weight: 600;
}

.quest-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--c-text-primary);
}

.quest-meta-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.quest-stars {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: var(--c-accent-gold);
  font-size: 0.74rem;
}

.quest-stars small {
  margin-left: 4px;
  color: var(--c-text-secondary);
  font-family: var(--font-mono);
}

.quest-bounty {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--c-stamina-healthy);
  background: rgba(46, 229, 157, 0.14);
  padding: 2px 8px;
  border-radius: 6px;
}

.quest-status-pill {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
}

.quest-status-pill.status-active {
  background: rgba(255, 59, 125, 0.22);
  color: #ff80ab;
  border: 1px solid var(--c-primary);
}

.quest-status-pill.status-done {
  background: rgba(46, 229, 157, 0.2);
  color: var(--c-stamina-healthy);
}

.quest-status-pill.status-failed {
  background: rgba(255, 42, 85, 0.2);
  color: var(--c-danger);
}

.quest-body {
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quest-row {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 6px 9px;
  border-radius: 7px;
  background: rgba(15, 10, 22, 0.45);
}

.requirement-row {
  background: rgba(255, 59, 125, 0.08);
  border-left: 3px solid var(--c-primary);
}

.bonus-row {
  background: rgba(245, 185, 66, 0.08);
  border-left: 3px solid var(--c-accent-gold);
}

.row-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.73rem;
  font-weight: 700;
  color: var(--c-text-muted);
}

.requirement-row .row-label {
  color: #ff8fb8;
}

.bonus-row .row-label {
  color: var(--c-accent-gold);
}

.row-content {
  font-size: 0.79rem;
  color: var(--c-text-secondary);
  line-height: 1.45;
}

.highlight-req {
  color: var(--c-text-primary);
}

.highlight-bonus {
  color: #fde68a;
}

.empty-quest {
  text-align: center;
  padding: 18px;
  color: var(--c-text-muted);
  font-size: 0.8rem;
}

.formula-tip {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 10px;
  border-radius: 7px;
  background: rgba(14, 9, 20, 0.7);
  border: 1px dashed var(--c-border-subtle);
  font-size: 0.72rem;
  color: var(--c-text-muted);
  line-height: 1.4;
}

.formula-tip i {
  color: var(--c-accent-gold);
}
</style>
