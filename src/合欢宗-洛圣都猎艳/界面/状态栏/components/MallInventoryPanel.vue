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
        <div
          v-for="[itemName, item] in inventoryEntries"
          :key="itemName"
          class="inv-card"
        >
          <div class="inv-top">
            <div class="inv-name-wrap">
              <span class="inv-cat-tag">{{ item.分类 }}</span>
              <span class="inv-name">{{ itemName }}</span>
            </div>
            <div class="inv-actions">
              <span class="inv-qty">x{{ item.数量 }}</span>
              <button
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
        <span>储物戒暂无仙家秘宝 · 可在下方合欢宗十类商城中消耗合欢点兑换</span>
      </div>
    </div>

    <!-- 第二部分：合欢宗系统商城十大类奇珍图谱与快捷兑换 -->
    <div class="catalog-section">
      <div class="sec-header">
        <div class="sec-title">
          <i class="fa-solid fa-store"></i>
          <span>合欢宗系统商城 · 十大类奇珍名录</span>
        </div>
        <span class="sec-hint">点击商品可直接消耗合欢点收入储物戒（或在正文中向柳三娘指定兑换）</span>
      </div>

      <div class="category-tabs">
        <button
          v-for="cat in mallCatalog"
          :key="cat.category"
          type="button"
          class="cat-chip"
          :class="{ active: activeCategory === cat.category }"
          @click="activeCategory = cat.category"
        >
          <i :class="cat.icon"></i>
          <span>{{ cat.shortName }}</span>
        </button>
      </div>

      <div v-if="currentCategoryData" class="catalog-grid">
        <div
          v-for="good in currentCategoryData.items"
          :key="good.name"
          class="good-card"
        >
          <div class="good-head">
            <span class="good-name">{{ good.name }}</span>
            <span class="good-price">{{ good.price }} 合欢点</span>
          </div>
          <p class="good-effect">{{ good.effect }}</p>
          <button
            type="button"
            class="buy-btn"
            :class="{ affordable: store.data.主角.合欢点 >= good.price }"
            @click="buyGood(currentCategoryData.category, good)"
          >
            <i class="fa-solid fa-cart-plus"></i>
            <span>{{ store.data.主角.合欢点 >= good.price ? '立即兑换' : '合欢点不足' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

interface MallGood {
  name: string;
  price: number;
  effect: string;
}

interface MallCategory {
  category: string;
  shortName: string;
  icon: string;
  items: MallGood[];
}

const mallCatalog: MallCategory[] = [
  {
    category: '催情迷魂类',
    shortName: '1.催情迷魂',
    icon: 'fa-solid fa-wine-bottle',
    items: [
      { name: '合欢散', price: 10, effect: '融水无味，饮后穴痒难耐主动求欢' },
      { name: '阴阳和合散', price: 20, effect: '高潮阈值减半，轻易潮吹失禁' },
      { name: '醉仙迷魂香', price: 30, effect: '吸入后神智微醺、羞耻心尽丧，任由摆布' },
      { name: '熟睡沉香', price: 35, effect: '深度昏睡 3 小时不醒，专供睡眠侵袭与无防玩弄' },
      { name: '听话水·合欢露', price: 40, effect: '半梦半醒间有问必答、对性指令无法抗拒' },
    ],
  },
  {
    category: '阳刚体术丹药类',
    shortName: '2.阳刚体术',
    icon: 'fa-solid fa-capsules',
    items: [
      { name: '锁阳丹', price: 15, effect: '强行延迟射精一次，金枪不倒' },
      { name: '回春丹', price: 20, effect: '体力立即+30' },
      { name: '固精丸', price: 25, effect: '本场精液量翻三倍，适合灌满与颜射' },
      { name: '虎狼丹', price: 35, effect: '体力+50，本场性爱硬度与冲击力暴涨' },
      { name: '龙阳暴血丹', price: 40, effect: '本场巨根尺寸临时再涨两成、青筋暴突，自带尺寸震慑' },
      { name: '九阳金枪丹', price: 100, effect: '体力上限永久+10（可多次兑换）' },
    ],
  },
  {
    category: '肉体改造与体液秘药类',
    shortName: '3.肉体体液',
    icon: 'fa-solid fa-droplet',
    items: [
      { name: '淫香体露', price: 15, effect: '女方汗液与淫水化为浓郁异香，越操香味越浓' },
      { name: '玉乳催汁丸', price: 20, effect: '令任意女性双乳胀满泌乳，可边操边吸母乳' },
      { name: '多汁春泉丸', price: 20, effect: '令女方淫水产量暴增三倍，抽插必带淫靡水声与喷潮' },
      { name: '敏感百倍膏', price: 25, effect: '涂抹阴蒂/乳头/花心，轻微摩擦即全身痉挛' },
      { name: '锁精玉环符', price: 25, effect: '射入后封锁宫口与穴口 12 小时，精液滴水不漏，专供藏精出街' },
      { name: '缩阴回春露', price: 30, effect: '令熟妇或松弛肉穴瞬间恢复处子般紧致，临时激发名器特性' },
    ],
  },
  {
    category: '合欢邪术与常识改写类',
    shortName: '4.邪术催眠',
    icon: 'fa-solid fa-eye-low-vision',
    items: [
      { name: '淫语真言咒', price: 25, effect: '女方在性爱中无法忍声，必须把内心最骚的感受大声喊出来' },
      { name: '幻境春梦引', price: 35, effect: '令目标当晚必定梦到被男主巨根狂操，次日见面自带羞耻湿穴' },
      { name: '尺寸烙印符', price: 45, effect: '在女方潜意识种下巨根崇拜，看其他男人皆觉短小无味' },
      { name: '同感共鸣符', price: 50, effect: '贴于两女身上，操其中一人时另一人同步感受快感与高潮' },
      { name: '摄魂催眠符', price: 60, effect: '临时改写目标一条性常识 24 小时（如帮男同事口交是职场礼仪）' },
    ],
  },
  {
    category: '隐身结界与公共暴露类',
    shortName: '5.结界暴露',
    icon: 'fa-solid fa-shield-halved',
    items: [
      { name: '透视灵眸', price: 15, effect: '看穿衣物直视胸臀阴毛与穴口湿润度（持续1小时）' },
      { name: '无线神识跳蛋符', price: 20, effect: '无形气机化作跳蛋塞入目标穴内，隔空意念调节震动档位' },
      { name: '衣物消融符', price: 25, effect: '指定内衣或裙底暗中崩解走光' },
      { name: '隔音障眼结界', price: 30, effect: '方圆三米内声音与画面对外界模糊化，专供办公室/桌下背德盲操' },
    ],
  },
  {
    category: '师姐互动与具象化类',
    shortName: '6.师姐互动',
    icon: 'fa-solid fa-wand-magic-sparkles',
    items: [
      { name: '神识全场景监听', price: 5, effect: '监听目标私密对话或深夜自慰动静（持续1小时）' },
      { name: '师姐隐身作祟', price: 20, effect: '柳三娘隐形出手：按腰、掰穴、捂嘴、揉蒂助阵' },
      { name: '师姐合欢双修秘传', price: 40, effect: '与具象化师姐双修时反哺，体力瞬间回满且下场性爱合欢点+50%' },
      { name: '柳三娘具象化下场', price: 100, effect: '无需攻略前置，立即召唤柳三娘SS级本尊真身1小时（可选可见性）' },
    ],
  },
  {
    category: '情趣道具与捆绑调教类',
    shortName: '7.捆绑调教',
    icon: 'fa-solid fa-link',
    items: [
      { name: '缚仙红绳', price: 15, effect: '随心意自动捆绑出龟甲缚/M字开腿且不留伤痕，越挣扎越紧' },
      { name: '吸乳榨汁器', price: 15, effect: '自动吸附双乳揉捏吸吮，刺激乳头勃起泌汁' },
      { name: '后庭开发玉塞', price: 15, effect: '温润玉塞自动扩张松弛处子后庭（尾饰可选）' },
      { name: '子母共振玉卵', price: 20, effect: '塞入两女穴内或前后双穴，震动频率与抽插节奏同步' },
      { name: '扩阴窥器（透明玉制）', price: 20, effect: '撑开肉穴直视内壁褶皱与花心开合' },
      { name: '贞操锁精带', price: 30, effect: '锁死女方私处，唯有男主巨根靠近方可开启' },
    ],
  },
  {
    category: '霓裳制服与伪装幻化类',
    shortName: '8.霓裳制服',
    icon: 'fa-solid fa-shirt',
    items: [
      { name: '撕裂黑丝（无限耐久）', price: 5, effect: '撕开即露出白嫩臀肉与骚穴，事后可自动复原' },
      { name: '羞耻度削减胸贴/丁字裤', price: 10, effect: '极小布料遮掩私处，大幅降低女方暴露抗拒感' },
      { name: '幻化霓裳符', price: 15, effect: '一念将女方衣物替换为情趣旗袍、开档黑丝、修女服、女警制服等' },
    ],
  },
  {
    category: '情报扫描与名器攻略类',
    shortName: '9.情报名器',
    icon: 'fa-solid fa-compass-drafting',
    items: [
      { name: '目标完整档案', price: 15, effect: '三围、性经验次数、敏感带、近期把柄一览' },
      { name: '弱点与把柄深挖', price: 20, effect: '直接定位可用于胁迫/交易的致命秘密（如赌债、偷情录音）' },
      { name: '名器预鉴符', price: 20, effect: '未插入前提前看穿目标名器种类与品级' },
      { name: '名器破关秘谱', price: 30, effect: '柳三娘亲授针对该名器的专属抽插角度，本场高潮激烈度保底升一档' },
    ],
  },
  {
    category: '善后与气运辅助类',
    shortName: '10.善后气运',
    icon: 'fa-solid fa-clover',
    items: [
      { name: '事后清净符', price: 10, effect: '一键清理现场体液气味，或保留穴内精液仅清理外表' },
      { name: '避孕锁胎符', price: 15, effect: '本场无套内射绝对避孕，消除女方后顾之忧' },
      { name: '受孕必中符', price: 15, effect: '危险期受孕灌满必中，契合背德播种玩法' },
      { name: '艳遇桃花签', price: 30, effect: '抽取后接下来在指定区域必遇 A 级或 S 级高分猎物' },
    ],
  },
];

const activeCategory = ref<string>(mallCatalog[0].category);

const currentCategoryData = computed(() =>
  mallCatalog.find(c => c.category === activeCategory.value),
);

const inventoryEntries = computed(() =>
  Object.entries(store.data.主角.商城道具栏 || {}).filter(([, item]) => item.数量 > 0),
);

function consumeItem(name: string) {
  const target = store.data.主角.商城道具栏[name];
  if (!target) return;
  if (name === '回春丹') {
    store.data.主角.体力 = Math.min(store.data.主角.体力上限, store.data.主角.体力 + 30);
    toastr.success('已服用【回春丹】，体力立即恢复 +30！');
  } else if (name === '虎狼丹') {
    store.data.主角.体力 = Math.min(store.data.主角.体力上限, store.data.主角.体力 + 50);
    toastr.success('已服用【虎狼丹】，体力恢复 +50，金枪暴涨！');
  } else if (name === '九阳金枪丹') {
    store.data.主角.体力上限 = Math.min(300, store.data.主角.体力上限 + 10);
    store.data.主角.体力 = Math.min(store.data.主角.体力上限, store.data.主角.体力 + 10);
    toastr.success('已炼化【九阳金枪丹】，体力上限永久 +10！');
  } else {
    toastr.info(`已使用 1 个【${name}】`);
  }

  if (target.数量 <= 1) {
    delete store.data.主角.商城道具栏[name];
  } else {
    target.数量 -= 1;
  }
}

function buyGood(category: string, good: MallGood) {
  if (store.data.主角.合欢点 < good.price) {
    toastr.warning(`合欢点不足！兑换【${good.name}】需要 ${good.price} 合欢点（当前 ${store.data.主角.合欢点} 点）`);
    return;
  }

  store.data.主角.合欢点 -= good.price;

  if (good.name === '柳三娘具象化下场') {
    store.data.柳三娘.当前形态 = '本尊具象化态';
    store.data.柳三娘.具象化剩余小时 = (store.data.柳三娘.具象化剩余小时 || 0) + 1;
    if (store.data.柳三娘.具象化可见性 === '未具象化') {
      store.data.柳三娘.具象化可见性 = '仅男主可见';
    }
    toastr.success('已消耗 100 合欢点！柳三娘 SS 级圣女真身已具象化降临（+1小时）！');
    return;
  }

  if (good.name === '师姐隐身作祟') {
    store.data.柳三娘.当前形态 = '隐身作祟态';
    toastr.success('已消耗 20 合欢点！柳三娘已进入【隐身作祟态】帮师弟按腰掰穴！');
    return;
  }

  const existing = store.data.主角.商城道具栏[good.name];
  if (existing) {
    existing.数量 += 1;
  } else {
    store.data.主角.商城道具栏[good.name] = {
      分类: category,
      数量: 1,
      效果简述: good.effect,
    };
  }
  toastr.success(`成功消耗 ${good.price} 合欢点兑换【${good.name}】x1！`);
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
