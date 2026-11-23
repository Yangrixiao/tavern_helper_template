export const Schema = z.object({
  世界: z.object({
    当前日期: z.string(),
    当前时段: z.string(),
    当前区域: z.enum([
      '富人山庄区',
      '商业金融区',
      '网红海滩区',
      '夜店娱乐区',
      '中产社区',
      '底层街区',
    ]),
    当前场景: z.string(),
    性爱分幕进度: z.enum([
      '日常探索',
      '前戏挑逗态',
      '慢磨缠绵态',
      '狂桩暴肏态',
      '高潮灌精态',
      '余韵复燃态',
    ]),
  }),
  主角: z.object({
    现金: z.coerce.number(),
    合欢点: z.coerce.number(),
    体力: z.coerce.number().transform(value => _.clamp(value, 0, 100)),
    已习得秘术与改造: z.record(
      z.string().describe('词条名'),
      z.object({
        类别: z.string(),
        效果描述: z.string(),
      }),
    ),
    随身淫具与丹药: z.record(
      z.string().describe('道具名'),
      z.object({
        数量: z.coerce.number(),
        效果描述: z.string(),
      }),
    ),
  }),
  柳三娘: z.object({
    当前形态: z.enum([
      '识海残魂',
      '实体具象·对外隐形',
      '实体具象·外人可见',
    ]),
    剩余具象时长: z.coerce.number(),
    当前魂衣穿搭: z.string(),
    淫乱兴奋度: z.coerce.number().transform(value => _.clamp(value, 0, 100)),
    实时骚话吐槽: z.string(),
  }),
  合欢宗系统: z.object({
    当前任务: z.record(
      z.string().describe('任务名'),
      z.object({
        类型: z.string(),
        下流要求: z.string(),
        美金奖励: z.coerce.number(),
        额外奖励: z.string(),
        进度状态: z.string(),
      }),
    ),
    当期商城货架: z.record(
      z.string().describe('商品名'),
      z.object({
        分类: z.string(),
        价格合欢点: z.coerce.number(),
        色情效果: z.string(),
      }),
    ),
  }),
  炉鼎名册: z.record(
    z.string().describe('姓名'),
    z.object({
      评级: z.string(),
      身份与外貌简述: z.string(),
      专属名器: z.string(),
      恶堕阶段: z.string(),
      合欢淫印: z.boolean(),
      累计采补次数: z.coerce.number(),
      当前状态与调教指令: z.string(),
    }),
  ),
});

export type Schema = z.output<typeof Schema>;
