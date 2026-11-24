<template>
  <div
    class="hehuan-status-card"
    :class="{ 'is-materialized': store.data.柳三娘.当前形态 === '本尊具象化态' }"
  >
    <!-- 1. 顶部时空与洛圣都生态区栏 -->
    <WorldHeader />

    <!-- 2. 男主纯阳体力与核心货币资产栏 -->
    <HeroStatsBar />

    <!-- 3. 柳三娘随身伴随骚话横幅 -->
    <SanniangBanner @open-chamber="activeTab = '师姐闺房'" />

    <!-- 4. 四栏折叠式导航 -->
    <TabNav v-model="activeTab" :tabs="tabs" />

    <!-- 5. 展开详情面板 -->
    <div v-if="activeTab" class="tab-content-area">
      <div v-if="activeTab === '猎物图鉴'" class="tab-pane">
        <PreyCodexPanel />
      </div>
      <div v-else-if="activeTab === '任务面板'" class="tab-pane">
        <QuestBoardPanel />
      </div>
      <div v-else-if="activeTab === '合欢商城'" class="tab-pane">
        <MallInventoryPanel />
      </div>
      <div v-else-if="activeTab === '师姐闺房'" class="tab-pane">
        <SanniangChamberPanel />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroStatsBar from './components/HeroStatsBar.vue';
import MallInventoryPanel from './components/MallInventoryPanel.vue';
import PreyCodexPanel from './components/PreyCodexPanel.vue';
import QuestBoardPanel from './components/QuestBoardPanel.vue';
import SanniangBanner from './components/SanniangBanner.vue';
import SanniangChamberPanel from './components/SanniangChamberPanel.vue';
import TabNav, { type TabItem } from './components/TabNav.vue';
import WorldHeader from './components/WorldHeader.vue';
import { useDataStore } from './store';

const store = useDataStore();

const activeTab = useLocalStorage<string | null>('hehuan_ls_status_v2:active_tab', '猎物图鉴');

const tabs = computed<TabItem[]>(() => {
  const preyCount = Object.keys(store.data.猎物图鉴 || {}).length;
  const questCount = Object.keys(store.data.任务面板 || {}).length;
  const shelfCount = Object.keys(store.data.商城货架 || {}).length;
  const sanniangBadge =
    store.data.柳三娘.当前形态 === '本尊具象化态'
      ? `${store.data.柳三娘.具象化剩余小时}h`
      : 'SS';

  return [
    {
      id: '猎物图鉴',
      label: '猎物图鉴',
      icon: 'fa-solid fa-venus-double',
      badge: preyCount,
    },
    {
      id: '任务面板',
      label: '猎艳悬赏',
      icon: 'fa-solid fa-scroll',
      badge: questCount,
    },
    {
      id: '合欢商城',
      label: '合欢商城',
      icon: 'fa-solid fa-store',
      badge: shelfCount,
    },
    {
      id: '师姐闺房',
      label: '师姐真身',
      icon: 'fa-solid fa-fan',
      badge: sanniangBadge,
    },
  ];
});
</script>

<style lang="scss" scoped>
.hehuan-status-card {
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  background-color: var(--c-surface-base);
  border: 1.5px solid var(--c-border);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.55);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: var(--c-text-primary);
  font-size: 13px;
  line-height: 1.4;
}

.hehuan-status-card.is-materialized {
  border-color: var(--c-border-strong);
  box-shadow:
    0 8px 28px rgba(0, 0, 0, 0.6),
    0 0 18px rgba(255, 59, 125, 0.25);
}

.tab-content-area {
  padding: 12px 14px;
  background: var(--c-surface-base);
}

.tab-pane {
  animation: paneFadeIn 0.22s ease-out;
}

@keyframes paneFadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
