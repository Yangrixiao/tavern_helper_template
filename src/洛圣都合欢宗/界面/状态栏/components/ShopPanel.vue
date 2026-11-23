<template>
  <div class="shop-panel">
    <div class="shop-banner">
      <div class="banner-left">
        <i class="fa-solid fa-store"></i>
        <span>合欢宗随身秘宝阁（消耗合欢点兑换，在行动中向柳三娘指定即可购买）</span>
      </div>
      <div class="banner-balance">
        当前可用：<strong>{{ store.data.主角.合欢点 }}</strong> 合欢点
      </div>
    </div>

    <div v-if="!_.isEmpty(store.data.合欢宗系统.当期商城货架)" class="shop-grid">
      <article
        v-for="(item, itemName) in store.data.合欢宗系统.当期商城货架"
        :key="itemName"
        class="shop-item"
        :class="{ affordable: store.data.主角.合欢点 >= item.价格合欢点 }"
      >
        <div class="item-top">
          <div class="item-title-wrap">
            <span class="cat-badge" :class="getCatClass(item.分类)">
              <i :class="getCatIcon(item.分类)"></i>
              {{ item.分类 }}
            </span>
            <h4 class="item-name">{{ itemName }}</h4>
          </div>

          <span
            class="price-pill"
            :class="{ 'can-buy': store.data.主角.合欢点 >= item.价格合欢点 }"
          >
            <i class="fa-solid fa-fire"></i>
            {{ item.价格合欢点 }} 点
          </span>
        </div>

        <p class="item-effect">{{ item.色情效果 }}</p>
      </article>
    </div>

    <div v-else class="empty-box">
      <i class="fa-solid fa-box-open"></i>
      <span>当期商城货架暂未刷新，可随时在脑海中呼唤师姐柳三娘刷新秘宝。</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useDataStore } from '../store';

const store = useDataStore();

function getCatClass(cat: string): string {
  if (cat.includes('肉体')) return 'cat-body';
  if (cat.includes('秘术')) return 'cat-art';
  if (cat.includes('特权') || cat.includes('因果')) return 'cat-priv';
  return 'cat-drug';
}

function getCatIcon(cat: string): string {
  if (cat.includes('肉体')) return 'fa-solid fa-dumbbell';
  if (cat.includes('秘术')) return 'fa-solid fa-scroll';
  if (cat.includes('特权') || cat.includes('因果')) return 'fa-solid fa-crown';
  return 'fa-solid fa-flask-vial';
}
</script>

<style lang="scss" scoped>
.shop-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.shop-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 6px;
  background: rgba(245, 185, 66, 0.08);
  border: 1px solid var(--c-border-gold);
  font-size: 0.74rem;
  color: var(--c-text-secondary);
}

.banner-left {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.banner-left i {
  color: var(--c-accent-gold);
}

.banner-balance strong {
  font-family: var(--font-mono);
  color: var(--c-accent-gold);
  font-size: 0.85rem;
}

.shop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
}

.shop-item {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: border-color 0.2s ease;
}

.shop-item.affordable {
  border-color: var(--c-border-gold);
}

.item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.item-title-wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.cat-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.66rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--c-primary-soft);
  color: var(--c-primary);
}

.cat-badge.cat-body {
  background: var(--c-danger-soft);
  color: var(--c-danger);
}

.cat-badge.cat-art {
  background: var(--c-accent-gold-soft);
  color: var(--c-accent-gold);
}

.cat-badge.cat-priv {
  background: rgba(56, 182, 255, 0.16);
  color: var(--c-stamina);
}

.item-name {
  font-size: 0.85rem;
  font-weight: 800;
  color: #fff;
}

.price-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--c-border);
  color: var(--c-text-muted);
  white-space: nowrap;
}

.price-pill.can-buy {
  background: var(--c-accent-gold-soft);
  border-color: var(--c-border-gold);
  color: var(--c-accent-gold);
}

.item-effect {
  font-size: 0.76rem;
  line-height: 1.42;
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
