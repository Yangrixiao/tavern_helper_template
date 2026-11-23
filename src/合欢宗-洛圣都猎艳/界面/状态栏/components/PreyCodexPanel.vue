<template>
  <div class="prey-codex">
    <!-- 顶部评级汇总与筛选栏 -->
    <div class="codex-toolbar">
      <div class="toolbar-title">
        <i class="fa-solid fa-venus-double"></i>
        <span>洛圣都群芳谱 · 猎物图鉴</span>
      </div>

      <div class="tier-filters">
        <button
          v-for="tier in tierOptions"
          :key="tier.key"
          type="button"
          class="filter-chip"
          :class="[tier.cls, { active: selectedTier === tier.key }]"
          @click="selectedTier = tier.key"
        >
          <span>{{ tier.label }}</span>
          <span class="chip-count">{{ tier.count }}</span>
        </button>
      </div>
    </div>

    <!-- 猎物卡片列表 -->
    <div v-if="filteredPreyEntries.length > 0" class="prey-grid">
      <article
        v-for="[name, prey] in filteredPreyEntries"
        :key="name"
        class="prey-card"
        :class="getTierClass(prey.综合评级)"
      >
        <!-- 卡片头部：姓名、评级徽章、年龄人种、展开按钮 -->
        <div class="prey-card-head" @click="toggleExpand(name)">
          <div class="head-left">
            <span class="tier-medal" :class="getTierClass(prey.综合评级)">
              {{ extractTierLetter(prey.综合评级) }}
            </span>
            <div class="name-block">
              <div class="name-row">
                <span class="prey-name">{{ name }}</span>
                <span class="prey-rating-full">{{ prey.综合评级 }}</span>
              </div>
              <div class="prey-sub">
                <span><i class="fa-solid fa-user-tag"></i> {{ prey.年龄与人种 }}</span>
              </div>
            </div>
          </div>

          <button type="button" class="expand-toggle" :aria-expanded="isExpanded(name)">
            <span>{{ isExpanded(name) ? '收起私密' : '微观档案' }}</span>
            <i class="fa-solid fa-chevron-down" :class="{ rotated: isExpanded(name) }"></i>
          </button>
        </div>

        <!-- 核心常驻摘要：身份背德标签 + 名器鉴定状态 + 当前关系 -->
        <div class="prey-summary">
          <div class="summary-line">
            <span class="field-tag"><i class="fa-solid fa-masks-theater"></i> 身份背德</span>
            <span class="field-val">{{ prey.身份与背德标签 }}</span>
          </div>

          <div class="summary-line mingqi-line" :class="{ 'is-identified': !prey.名器与品级倍率.includes('未鉴定') }">
            <span class="field-tag"><i class="fa-solid fa-gem"></i> 名器品级</span>
            <span class="field-val mingqi-val">{{ prey.名器与品级倍率 }}</span>
          </div>

          <div class="summary-line">
            <span class="field-tag"><i class="fa-solid fa-heart-circle-bolt"></i> 当前状态</span>
            <span class="field-val status-highlight">{{ prey.当前状态与关系 }}</span>
          </div>
        </div>

        <!-- 展开区：12维显微镜级肉体与私密特征 -->
        <div v-if="isExpanded(name)" class="prey-micro-details">
          <div class="micro-item">
            <div class="micro-label">
              <i class="fa-solid fa-person-dress"></i>
              <span>身材流派与胸臀三围</span>
            </div>
            <p class="micro-text">{{ prey.身材流派与三围 }}</p>
          </div>

          <div class="micro-item">
            <div class="micro-label">
              <i class="fa-solid fa-magnifying-glass-plus"></i>
              <span>私密部位显微镜特征</span>
            </div>
            <p class="micro-text">{{ prey.私密微观特征 }}</p>
          </div>

          <div class="micro-item">
            <div class="micro-label">
              <i class="fa-solid fa-fire-burner"></i>
              <span>性经验六级与开发度</span>
            </div>
            <p class="micro-text">{{ prey.性经验与开发度 }}</p>
          </div>
        </div>
      </article>
    </div>

    <div v-else class="empty-box">
      <i class="fa-solid fa-street-view"></i>
      <p>当前筛选条件下暂无已锁定的猎物档案</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const selectedTier = ref<string>('ALL');
const expandedMap = ref<Record<string, boolean>>({});

const allPreyEntries = computed(() => Object.entries(store.data.猎物图鉴 || {}));

function extractTierLetter(rating: string): string {
  const upper = (rating || '').toUpperCase();
  if (upper.includes('SS')) return 'SS';
  if (upper.includes('S')) return 'S';
  if (upper.includes('A')) return 'A';
  if (upper.includes('B')) return 'B';
  if (upper.includes('C')) return 'C';
  return '?';
}

function getTierClass(rating: string): string {
  const tier = extractTierLetter(rating);
  switch (tier) {
    case 'SS':
    case 'S':
      return 'tier-s';
    case 'A':
      return 'tier-a';
    case 'B':
      return 'tier-b';
    default:
      return 'tier-c';
  }
}

