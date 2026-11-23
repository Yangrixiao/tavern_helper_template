<template>
  <section class="sanniang-banner" :class="formClass">
    <div class="banner-top">
      <div class="persona-left">
        <div class="avatar-medallion">
          <i class="fa-solid fa-fan"></i>
          <span class="ss-tag">SS</span>
        </div>
        <div class="persona-meta">
          <div class="name-line">
            <span class="persona-name">柳三娘</span>
            <span class="persona-title">前合欢宗圣女·随身骚师姐</span>
          </div>
          <div class="form-badges">
            <span class="form-pill" :class="formClass">
              <i :class="formIcon"></i>
              {{ store.data.柳三娘.当前形态 }}
            </span>
            <span v-if="isMaterialized" class="timer-pill">
              <i class="fa-solid fa-hourglass-half"></i>
              剩余 {{ store.data.柳三娘.具象化剩余小时 }} 小时
            </span>
            <span v-if="isMaterialized" class="vis-pill" :class="{ 'is-public': store.data.柳三娘.具象化可见性 === '对他人可见' }">
              <i :class="store.data.柳三娘.具象化可见性 === '对他人可见' ? 'fa-solid fa-eye' : 'fa-solid fa-user-secret'"></i>
              {{ store.data.柳三娘.具象化可见性 }}
            </span>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <button
          v-if="isMaterialized"
          type="button"
          class="action-btn vis-toggle-btn"
          title="切换柳三娘真身对旁人的可见性"
          @click="toggleVisibility"
        >
          <i class="fa-solid fa-repeat"></i>
          <span>切换为{{ store.data.柳三娘.具象化可见性 === '仅男主可见' ? '对他人可见' : '仅男主可见' }}</span>
        </button>

        <button
          type="button"
          class="action-btn materialize-btn"
          :class="{ 'can-afford': store.data.主角.合欢点 >= 100 }"
          :title="store.data.主角.合欢点 >= 100 ? '消耗100合欢点，立即具象化柳三娘SS级真身1小时（无任何攻略前置）' : '需攒够100合欢点即可随时召唤师姐SS级真身（无攻略前置）'"
          @click="handleQuickMaterialize"
        >
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>{{ isMaterialized ? '续费真身 (+1h / 100点)' : '100点具象化真身' }}</span>
        </button>
      </div>
    </div>

    <!-- 师姐最新骚话点评气泡 -->
    <div class="quote-bubble">
      <i class="fa-solid fa-quote-left quote-mark"></i>
      <p class="quote-text">{{ store.data.柳三娘.最新骚话点评 }}</p>
    </div>

    <!-- 师姐当前发骚状态栏 -->
    <div class="arousal-strip">
      <span class="arousal-badge">
        <i class="fa-solid fa-fire"></i>
        当前发骚动态
      </span>
      <span class="arousal-desc">{{ store.data.柳三娘.当前发骚状态 }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const emit = defineEmits<{
  (e: 'openChamber'): void;
}>();

const store = useDataStore();

const isMaterialized = computed(() => store.data.柳三娘.当前形态 === '本尊具象化态');

const formClass = computed(() => {
  switch (store.data.柳三娘.当前形态) {
    case '本尊具象化态':
      return 'form-materialized';
    case '隐身作祟态':
      return 'form-haunting';
    default:
      return 'form-spirit';
  }
});

const formIcon = computed(() => {
  switch (store.data.柳三娘.当前形态) {
    case '本尊具象化态':
      return 'fa-solid fa-person-dress-burst';
    case '隐身作祟态':
      return 'fa-solid fa-hand-sparkles';
    default:
      return 'fa-solid fa-cloud-moon';
  }
});

function toggleVisibility() {
  if (store.data.柳三娘.具象化可见性 === '仅男主可见') {
    store.data.柳三娘.具象化可见性 = '对他人可见';
    toastr.info('柳三娘真身已切换为【对他人可见】（可参与双飞与当众镇场）');
  } else {
    store.data.柳三娘.具象化可见性 = '仅男主可见';
    toastr.info('柳三娘真身已切换为【仅男主可见】（隐秘独享偷情模式）');
  }
}

function handleQuickMaterialize() {
  if (store.data.主角.合欢点 < 100) {
    emit('openChamber');
    toastr.warning(`当前合欢点为 ${store.data.主角.合欢点}，攒够 100 点即可无门槛召唤师姐 SS 级真身！`);
    return;
  }
  store.data.主角.合欢点 -= 100;
  store.data.柳三娘.当前形态 = '本尊具象化态';
  store.data.柳三娘.具象化剩余小时 = (store.data.柳三娘.具象化剩余小时 || 0) + 1;
  if (store.data.柳三娘.具象化可见性 === '未具象化') {
    store.data.柳三娘.具象化可见性 = '仅男主可见';
  }
  toastr.success('已消耗 100 合欢点！柳三娘 SS 级圣女真身已具象化降临（+1小时）！');
}
</script>

<style lang="scss" scoped>
.sanniang-banner {
  padding: 11px 14px;
  background: linear-gradient(135deg, rgba(45, 22, 54, 0.92), rgba(25, 15, 34, 0.95));
  border-bottom: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.25s ease;
}

.sanniang-banner.form-materialized {
  background: linear-gradient(135deg, rgba(72, 20, 48, 0.95), rgba(38, 16, 40, 0.96));
  border-bottom: 1px solid var(--c-border-strong);
  box-shadow: inset 0 0 18px rgba(255, 59, 125, 0.18);
}

.sanniang-banner.form-haunting {
  background: linear-gradient(135deg, rgba(42, 24, 68, 0.94), rgba(24, 16, 40, 0.96));
}

.banner-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.persona-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-medallion {
  position: relative;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ff6b9d, #8a1548);
  border: 1.5px solid var(--c-accent-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1rem;
  flex-shrink: 0;
  box-shadow: 0 0 10px rgba(255, 59, 125, 0.4);
}

.ss-tag {
  position: absolute;
  bottom: -3px;
  right: -4px;
  background: linear-gradient(90deg, #f5b942, #ff3b7d);
  color: #120d17;
  font-family: var(--font-mono);
  font-weight: 800;
  font-size: 0.6rem;
  padding: 0 4px;
  border-radius: 4px;
  border: 1px solid #fff;
}

.persona-meta {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.name-line {
  display: flex;
  align-items: baseline;
  gap: 7px;
  flex-wrap: wrap;
}

.persona-name {
  font-family: var(--font-serif);
  font-size: 0.96rem;
  font-weight: 700;
  color: #ff8fb8;
}

.persona-title {
  font-size: 0.72rem;
  color: var(--c-text-muted);
}

.form-badges {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.form-pill,
.timer-pill,
.vis-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.7rem;
  padding: 1px 8px;
  border-radius: 999px;
  font-weight: 600;
}

.form-pill.form-spirit {
  background: var(--c-primary-soft);
  color: #ff8fb8;
  border: 1px solid var(--c-border);
}

.form-pill.form-haunting {
  background: var(--c-spirit-soft);
  color: #d4b8ff;
  border: 1px solid rgba(181, 137, 255, 0.45);
}

.form-pill.form-materialized {
  background: linear-gradient(90deg, rgba(245, 185, 66, 0.25), rgba(255, 59, 125, 0.3));
  color: var(--c-accent-gold);
  border: 1px solid var(--c-border-strong);
}

.timer-pill {
  background: rgba(245, 185, 66, 0.16);
  color: var(--c-accent-gold);
  border: 1px solid rgba(245, 185, 66, 0.4);
}

.vis-pill {
  background: rgba(255, 255, 255, 0.08);
  color: var(--c-text-secondary);
  border: 1px solid var(--c-border-subtle);
}

.vis-pill.is-public {
  background: rgba(46, 229, 157, 0.16);
  color: var(--c-stamina-healthy);
  border-color: rgba(46, 229, 157, 0.4);
}

.quick-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 7px;
  font-size: 0.73rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
  font-family: inherit;
}

.materialize-btn {
  background: rgba(255, 59, 125, 0.15);
  border: 1px solid var(--c-border);
  color: #ff9ec2;
}

.materialize-btn.can-afford {
  background: linear-gradient(90deg, #ff3b7d, #d97706);
  border-color: var(--c-accent-gold);
  color: #fff;
  box-shadow: 0 0 10px rgba(255, 59, 125, 0.38);
}

.materialize-btn:hover {
  transform: translateY(-1px);
  border-color: var(--c-accent-gold);
}

.vis-toggle-btn {
  background: var(--c-surface-card);
  border: 1px solid var(--c-border-strong);
  color: var(--c-accent-gold);
}

.vis-toggle-btn:hover {
  background: var(--c-accent-gold-soft);
}

.quote-bubble {
  position: relative;
  background: rgba(14, 8, 20, 0.62);
  border-left: 3px solid var(--c-primary);
  border-radius: 4px 8px 8px 4px;
  padding: 7px 11px 7px 26px;
}

.quote-mark {
  position: absolute;
  left: 8px;
  top: 8px;
  font-size: 0.75rem;
  color: var(--c-primary);
  opacity: 0.75;
}

.quote-text {
  font-size: 0.81rem;
  color: var(--c-text-primary);
  line-height: 1.45;
}

.arousal-strip {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.75rem;
  color: var(--c-text-secondary);
  background: rgba(255, 59, 125, 0.07);
  padding: 5px 9px;
  border-radius: 6px;
  border: 1px dashed rgba(255, 94, 148, 0.25);
}

.arousal-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #ff7aa8;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

.arousal-desc {
  line-height: 1.4;
}
</style>
