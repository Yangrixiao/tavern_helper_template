/**
 * 《合欢宗-洛圣都猎艳》改版变量结构（对齐 [initvar]状态初值 / [mvu_update]状态更新规则）。
 * 所有字段都带 catch 兜底：变量缺失、类型漂移甚至整块被写坏时，界面仍能正常渲染。
 */
const Text = (fallback = '') => z.string().catch(fallback);
const Count = (fallback = 0) => z.coerce.number().catch(fallback);

/** 宽松对象：优先用 zod4 的 looseObject；宿主注入 zod3 时退回 object().passthrough()。 */
function LooseObject<T extends z.ZodRawShape>(shape: T) {
  const loose = typeof (z as unknown as { looseObject?: unknown }).looseObject === 'function'
    ? z.looseObject(shape)
    : z.object(shape).passthrough();
  return loose as z.ZodObject<T>;
}

/** 对象节点：缺字段补默认值，整块写坏时回退到「全默认对象」。 */
function Obj<T extends z.ZodRawShape>(shape: T) {
  const base = LooseObject(shape);
  const fallback = base.parse({});
  return base.catch(fallback) as z.ZodObject<T>;
}

export const Schema = Obj({
  世界: Obj({
    当前区域: z.string().catch('国际机场与交通动脉'),
    当前具体地点: Text(),
    当前时间: Obj({
      天数: Count(1),
      星期: Text(),
      时段: Text(),
      钟点: Text('00:00'),
    }),
  }),

  主角: Obj({
    体力: Count(100),
    体力上限: Count(100),
    合欢点: Count(0),
    金钱: Count(0),
    商城道具栏: z
      .record(
        z.string(),
        Obj({
          分类: Text(),
          数量: z.union([z.string(), Count(1)]).catch(1),
          效果简述: Text(),
        }),
      )
      .catch({}),
  }),

  柳三娘: Obj({
    当前形态: z.enum(['神识伴随态', '隐身作祟态', '本尊具象化态']).catch('神识伴随态'),
    具象化可见性: z.enum(['仅主角可见', '对他人可见']).catch('仅主角可见'),
    具象化剩余小时: Count(0),
    目击风险: Count(0),
    目击记录: Text('无'),
    最新骚话点评: Text(),
    当前发骚状态: Text(),
  }),

  任务面板: z
    .record(
      z.string(),
      Obj({
        星级: Text('1星'),
        类型: Text(),
        事件类型: Text(),
        事件简介: Text(),
        破壳路线: Text(),
        状态: Text('进行中'),
        目标与舞台: Text(),
        基础色情指标: Text(),
        进阶挑战词条: Text(),
        基础赏金: Text(),
      }),
    )
    .catch({}),

  猎物图鉴: z
    .record(
      z.string(),
      Obj({
        综合评级: Text('C级'),
        好感: Count(0),
        堕落: Count(0),
        年龄: Text(),
        人种: Text(),
        身份与背德标签: Text(),
        身材流派与三围: Text(),
        私密微观特征: Text(),
        名器与品级倍率: Text(),
        性经验与开发度: Text(),
        弱点与破防线: Text(),
        当前状态与关系: Text(),
      }),
    )
    .catch({}),

  商城货架: z
    .record(
      z.string(),
      Obj({
        分类: Text(),
        价格: Text(),
        效果简述: Text(),
        来源: Text('常驻'),
        绑定任务: Text(),
      }),
    )
    .catch({}),
});

export type Schema = z.output<typeof Schema>;
