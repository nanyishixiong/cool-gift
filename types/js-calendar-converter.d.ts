declare module 'js-calendar-converter' {
  interface CalendarConverter {
    // {
//   date: '2024-11-30',
//   lunarDate: '2024-10-30',
//   festival: null,
//   lunarFestival: null,
//   lYear: 2024,
//   lMonth: 10,
//   lDay: 30,
//   Animal: '龙',
//   IMonthCn: '十月',
//   IDayCn: '三十',
//   cYear: 2024,
//   cMonth: 11,
//   cDay: 30,
//   gzYear: '甲辰',
//   gzMonth: '乙亥',
//   gzDay: '戊戌',
//   isToday: true,
//   isLeap: false,
//   nWeek: 6,
//   ncWeek: '星期六',
//   isTerm: false,
//   Term: null,
//   astro: '射手座'
// }
    solar2lunar(yPara: string | number, mPara: string | number, dPara: string | number): {
      lYear: number;
      lMonth: number;
      lDay: number;
      animal: string;
      monthCn: string;
      dayCn: string;
      gzYear: string;
      gzMonth: string;
      gzDay: string;
      date: string;
      lunarDate: string;
      festival: string | null;
      lunarFestival: string | null;
      Animal: string;
      IMonthCn: string;
      IDayCn: string;
      cYear: number;
      cMonth: number; 
      cDay: number;
      isToday: boolean;
      isLeap: boolean;
      nWeek: number;
      ncWeek: string;
      isTerm: boolean;
      Term: string | null;
      astro: string;
    };
    lunar2solar(year: number, month: number, day: number): {
      year: number;
      month: number;
      day: number;
      date: string;
    };
  }
  
  const content: CalendarConverter;
  export default content;
} 