const tierOptions = computed(() => {
  const entries = allPreyEntries.value;
  const countBy = (letter: string) =>
    entries.filter(([, p]) => extractTierLetter(p.综合评级) === letter).length;
  return [
    { key: 'ALL', label: '全部', count: entries.length, cls: 'chip-all' },
    { key: 'S', label: 'S级', count: countBy('S') + countBy('SS'), cls: 'chip-s' },
    { key: 'A', label: 'A级', count: countBy('A'), cls: 'chip-a' },
    { key: 'B', label: 'B级', count: countBy('B'), cls: 'chip-b' },
    { key: 'C', label: 'C级', count: countBy('C'), cls: 'chip-c' },
  ];
});

const filteredPreyEntries = computed(() => {
  if (selectedTier.value === 'ALL') return allPreyEntries.value;
  return allPreyEntries.value.filter(([, prey]) => {
    const letter = extractTierLetter(prey.综合评级);
    if (selectedTier.value === 'S') return letter === 'S' || letter === 'SS';
    return letter === selectedTier.value;
  });
});

function isExpanded(name: string): boolean {
  return Boolean(expandedMap.value[name]);
}

function toggleExpand(name: string) {
  expandedMap.value[name] = !expandedMap.value[name];
}
</script>

<style lang="scss" scoped>
.prey-codex {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.codex-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: 8px;
  border-bottom: 1px dashed var(--c-border);
}

.toolbar-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.86rem;
  font-weight: 700;
  color: #ff8fb8;
}

.tier-filters {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid var(--c-border-subtle);
  background: var(--c-surface-card);
  color: var(--c-text-secondary);
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.filter-chip.active {
  border-color: var(--c-primary);
  background: var(--c-primary-soft);
  color: #fff;
}

.chip-count {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  opacity: 0.8;
}

.prey-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.prey-card {
  background: var(--c-surface-card);
  border: 1px solid var(--c-border-subtle);
  border-radius: 10px;
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.prey-card.tier-s {
  border-color: rgba(245, 185, 66, 0.55);
  box-shadow: 0 0 12px rgba(245, 185, 66, 0.12);
}

.prey-card.tier-a {
  border-color: rgba(255, 59, 125, 0.45);
}

.prey-card.tier-b {
  border-color: rgba(181, 137, 255, 0.35);
}

.prey-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 12px;
  background: rgba(15, 10, 22, 0.55);
  border-bottom: 1px solid var(--c-border-subtle);
  cursor: pointer;
}

.head-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tier-medal {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 800;
  flex-shrink: 0;
}

.tier-medal.tier-s {
  background: linear-gradient(135deg, #f5b942, #ff3b7d);
  color: #120d17;
  box-shadow: 0 0 10px rgba(245, 185, 66, 0.45);
}

.tier-medal.tier-a {
  background: linear-gradient(135deg, #ff3b7d, #9d174d);
  color: #fff;
}

.tier-medal.tier-b {
  background: linear-gradient(135deg, #a78bfa, #5b21b6);
  color: #fff;
}

.tier-medal.tier-c {
  background: rgba(255, 255, 255, 0.14);
  color: var(--c-text-secondary);
}

.name-block {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
}

.prey-name {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--c-text-primary);
}

.prey-rating-full {
  font-size: 0.7rem;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(255, 59, 125, 0.15);
  color: #ff8fb8;
  font-weight: 600;
}

.prey-sub {
  font-size: 0.73rem;
  color: var(--c-text-muted);
}

.expand-toggle {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 9px;
  border-radius: 6px;
  border: 1px solid var(--c-border);
  background: rgba(255, 59, 125, 0.1);
  color: #ff9ec2;
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
}

.expand-toggle i {
  transition: transform 0.2s ease;
}

.expand-toggle i.rotated {
  transform: rotate(180deg);
}

.prey-summary {
  padding: 9px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.summary-line {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.78rem;
  line-height: 1.4;
}

.field-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--c-text-muted);
  font-weight: 600;
  white-space: nowrap;
  min-width: 72px;
}

.field-val {
  color: var(--c-text-secondary);
  flex: 1;
}

.mingqi-line .mingqi-val {
  color: #c4b5fd;
}

.mingqi-line.is-identified .mingqi-val {
  color: var(--c-accent-gold);
  font-weight: 600;
}

.status-highlight {
  color: #ff9ec2;
}

.prey-micro-details {
  padding: 10px 12px;
  background: rgba(12, 8, 18, 0.65);
  border-top: 1px dashed var(--c-border);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.micro-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.micro-label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.74rem;
  font-weight: 700;
  color: var(--c-accent-gold);
}

.micro-text {
  font-size: 0.77rem;
  color: var(--c-text-secondary);
  line-height: 1.45;
  padding-left: 18px;
}

.empty-box {
  text-align: center;
  padding: 20px;
  color: var(--c-text-muted);
  font-size: 0.82rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
</style>
