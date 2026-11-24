<template>
  <div class="mall-panel">
    <!-- 第一部分：已持有商城道具栏 -->
    <div class="inventory-section">
      <div class="sec-header">
        <div class="sec-title">
          <i class="fa-solid fa-box-open"></i>
          <span>随身储物戒 · 已持有奇珍</span>
        </div>
        <span class="balance-tag">
          可用合欢点：<strong>{{ store.data.主角.合欢点 }}</strong> 点
        </span>
      </div>

      <div v-if="inventoryEntries.length > 0" class="inv-grid">
        <div v-for="[itemName, item] in inventoryEntries" :key="itemName" class="inv-card">
          <div class="inv-top">
            <div class="inv-name-wrap">
              <span class="inv-cat-tag">{{ item.分类 }}</span>
              <span class="inv-name">{{ itemName }}</span>
            </div>
            <div class="inv-actions">
              <span class="inv-qty" :class="{ permanent: isPermanent(item.数量) }">
                {{ isPermanent(item.数量) ? '永久' : `x${item.数量}` }}
              </span>
              <button
                v-if="!isPermanent(item.数量)"
                type="button"
                class="use-btn"
                title="消耗 1 个该道具"
                @click="consumeItem(itemName)"
              >
                使用 -1
              </button>
            </div>
          </div>
          <p class="inv-desc">{{ item.效果简述 }}</p>
        </div>
      </div>

      <div v-else class="empty-inv">
        <i class="fa-solid fa-pouch"></i>
        <span>储物戒暂无仙家秘宝 · 可在下方货架消耗合欢点兑换</span>
      </div>
    </div>

    <!-- 第二部分：动态商城货架 -->
    <div class="catalog-section">
      <div class="sec-header">
        <div class="sec-title">
          <i class="fa-solid fa-store"></i>
          <span>合欢宗系统商城 · 动态货架</span>
        </div>
        <span class="sec-hint">{{ shelfEntries.length }} 件在售</span>
      </div>

      <div v-if="categoryList.length > 0" class="category-tabs">
        <button
          type="button"
          class="cat-chip"
          :class="{ active: activeCategory === 'ALL' }"
          @click="activeCategory = 'ALL'"
        >
          <i class="fa-solid fa-layer-group"></i>
          <span>全部 {{ shelfEntries.length }}</span>
        </button>
        <button
          v-for="cat in categoryList"
          :key="cat.name"
          type="button"
          class="cat-chip"
          :class="{ active: activeCategory === cat.name }"
          @click="activeCategory = cat.name"
        >
          <span>{{ cat.short }}</span>
          <span class="cat-count">{{ cat.count }}</span>
        </button>
      </div>

      <div v-if="filteredGoods.length > 0" class="catalog-grid">
        <div v-for="[goodName, good] in filteredGoods" :key="goodName" class="good-card">
          <div class="good-head">
            <span class="good-name">{{ goodName }}</span>
            <span class="good-price">{{ good.价格 || '—' }}</span>
          </div>
          <div class="good-tags">
            <span class="src-tag" :class="sourceClass(good.来源)">{{ good.来源 || '常驻' }}</span>
            <span v-if="good.绑定任务" class="bind-tag" :title="good.绑定任务">
              <i class="fa-solid fa-link"></i>
              {{ good.绑定任务 }}
            </span>
          </div>
          <p class="good-effect">{{ good.效果简述 }}</p>
          <button
            type="button"
            class="buy-btn"
            :class="{ affordable: canAfford(good.价格) }"
            @click="buyGood(goodName, good.分类, good.价格, good.效果简述, good.来源)"
          >
            <i class="fa-solid fa-cart-plus"></i>
            <span>{{ canAfford(good.价格) ? '立即兑换' : '合欢点不足' }}</span>
          </button>
        </div>
      </div>

      <div v-else class="empty-inv">
        <i class="fa-solid fa-store-slash"></i>
        <span>货架暂无商品 · 换区换舞台或派发新单后会自动刷新</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const activeCategory = ref<string>('ALL');

