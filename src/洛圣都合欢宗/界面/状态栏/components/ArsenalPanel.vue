<template>
  <div class="arsenal-panel">
    <!-- 左栏：已习得秘术与肉体改造 -->
    <div class="arsenal-column">
      <div class="col-header">
        <i class="fa-solid fa-dragon"></i>
        <span>已习得合欢秘术与肉体改造</span>
      </div>

      <div v-if="!_.isEmpty(store.data.主角.已习得秘术与改造)" class="entry-list">
        <div
          v-for="(skill, skillName) in store.data.主角.已习得秘术与改造"
          :key="skillName"
          class="entry-card skill-card"
        >
          <div class="entry-top">
            <span class="entry-name">{{ skillName }}</span>
            <span class="entry-tag">{{ skill.类别 }}</span>
          </div>
          <p class="entry-desc">{{ skill.效果描述 }}</p>
        </div>
      </div>
      <div v-else class="empty-col">
        尚未兑换合欢宗秘术或肉体改造（天生紫黑巨根已就绪）
      </div>
    </div>

    <!-- 右栏：随身淫具与丹药 -->
    <div class="arsenal-column">
      <div class="col-header">
        <i class="fa-solid fa-flask-vial"></i>
        <span>随身淫具与催情丹药</span>
      </div>

      <div v-if="!_.isEmpty(store.data.主角.随身淫具与丹药)" class="entry-list">
        <div
          v-for="(item, itemName) in store.data.主角.随身淫具与丹药"
          :key="itemName"
          class="entry-card item-card"
        >
          <div class="entry-top">
            <span class="entry-name">{{ itemName }}</span>
            <span class="count-pill">x{{ item.数量 }}</span>
          </div>
          <p class="entry-desc">{{ item.效果描述 }}</p>
        </div>
      </div>
      <div v-else class="empty-col">
        行囊中暂无淫具与丹药，可在合欢商城中消耗合欢点兑换
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useDataStore } from '../store';

const store = useDataStore();
</script>

<style lang="scss" scoped>
.arsenal-panel {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.arsenal-column {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.col-header {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--c-accent-gold);
  padding-bottom: 6px;
  border-bottom: 1px solid var(--c-border);
}

.entry-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.entry-card {
  background: rgba(13, 8, 20, 0.55);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  padding: 7px 9px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.skill-card {
  border-left: 2.5px solid var(--c-accent-gold);
}

.item-card {
  border-left: 2.5px solid var(--c-primary);
}

.entry-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.entry-name {
  font-size: 0.82rem;
  font-weight: 800;
  color: #fff;
}

.entry-tag {
  font-size: 0.66rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--c-accent-gold-soft);
  color: var(--c-accent-gold);
}

.count-pill {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 800;
  padding: 1px 6px;
  border-radius: 999px;
  background: var(--c-primary-soft);
  color: var(--c-primary);
}

.entry-desc {
  font-size: 0.74rem;
  line-height: 1.4;
  color: var(--c-text-secondary);
}

.empty-col {
  padding: 14px 8px;
  text-align: center;
  font-size: 0.75rem;
  color: var(--c-text-muted);
  font-style: italic;
}

@media (max-width: 640px) {
  .arsenal-panel {
    grid-template-columns: 1fr;
  }
}
</style>
