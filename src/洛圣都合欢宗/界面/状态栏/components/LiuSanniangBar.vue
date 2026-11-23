<template>
  <section
    class="sanniang-panel"
    :class="{
      'is-materialized': isMaterialized,
      'is-horny': store.data.柳三娘.淫乱兴奋度 >= 70,
    }"
  >
    <div class="sanniang-header">
      <div class="persona-left">
        <div class="avatar-ring">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span class="ss-tag">SS仙鼎</span>
        </div>
        <div class="persona-titles">
          <div class="name-line">
            <span class="persona-name">柳三娘</span>
            <span class="persona-role">合欢宗妖女师姐</span>
            <span class="form-badge" :class="{ materialized: isMaterialized }">
              <i :class="formIcon"></i>
              {{ store.data.柳三娘.当前形态 }}
            </span>
            <span v-if="store.data.柳三娘.剩余具象时长 > 0 || isMaterialized" class="timer-badge">
              <i class="fa-solid fa-hourglass-half"></i>
              剩余 {{ store.data.柳三娘.剩余具象时长 }} 小时
            </span>
          </div>
          <div class="outfit-line">
            <i class="fa-solid fa-shirt"></i>
            <span class="outfit-label">当前魂衣：</span>
            <span class="outfit-text">{{ store.data.柳三娘.当前魂衣穿搭 || '半透明绯红开档抹胸纱裙' }}</span>
          </div>
        </div>
      </div>

      <!-- 淫乱兴奋度 (0-100) -->
      <div class="arousal-box">
        <div class="arousal-top">
          <span class="arousal-label">
            <i class="fa-solid fa-heart-pulse"></i>
            师姐淫乱兴奋度
          </span>
          <span class="arousal-val">{{ store.data.柳三娘.淫乱兴奋度 }}% · {{ arousalStageText }}</span>
        </div>
        <div class="arousal-track">
          <div
            class="arousal-fill"
            :style="{ width: store.data.柳三娘.淫乱兴奋度 + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- 识海实时骚话吐槽气泡 -->
    <div class="speech-bubble">
      <div class="quote-mark">
        <i class="fa-solid fa-comment-dots"></i>
        <span>识海传音</span>
      </div>
      <p class="speech-text">“{{ store.data.柳三娘.实时骚话吐槽 }}”</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const isMaterialized = computed(() => store.data.柳三娘.当前形态 !== '识海残魂');

const formIcon = computed(() => {
  const form = store.data.柳三娘.当前形态;
  if (form === '识海残魂') return 'fa-solid fa-cloud-moon';
  if (form === '实体具象·对外隐形') return 'fa-solid fa-user-secret';
  return 'fa-solid fa-person-dress-burst';
});

const arousalStageText = computed(() => {
  const v = store.data.柳三娘.淫乱兴奋度;
  if (v < 35) return '慵懒戏谑';
  if (v < 70) return '眼馋夹腿';
  if (v < 90) return '抠穴自慰';
  return '汁水泛滥求肏';
});
</script>

<style lang="scss" scoped>
.sanniang-panel {
  padding: 10px 14px;
  background: linear-gradient(180deg, rgba(34, 20, 52, 0.95) 0%, rgba(23, 15, 36, 0.98) 100%);
  border-bottom: 1px solid var(--c-border);
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.sanniang-panel.is-horny {
  background: linear-gradient(180deg, rgba(58, 18, 52, 0.95) 0%, rgba(30, 14, 40, 0.98) 100%);
}

.sanniang-panel.is-materialized {
  border-bottom-color: var(--c-primary);
  box-shadow: inset 0 0 18px rgba(255, 59, 139, 0.18);
}

.sanniang-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.persona-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 240px;
}

.avatar-ring {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(255, 59, 139, 0.25), rgba(245, 185, 66, 0.2));
  border: 1.5px solid var(--c-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--c-primary);
  font-size: 0.95rem;
  position: relative;
  flex-shrink: 0;
  box-shadow: 0 0 10px rgba(255, 59, 139, 0.3);
}

.ss-tag {
  font-size: 0.56rem;
  font-weight: 800;
  color: var(--c-accent-gold);
  line-height: 1;
  margin-top: 2px;
}

.persona-titles {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.name-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.persona-name {
  font-size: 0.92rem;
  font-weight: 800;
  color: #fff;
}

.persona-role {
  font-size: 0.72rem;
  color: var(--c-primary);
  font-weight: 600;
}

.form-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 999px;
  background: var(--c-surface-elevated);
  border: 1px solid var(--c-border);
  color: var(--c-text-secondary);
}

.form-badge.materialized {
  background: var(--c-primary-soft);
  border-color: var(--c-primary);
  color: #fff;
  box-shadow: 0 0 8px rgba(255, 59, 139, 0.4);
}

.timer-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 999px;
  background: var(--c-accent-gold-soft);
  border: 1px solid var(--c-border-gold);
  color: var(--c-accent-gold);
}

.outfit-line {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  color: var(--c-text-muted);
}

.outfit-line i {
  color: var(--c-primary);
  font-size: 0.72rem;
}

.outfit-label {
  font-weight: 600;
}

.outfit-text {
  color: var(--c-text-secondary);
}

.arousal-box {
  width: 210px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: rgba(13, 8, 20, 0.55);
  border: 1px solid var(--c-border);
  padding: 6px 9px;
  border-radius: 7px;
}

.arousal-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.7rem;
}

.arousal-label {
  color: var(--c-primary);
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.arousal-val {
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--c-text-secondary);
}

.arousal-track {
  width: 100%;
  height: 6px;
  background: rgba(13, 8, 20, 0.9);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid rgba(255, 59, 139, 0.25);
}

.arousal-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff7eb3, var(--c-primary), var(--c-danger));
  border-radius: 999px;
  transition: width 0.3s ease;
  box-shadow: 0 0 8px rgba(255, 59, 139, 0.6);
}

.speech-bubble {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: rgba(13, 8, 20, 0.72);
  border: 1px solid var(--c-border-highlight);
  border-left: 3px solid var(--c-primary);
  border-radius: 7px;
  padding: 8px 10px;
}

.quote-mark {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.68rem;
  font-weight: 800;
  color: var(--c-primary);
  background: var(--c-primary-soft);
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  flex-shrink: 0;
  margin-top: 1px;
}

.speech-text {
  font-size: 0.81rem;
  line-height: 1.45;
  color: var(--c-text-main);
  font-style: italic;
}

@media (max-width: 640px) {
  .arousal-box {
    width: 100%;
  }
}
</style>