const inventoryEntries = computed(() =>
  Object.entries(store.data.主角.商城道具栏 || {}).filter(([, item]) => {
    if (typeof item.数量 === 'string') return item.数量.length > 0;
    return Number(item.数量) > 0;
  }),
);

const shelfEntries = computed(() => Object.entries(store.data.商城货架 || {}));

const categoryList = computed(() => {
  const counter = new Map<string, number>();
  for (const [, good] of shelfEntries.value) {
    const category = good.分类 || '未分类';
    counter.set(category, (counter.get(category) ?? 0) + 1);
  }
  return [...counter.entries()]
    .sort((a, b) => a[0].localeCompare(b[0], 'zh-Hans-CN'))
    .map(([name, count]) => ({
      name,
      count,
      short: name.replace(/\s+/g, ''),
    }));
});

const filteredGoods = computed(() => {
  if (activeCategory.value === 'ALL') return shelfEntries.value;
  return shelfEntries.value.filter(([, good]) => (good.分类 || '未分类') === activeCategory.value);
});

function isPermanent(quantity: number | string): boolean {
  return typeof quantity === 'string' && quantity.includes('永久');
}

function parsePrice(price: string): number {
  const match = String(price ?? '').match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

function canAfford(price: string): boolean {
  return store.data.主角.合欢点 >= parsePrice(price);
}

function sourceClass(source: string): string {
  switch (source) {
    case '任务专属':
      return 'src-quest';
    case '定制':
      return 'src-custom';
    case '动态':
      return 'src-dynamic';
    default:
      return 'src-constant';
  }
}

function consumeItem(name: string) {
  const target = store.data.主角.商城道具栏[name];
  if (!target) return;
  if (isPermanent(target.数量)) {
    toastr.info(`【${name}】为永久秘技，无需消耗`);
    return;
  }

  if (name === '回春丹') {
    store.data.主角.体力 = Math.min(store.data.主角.体力上限, store.data.主角.体力 + 30);
    toastr.success('已服用【回春丹】，体力立即恢复 +30！');
  } else if (name === '虎狼丹') {
    store.data.主角.体力 = Math.min(store.data.主角.体力上限, store.data.主角.体力 + 50);
    toastr.success('已服用【虎狼丹】，体力恢复 +50，金枪暴涨！');
  } else if (name === '九阳金枪丹') {
    store.data.主角.体力上限 += 10;
    store.data.主角.体力 = Math.min(store.data.主角.体力上限, store.data.主角.体力 + 10);
    toastr.success('已炼化【九阳金枪丹】，体力上限永久 +10！');
  } else {
    toastr.info(`已使用 1 个【${name}】`);
  }

  const quantity = Number(target.数量) || 0;
  if (quantity <= 1) {
    delete store.data.主角.商城道具栏[name];
  } else {
    target.数量 = quantity - 1;
  }
}

function buyGood(
  goodName: string,
  category: string,
  price: string,
  effect: string,
  source: string,
) {
  const cost = parsePrice(price);
  if (store.data.主角.合欢点 < cost) {
    toastr.warning(
      `合欢点不足！兑换【${goodName}】需要 ${cost} 合欢点（当前 ${store.data.主角.合欢点} 点）`,
    );
    return;
  }

  store.data.主角.合欢点 -= cost;

  if (goodName.includes('具象化')) {
    store.data.柳三娘.当前形态 = '本尊具象化态';
    store.data.柳三娘.具象化剩余小时 = (store.data.柳三娘.具象化剩余小时 || 0) + 1;
    toastr.success('柳三娘 SS 级圣女真身已具象化降临（+1小时）！');
  } else if (goodName.includes('隐身作祟')) {
    store.data.柳三娘.当前形态 = '隐身作祟态';
    toastr.success('柳三娘已进入【隐身作祟态】帮师弟按腰掰穴！');
  }

  const existing = store.data.主角.商城道具栏[goodName];
  if (existing && !isPermanent(existing.数量)) {
    existing.数量 = (Number(existing.数量) || 0) + 1;
  } else if (!existing) {
    store.data.主角.商城道具栏[goodName] = {
      分类: category,
      数量: 1,
      效果简述: effect,
    };
  }

  if (source !== '常驻') {
    delete store.data.商城货架[goodName];
  }

  toastr.success(`成功消耗 ${cost} 合欢点兑换【${goodName}】！`);
}
</script>

<style lang="scss" scoped>
.mall-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.inventory-section,
.catalog-section {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.sec-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: 6px;
  border-bottom: 1px dashed var(--c-border);
}

.sec-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.86rem;
  font-weight: 700;
  color: #ff8fb8;
}

