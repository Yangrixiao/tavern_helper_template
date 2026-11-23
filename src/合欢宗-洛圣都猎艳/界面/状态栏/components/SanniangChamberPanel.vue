<template>
  <div class="sanniang-chamber">
    <!-- 顶部：圣女本尊 SS 级档案卡 -->
    <div class="saintess-dossier">
      <div class="dossier-head">
        <div class="dossier-title">
          <span class="ss-badge">SS级圣女本尊</span>
          <h4>柳三娘 · 合欢宗当代圣女肉身档案</h4>
        </div>
        <span class="no-prereq-pill">
          <i class="fa-solid fa-unlock-keyhole"></i>
          无需攻略前置 · 100合欢点随叫随到
        </span>
      </div>

      <div class="dossier-grid">
        <div class="dossier-item">
          <span class="item-key"><i class="fa-solid fa-crown"></i> 骨相与穿搭</span>
          <span class="item-val">东方古典极品妖女·乌发挽髻插玉簪，半透明绯红合欢纱衣（真空不穿内衣，开叉达腰际）</span>
        </div>
        <div class="dossier-item">
          <span class="item-key"><i class="fa-solid fa-heart"></i> 肉体与三围</span>
          <span class="item-val">肤若凝脂、蜂腰肥臀、饱满欲滴羊脂玉乳（170cm / 36F-22-37）·天生无毛碧玉白虎</span>
        </div>
        <div class="dossier-item">
          <span class="item-key"><i class="fa-solid fa-gem"></i> 圣女专属名器</span>
          <span class="item-val highlight-mingqi">极品复合名器【碧玉白虎·温泉穴·吸精魔窟】（十倍吸啜绞缠×温润灵泉反哺）</span>
        </div>
        <div class="dossier-item">
          <span class="item-key"><i class="fa-solid fa-handshake-angle"></i> 道侣定位</span>
          <span class="item-val">授业恩师 + 荤话损友 + 随叫随到的首席双修道侣（感官与师弟半连通，实战越猛师姐越湿）</span>
        </div>
      </div>
    </div>

    <!-- 中部：三大形态切换与具象化控制台 -->
    <div class="control-section">
      <div class="sec-head">
        <i class="fa-solid fa-sliders"></i>
        <span>柳三娘三大形态切换与本尊具象化控制台</span>
      </div>

      <div class="forms-grid">
        <!-- 1. 神识伴随态 -->
        <div
          class="form-card"
          :class="{ active: store.data.柳三娘.当前形态 === '神识伴随态' }"
        >
          <div class="form-card-top">
            <span class="form-title"><i class="fa-solid fa-cloud-moon"></i> 神识伴随态</span>
            <span class="cost-tag free">0 合欢点（常驻）</span>
          </div>
          <p class="form-desc">
            化作只有男主可见可感的半透明娇艳虚影，趴在肩头吹气或坐在旁边晃着白腻裸足看戏点评、传授名器破关手法。
          </p>
          <button
            type="button"
            class="form-action-btn"
            :disabled="store.data.柳三娘.当前形态 === '神识伴随态'"
            @click="switchToSpirit"
          >
            {{ store.data.柳三娘.当前形态 === '神识伴随态' ? '当前所处形态' : '切回神识伴随态' }}
          </button>
        </div>

        <!-- 2. 隐身作祟态 -->
        <div
          class="form-card"
          :class="{ active: store.data.柳三娘.当前形态 === '隐身作祟态' }"
        >
          <div class="form-card-top">
            <span class="form-title"><i class="fa-solid fa-hand-sparkles"></i> 隐身作祟态</span>
            <span class="cost-tag spirit">20 合欢点 / 次</span>
          </div>
          <p class="form-desc">
            对外界完全隐形，但可实质触碰女性肉体——帮师弟暗中按住女方乱扭腰臀、掰开紧闭大腿与阴唇、捂住小嘴或揉捻阴蒂助阵。
          </p>
          <button
            type="button"
            class="form-action-btn"
            @click="activateHaunting"
          >
            {{ store.data.柳三娘.当前形态 === '隐身作祟态' ? '已激活隐身作祟' : '20点开启隐身作祟' }}
          </button>
        </div>

        <!-- 3. 本尊具象化态 -->
        <div
          class="form-card materialized-card"
          :class="{ active: store.data.柳三娘.当前形态 === '本尊具象化态' }"
        >
          <div class="form-card-top">
            <span class="form-title"><i class="fa-solid fa-person-dress-burst"></i> 本尊具象化态</span>
            <span class="cost-tag gold">100 合欢点 / 小时</span>
          </div>
          <p class="form-desc">
            无需任何攻略前置！随时将柳三娘凝聚为温热滑腻、汁水丰沛的 SS 级真人肉身（时长可叠加），既可独享圣女名器，也可拉洋妞同床双飞！
          </p>
          <button
            type="button"
            class="form-action-btn gold-btn"
            @click="summonMaterialized"
          >
            <i class="fa-solid fa-wand-magic-sparkles"></i>
            <span>{{ store.data.柳三娘.当前形态 === '本尊具象化态' ? '续费延长 +1小时 (100点)' : '100点立即具象化本尊' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 底部：具象化可见性模式与剩余时长调节 -->
    <div class="visibility-panel">
      <div class="vis-left">
        <span class="vis-title"><i class="fa-solid fa-eye"></i> 本尊具象化可见性模式：</span>
        <div class="vis-options">
          <button
            type="button"
            class="vis-chip"
            :class="{ active: store.data.柳三娘.具象化可见性 === '仅男主可见' }"
            @click="setVisibility('仅男主可见')"
          >
            <i class="fa-solid fa-user-secret"></i>
            <span>仅男主可见（公共场合隐形偷情双修）</span>
          </button>
          <button
            type="button"
            class="vis-chip"
            :class="{ active: store.data.柳三娘.具象化可见性 === '对他人可见' }"
            @click="setVisibility('对他人可见')"
          >
            <i class="fa-solid fa-users-viewfinder"></i>
            <span>对他人可见（真身现世双飞 / 调教镇场）</span>
          </button>
        </div>
      </div>

      <div class="hours-control">
        <span>具象化剩余：<strong>{{ store.data.柳三娘.具象化剩余小时 }}</strong> 小时</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

function switchToSpirit() {
  store.data.柳三娘.当前形态 = '神识伴随态';
  store.data.柳三娘.具象化剩余小时 = 0;
  store.data.柳三娘.具象化可见性 = '未具象化';
  toastr.info('柳三娘已化回【神识伴随态】');
}

function activateHaunting() {
  if (store.data.柳三娘.当前形态 === '隐身作祟态') {
    toastr.info('柳三娘当前已处于【隐身作祟态】');
    return;
  }
  if (store.data.主角.合欢点 < 20) {
    toastr.warning(`开启【隐身作祟态】需 20 合欢点（当前 ${store.data.主角.合欢点} 点）`);
    return;
  }
  store.data.主角.合欢点 -= 20;
  store.data.柳三娘.当前形态 = '隐身作祟态';
  store.data.柳三娘.具象化剩余小时 = 0;
  store.data.柳三娘.具象化可见性 = '未具象化';
  toastr.success('已消耗 20 合欢点！柳三娘已进入【隐身作祟态】帮师弟按腰掰穴！');
}

function summonMaterialized() {
  if (store.data.主角.合欢点 < 100) {
    toastr.warning(`具象化柳三娘 SS 级真身需 100 合欢点/小时（当前 ${store.data.主角.合欢点} 点）`);
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

function setVisibility(mode: '仅男主可见' | '对他人可见') {
  if (store.data.柳三娘.当前形态 !== '本尊具象化态') {
    toastr.warning('请先具象化柳三娘本尊，即可自由切换真身可见性！');
    return;
  }
  store.data.柳三娘.具象化可见性 = mode;
  toastr.success(`柳三娘真身可见性已切换为：【${mode}】`);
}
</script>

<style lang="scss" scoped>
.sanniang-chamber {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.saintess-dossier {
  background: linear-gradient(135deg, rgba(58, 18, 42, 0.85), rgba(26, 14, 34, 0.92));
  border: 1px solid var(--c-border-strong);
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dossier-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: 7px;
  border-bottom: 1px dashed rgba(245, 185, 66, 0.35);
}

.dossier-title {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.ss-badge {
  background: linear-gradient(90deg, #f5b942, #ff3b7d);
  color: #120d17;
  font-weight: 800;
  font-size: 0.7rem;
  padding: 2px 7px;
  border-radius: 5px;
}

.dossier-title h4 {
  font-family: var(--font-serif);
  font-size: 0.92rem;
  color: #ffd1e3;
}

.no-prereq-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.71rem;
  color: var(--c-accent-gold);
  background: var(--c-accent-gold-soft);
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 600;
}

.dossier-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 7px;
}

.dossier-item {
  background: rgba(14, 8, 20, 0.55);
  padding: 7px 9px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 0.76rem;
}

.item-key {
  color: #ff8fb8;
  font-weight: 700;
  font-size: 0.72rem;
}

.item-val {
  color: var(--c-text-secondary);
  line-height: 1.4;
}

.highlight-mingqi {
  color: var(--c-accent-gold);
  font-weight: 600;
}

.control-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sec-head {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--c-accent-gold);
}

.forms-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 9px;
}

.form-card {
  background: var(--c-surface-card);
  border: 1px solid var(--c-border-subtle);
  border-radius: 9px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
}

.form-card.active {
  border-color: var(--c-primary);
  box-shadow: 0 0 12px rgba(255, 59, 125, 0.2);
}

.form-card.materialized-card.active {
  border-color: var(--c-accent-gold);
  box-shadow: 0 0 14px rgba(245, 185, 66, 0.28);
}

.form-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  flex-wrap: wrap;
}

.form-title {
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--c-text-primary);
  display: flex;
  align-items: center;
  gap: 5px;
}

.cost-tag {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 700;
}

.cost-tag.free {
  background: rgba(46, 229, 157, 0.16);
  color: var(--c-stamina-healthy);
}

.cost-tag.spirit {
  background: var(--c-spirit-soft);
  color: #d4b8ff;
}

.cost-tag.gold {
  background: var(--c-accent-gold-soft);
  color: var(--c-accent-gold);
}

.form-desc {
  font-size: 0.74rem;
  color: var(--c-text-secondary);
  line-height: 1.42;
  flex: 1;
}

.form-action-btn {
  width: 100%;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid var(--c-border);
  background: var(--c-primary-soft);
  color: #ff9ec2;
  font-size: 0.74rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.form-action-btn:hover:not(:disabled) {
  background: var(--c-primary);
  color: #fff;
}

.form-action-btn:disabled {
  opacity: 0.55;
  cursor: default;
}

.form-action-btn.gold-btn {
  background: linear-gradient(90deg, rgba(255, 59, 125, 0.35), rgba(245, 185, 66, 0.35));
  border-color: var(--c-border-strong);
  color: #ffe4a0;
}

.form-action-btn.gold-btn:hover {
  background: linear-gradient(90deg, #ff3b7d, #d97706);
  color: #fff;
}

.visibility-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  background: rgba(14, 9, 20, 0.65);
  border: 1px solid var(--c-border-subtle);
}

.vis-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.vis-title {
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--c-text-secondary);
}

.vis-options {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.vis-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid var(--c-border-subtle);
  background: var(--c-surface-card);
  color: var(--c-text-secondary);
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
}

.vis-chip.active {
  border-color: var(--c-accent-gold);
  background: var(--c-accent-gold-soft);
  color: var(--c-accent-gold);
}

.hours-control {
  font-size: 0.76rem;
  color: var(--c-text-secondary);
}

.hours-control strong {
  color: var(--c-accent-gold);
  font-family: var(--font-mono);
}

@media (max-width: 680px) {
  .forms-grid {
    grid-template-columns: 1fr;
  }
}
</style>
