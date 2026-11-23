export const Schema = z.object({
  世界: z.object({
    当前时间: z.string(),
    当前区域: z.enum([
      '市中心',
      '富人山庄区',
      '好麦坞',
      '威尼斯海滩',
      '中产社区',
      '贫民区',
      '夜店一条街',
      '国际机场与交通动脉',
    ]),
    当前具体地点: z.string(),
  }),
  主角: z.object({
    体力: z.coerce.number().transform(value => _.clamp(value, 0, 200)),
    体力上限: z.coerce.number().transform(value => _.clamp(value, 100, 300)),
    金钱: z.coerce.number().transform(value => _.clamp(value, 0, 99999999)),
    合欢点: z.coerce.number().transform(value => _.clamp(value, 0, 999999)),
    猎艳积分: z.coerce.number().transform(value => _.clamp(value, 0, 99999)),
    已解锁最高任务星级: z.enum(['2星', '3星', '4星', '5星']),
    商城道具栏: z.record(
      z.string().describe('道具名'),
      z.object({
        分类: z.string(),
        数量: z.coerce.number(),
        效果简述: z.string(),
      }),
    ),
  }),
  柳三娘: z.object({
    当前形态: z.enum(['神识伴随态', '隐身作祟态', '本尊具象化态']),
    具象化剩余小时: z.coerce.number().transform(value => _.clamp(value, 0, 99)),
    具象化可见性: z.enum(['未具象化', '仅男主可见', '对他人可见']),
    当前发骚状态: z.string(),
    最新骚话点评: z.string(),
  }),
  任务面板: z.record(
    z.string().describe('任务名称'),
    z.object({
      类型: z.string(),
      星级: z.string(),
      目标与舞台: z.string(),
      基础色情指标: z.string(),
      进阶挑战词条: z.string(),
      基础赏金: z.string(),
      状态: z.string(),
    }),
  ),
  猎物图鉴: z.record(
    z.string().describe('女性姓名'),
    z.object({
      综合评级: z.string(),
      年龄与人种: z.string(),
      身份与背德标签: z.string(),
      身材流派与三围: z.string(),
      私密微观特征: z.string(),
      名器与品级倍率: z.string(),
      性经验与开发度: z.string(),
      当前状态与关系: z.string(),
    }),
  ),
});

export type Schema = z.output<typeof Schema>;
