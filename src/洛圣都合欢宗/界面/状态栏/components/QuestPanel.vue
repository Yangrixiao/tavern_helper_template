<template>
  <div class="quest-panel">
    <div v-if="!_.isEmpty(store.data.合欢宗系统.当前任务)" class="quest-list">
      <article
        v-for="(quest, questName) in store.data.合欢宗系统.当前任务"
        :key="questName"
        class="quest-card"
      >
        <div class="quest-top">
          <div class="quest-title-group">
            <span class="quest-type-tag" :class="getTypeClass(quest.类型)">
              <i class="fa-solid fa-fire-burner"></i>
              {{ quest.类型 }}
            </span>
            <h4 class="quest-name">{{ questName }}</h4>
          </div>
          <div class="quest-bounty">
            <i class="fa-solid fa-dollar-sign"></i>
            <span>+{{ Number(quest.美金奖励 || 0).toLocaleString('en-US') }}</span>
          </div>
        </div>

        <div class="quest-req">
          <span class="field-tag">
            <i class="fa-solid fa-crosshairs"></i>
            下流要求
          </span>
          <p class="req-text">{{ quest.下流要求 }}</p>
        </div>

        <div class="quest-footer">
          <div class="extra-reward">
            <span class="extra-label">
              <i class="fa-solid fa-gift"></i>
              额外奖励：
            </span>
            <span class="extra-text">{{ quest.额外奖励 || '无' }}</span>
          </div>
          <div class="progress-badge">
            <i class="fa-solid fa-spinner"></i>
            {{ quest.进度状态 }}
          </div>
        </div>
      </article>
    </div>

    <div v-else class="empty-box">
      <i class="fa-solid fa-bed-pulse"></i>
      <span>当前暂无激活的猎艳任务，快去洛圣都街头物色新的极品炉鼎吧！</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useDataStore } from '../store';

const store = useDataStore();

function getTypeClass(type: string): string {
  if (type.includes('床第') || type.includes('淫戏') || type.includes('再起')) return 'type-sex';
  if (type.includes('调教') || type.includes('狂欢') || type.includes('双飞')) return 'type-master';
  return 'type-probe';
}
</script>

<style lang="scss" scoped>
.quest-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quest-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quest-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-left: 3px solid var(--c-primary);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quest-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
}

.quest-title-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
}

.quest-type-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 4px;
  background: var(--c-primary-soft);
  color: var(--c-primary);
  border: 1px solid var(--c-border-highlight);
}

.quest-type-tag.type-sex {
  background: var(--c-danger-soft);
  color: var(--c-danger);
  border-color: rgba(255, 42, 85, 0.45);
}

.quest-type-tag.type-master {
  background: var(--c-accent-gold-soft);
  color: var(--c-accent-gold);
  border-color: var(--c-border-gold);
}

.quest-name {
  font-size: 0.9rem;
  font-weight: 800;
  color: var(--c-text-main);
}

.quest-bounty {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-family: var(--font-mono);
  font-size: 0.88rem;
  font-weight: 800;
  color: var(--c-cash);
  background: var(--c-cash-soft);
  border: 1px solid rgba(46, 229, 157, 0.4);
  padding: 2px 8px;
  border-radius: 6px;
}

.quest-req {
  background: rgba(13, 8, 20, 0.55);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-tag {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--c-primary);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.req-text {
  font-size: 0.8rem;
  line-height: 1.45;
  color: var(--c-text-main);
}

.quest-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 4px;
  border-top: 1px dashed var(--c-border);
  font-size: 0.74rem;
}

.extra-reward {
  flex: 1;
  min-width: 200px;
  color: var(--c-text-secondary);
}

.extra-label {
  color: var(--c-accent-gold);
  font-weight: 700;
}

.progress-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.71rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--c-surface-elevated);
  border: 1px solid var(--c-border);
  color: var(--c-accent-gold);
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