.balance-tag {
  font-size: 0.76rem;
  color: var(--c-text-secondary);
}

.balance-tag strong {
  color: var(--c-primary);
  font-family: var(--font-mono);
}

.sec-hint {
  font-size: 0.7rem;
  color: var(--c-text-muted);
}

.inv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 8px;
}

.inv-card {
  background: var(--c-surface-card);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.inv-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.inv-name-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.inv-cat-tag {
  font-size: 0.65rem;
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--c-spirit-soft);
  color: #d4b8ff;
}

.inv-name {
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--c-text-primary);
}

.inv-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.inv-qty {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--c-accent-gold);
}

.inv-qty.permanent {
  color: var(--c-stamina-healthy);
}

.use-btn {
  padding: 2px 7px;
  font-size: 0.68rem;
  border-radius: 4px;
  border: 1px solid var(--c-border);
  background: var(--c-primary-soft);
  color: #ff9ec2;
  cursor: pointer;
}

.use-btn:hover {
  background: var(--c-primary);
  color: #fff;
}

.inv-desc {
  font-size: 0.74rem;
  color: var(--c-text-secondary);
  line-height: 1.38;
}

.empty-inv {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  background: rgba(14, 9, 22, 0.5);
  border: 1px dashed var(--c-border-subtle);
  font-size: 0.77rem;
  color: var(--c-text-muted);
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.cat-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 9px;
  border-radius: 6px;
  border: 1px solid var(--c-border-subtle);
  background: var(--c-surface-card);
  color: var(--c-text-secondary);
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.cat-chip:hover {
  border-color: var(--c-border);
  color: var(--c-text-primary);
}

.cat-chip.active {
  background: var(--c-primary-soft);
  border-color: var(--c-primary);
  color: #fff;
}

.cat-count {
  font-family: var(--font-mono);
  font-size: 0.64rem;
  opacity: 0.75;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
  gap: 8px;
}

.good-card {
  background: rgba(20, 14, 28, 0.85);
  border: 1px solid var(--c-border-subtle);
  border-radius: 8px;
  padding: 9px 11px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
}

.good-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.good-name {
  font-size: 0.83rem;
  font-weight: 700;
  color: var(--c-text-primary);
}

.good-price {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--c-accent-gold);
  background: var(--c-accent-gold-soft);
  padding: 1px 6px;
  border-radius: 4px;
  white-space: nowrap;
}

.good-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.src-tag,
.bind-tag {
  font-size: 0.64rem;
  padding: 1px 5px;
  border-radius: 4px;
  border: 1px solid var(--c-border-subtle);
  color: var(--c-text-muted);
}

.src-tag.src-constant {
  border-color: rgba(46, 229, 157, 0.45);
  color: var(--c-stamina-healthy);
}

.src-tag.src-dynamic {
  border-color: rgba(181, 137, 255, 0.5);
  color: #c9b3ff;
}

.src-tag.src-quest {
  border-color: var(--c-primary);
  color: #ff9ec2;
}

.src-tag.src-custom {
  border-color: rgba(245, 185, 66, 0.6);
  color: var(--c-accent-gold);
}

.bind-tag {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.good-effect {
  font-size: 0.73rem;
  color: var(--c-text-secondary);
  line-height: 1.4;
  flex: 1;
}

.buy-btn {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 5px 8px;
  border-radius: 6px;
  border: 1px solid var(--c-border-subtle);
  background: rgba(255, 255, 255, 0.05);
  color: var(--c-text-muted);
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}

.buy-btn.affordable {
  background: var(--c-primary-soft);
  border-color: var(--c-primary);
  color: #ff9ec2;
}

.buy-btn.affordable:hover {
  background: var(--c-primary);
  color: #fff;
}
</style>
