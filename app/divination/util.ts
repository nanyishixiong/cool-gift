import calendar from 'js-calendar-converter';

interface IGuaXiang {
  /** 六神名字 */
  name: string;
  /** 人的状态 */
  status: string;
  /** 五行 */
  wuxing: string;
  /** 颜色 */
  color: string;
  /** 方位 */
  direction: string;
  /** 神兽 */
  shenshou: string;
  /** 数字 */
  number: number[];
  /** 含义 */
  mean: string;
  /** 口诀 */
  koujue: string;
}

const guaXiang: IGuaXiang[] = [
  {
    name: '大安',
    status: '身不动时',
    wuxing: '木',
    color: '青',
    direction: '东',
    shenshou: '青龙',
    number: [1, 5, 7],
    mean: '静止、心安、吉祥之意',
    koujue: '大安事事昌，求谋在东方，失物去不远，宅舍保平安，行人身未动，病者主无妨，将军回田野，仔细更推详',
  },
  {
    name: '留连',
    status: '人未归时',
    wuxing: '水',
    color: '黑',
    direction: '北',
    shenshou: '玄武',
    number: [2, 8, 10],
    mean: '暗昧不明、延迟、纠缠、拖延、漫长之意',
    koujue: '留连事难成，求谋日未明，官事凡宜缓，去者未回程,失物南方见，急讨方心称，更须防口舌，人口且平平',
  },
  {
    name: '速喜',
    status: '人即至时',
    wuxing: '火',
    color: '红',
    direction: '南',
    shenshou: '朱雀',
    number: [3, 6, 9],
    mean: '快速、吉利、时机已到之意',
    koujue: '速喜喜来临，求财向南行，失物申未午，逢人路上寻,官事有福德，病者无祸侵，田宅六畜吉，行人有信音',
  },
  {
    name: '赤口',
    status: '官事凶时',
    wuxing: '金',
    color: '白',
    direction: '西',
    shenshou: '白虎',
    number: [4, 7, 10],
    mean: '不吉、惊恐、凶险、口舌是非之意',
    koujue: '赤口主口舌，官非切宜防，失物急去寻，行人有惊慌，鸡犬多作怪，病者出西方，更须防咀咒，诚恐染瘟皇',
  },
  {
    name: '小吉',
    status: '人来喜时',
    wuxing: '木',
    color: '绿',
    direction: '东',
    shenshou: '六合',
    number: [1, 5, 7],
    mean: '和合、吉利之意',
    koujue: '小吉最吉昌，路上好商量，阴人来报喜，失物在坤方(西南),行人即便至，交易甚是强，凡事皆和合，病者祈上苍',
  },
  {
    name: '空亡',
    status: '音信稀时',
    wuxing: '土',
    color: '黄',
    direction: '中央',
    shenshou: '勾陈',
    number: [3, 6, 9],
    mean: '不吉、无果之意',
    koujue: '空亡事不祥，阴人多乖张，求财无利益，行人有灾殃,失物寻一见，官事有刑伤，病人逢暗鬼，祈解保安康',
  },
];
const shichens = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

function divination(a: number, b: number, c: number) {
  return (a + b + c - 2 - 1) % 6;
}

function timeToShichen(hour: number) {
  // 计算时辰索引 (每个时辰2小时)
  const index = Math.floor((hour + 1) / 2) % 12;

  // 返回对应的时辰
  return {
    shichen: shichens[index],
    num: index + 1,
  };
}

export interface DivinationResult {
  solar: string;
  lunar: string;
  result: IGuaXiang;
}

// 时间起局
export const timeStart = (date: Date): DivinationResult => {
  const hours = date.getHours();
  const lunar = calendar.solar2lunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const shichen = timeToShichen(hours);
  const tag = divination(lunar.lMonth, lunar.lDay, shichen.num);
  const result = guaXiang[tag];

  return {
    solar: `${lunar.cYear}年${lunar.cMonth}月${lunar.cDay}日${hours}时`,
    lunar: `${lunar.IMonthCn}${lunar.IDayCn}${shichen.shichen}时`,
    result: result,
  };
};

// 当前时间起局
export const currentTimeStart = () => timeStart(new Date());

// 指定数字起局
export const numberStart = (a: number, b: number, c: number) => {
  const tag = divination(a, b, c);
  const result = guaXiang[tag];
  return {
    number: [a, b, c],
    result: result,
  };
};
