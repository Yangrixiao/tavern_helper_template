<template>
  <div class="hehuan-hud" :class="{ 'combat-mode': isSexMode }">
    <!-- 顶部世界时空、区域坐标与合欢五态弹性循环网 -->
    <WorldHeader />

    <!-- 主角三维核心资产栏（随身美金、合欢采补点、龙根阳元体力） -->
    <ProtagonistStats />

    <!-- 骚货师姐柳三娘识海伴随与传音中心 -->
    <LiuSanniangBar />

    <!-- 四维折叠战术页签栏 -->
    <TabNav v-model="activeTab" :tabs="tabs" />

    <!-- 页签展开内容区 -->
    <div v-if="activeTab" class="tab-content-area">
      <QuestPanel v-if="activeTab === 'quests'" />
      <CauldronPanel v-else-if="activeTab === 'cauldrons'" />
      <ShopPanel v-else-if="activeTab === 'shop'" />
      <ArsenalPanel v-else-if="activeTab === 'arsenal'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import ArsenalPanel from './components/ArsenalPanel.vue';
import CauldronPanel from './components/CauldronPanel.vue';
import LiuSanniangBar from './components/LiuSanniangBar.vue';
import ProtagonistStats from './components/ProtagonistStats.vue';
import QuestPanel from './components/QuestPanel.vue';
import ShopPanel from './components/ShopPanel.vue';
import TabNav from './components/TabNav.vue';
import WorldHeader from './components/WorldHeader.vue';
import { useDataStore } from './store';

const store = useDataStore();

const isSexMode = computed(() => store.data.世界.性爱分幕进度 !== '日常探索');

const tabs = computed(() => {
  const questCount = _.size(store.data.合欢宗系统.当前任务);
  const cauldronCount = _.size(store.data.炉鼎名册);
  const shopCount = _.size(store.data.合欢宗系统.当期商城货架);
  const arsenalCount =
    _.size(store.data.主角.已习得秘术与改造) + _.size(store.data.主角.随身淫具与丹药);

  return [
    { id: 'quests', label: '猎艳任务', icon: 'fa-solid fa-fire-flame-curved', count: questCount },
    { id: 'cauldrons', label: '炉鼎名册', icon: 'fa-solid fa-venus-double', count: cauldronCount },
    { id: 'shop', label: '合欢商城', icon: 'fa-solid fa-Gem fa-gem', count: shopCount },
    { id: 'arsenal', label: '龙根行囊', icon: 'fa-solid fa-mars-stroke-up', count: arsenalCount },
  ];
});

const activeTab = useLocalStorage<string | null>('ls_hehuan_hud:active_tab', 'quests');
</script>

<style lang="scss" scoped>
.hehuan-hud {
  width: 100%;
  max-width: 780px;
  margin: 4px auto;
  background: var(--c-bg-base);
  border: 1.5px solid var(--c-border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(255, 59, 139, 0.12);
  color: var(--c-text-main);
  font-size: 13px;
  line-height: 1.4;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.hehuan-hud.combat-mode {
  border-color: var(--c-primary);
  box-shadow:
    0 8px 28px rgba(255, 42, 85, 0.28),
    0 0 16px rgba(255, 59, 139, 0.35);
}

.tab-content-area {
  padding: 12px 14px;
  background: var(--c-bg-base);
  animation: slideFade 0.22s ease-out;
}

@keyframes slideFade {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
