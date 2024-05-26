import { Injectable } from '@nestjs/common';
import { TelegramService } from 'src/providers/telegram/telegram.service';

interface IMoonPhase {
  id: string;
  name: { en: string; ua: string };
  dayFrom: number;
  dayTo: number;
  dayFeature: { en: string; ua: string };
  description: string;
}

const MOON_PHASES: Array<IMoonPhase> = [
  {
    id: 'f4a11eb9-fe5d-4a4b-ae9d-912efc2558db',
    name: { en: 'New moon', ua: 'Молодий місяць' },
    dayFrom: 0,
    dayTo: 1,
    dayFeature: { en: 'Neutral day', ua: 'Нейтральний день' },
    description:
      'Перша фаза місячного циклу; настає на початку звернення Місяця орбітою. Місяць знаходиться між Землею та Сонцем, тому сторона Місяця, що знаходиться в тіні, звернена до Землі. Вона виглядає абсолютно темною, зазвичай невидимою неозброєним оком.',
  },
  {
    id: 'fcf08857-c079-4232-879b-34cac4c34f98',
    name: { en: 'Growing sickle', ua: 'Зростаючий серп' },
    dayFrom: 1,
    dayTo: 7,
    dayFeature: { en: 'Favorable day', ua: 'Сприятливий день' },
    description:
      'Друга фаза місячного циклу; настає між молодим чоловіком і першою чвертю. Зростання фази означають збільшення освітленості Місяця, тому на початку цієї фази Місяць має форму тонкого півмісяця, а потім освітлена область поступово збільшується поки не настає фаза першої чверті.',
  },
  {
    id: '172238af-4f9f-42ce-9ffa-f44026dab2ff',
    name: { en: 'First quarter', ua: 'Перша чверть' },
    dayFrom: 7,
    dayTo: 8,
    dayFeature: { en: 'Favorable day', ua: 'Сприятливий день' },
    description:
      'Третя фаза місячного циклу; настає, коли Місяць проходить чверть шляху своєю орбітою. При спостереженні із Землі Місяць розташовується під прямим кутом по відношенню до Сонця. Вона виглядає наполовину освітленою і помітна на вечірньому небі.',
  },
  {
    id: '6dc8d009-020d-4b81-9f69-7862d069728a',
    name: { en: 'Waxing Crescent', ua: 'Зростаючий місяць' },
    dayFrom: 8,
    dayTo: 14,
    dayFeature: { en: 'Favorable day', ua: 'Сприятливий день' },
    description:
      'Четверта фаза місячного циклу; настає між першою чвертю і повним місяцем. Зростаюча фаза являє собою збільшення освітленості Місяця, тому на початку цієї фази Місяць виглядає наполовину освітленим, а потім освітлена область поступово збільшується доки не настає повний місяць.',
  },
  {
    id: 'fa945aae-6e41-43e1-a929-905c6726dc7f',
    name: { en: 'Full moon', ua: 'Повний місяць' },
    dayFrom: 14,
    dayTo: 15,
    dayFeature: { en: 'Neutral day', ua: 'Нейтральний день' },
    description: `П'ята фаза місячного циклу; настає, коли Місяць проходить половину своєї орбіти. Місяць і Сонце розташовані по різні боки Землі, тому вся сторона Місяця, звернена до Землі, освітлена. На нічному небі Місяць виглядає як яскравий круглий диск і видно всю ніч.`,
  },
  {
    id: 'accf91eb-144f-489d-acd7-6ac92fd1fcfe',
    name: { en: 'Waning moon', ua: 'Спадаючий місяць' },
    dayFrom: 15,
    dayTo: 22,
    dayFeature: { en: 'Unfavorable day', ua: 'Несприятливий день' },
    description:
      'Шоста фаза місячного циклу; настає між повним місяцем і фазою останньої чверті. Зменшувальні фази означають зменшення освітленості Місяця, тому на початку цієї фази ми бачимо майже повністю освітлений місячний диск, а потім освітлена область поступово зменшується, поки не настає фаза останньої чверті.',
  },
  {
    id: '8847d467-94d8-4c6b-b173-b8407efad202',
    name: { en: 'Last quarter', ua: 'Остання чверть' },
    dayFrom: 22,
    dayTo: 23,
    dayFeature: { en: 'Unfavorable day', ua: 'Несприятливий день' },
    description:
      'Сьома фаза місячного циклу; настає, коли Місяць проходить три чверті своєї орбіти. При спостереженні із Землі Місяць розташовується під прямим кутом по відношенню до Сонця. Вона виглядає наполовину освітленою і помітна на вечірньому небі.',
  },
  {
    id: 'ebf59d11-5d31-44e7-abbd-2dec85663285',
    name: { en: 'Waning crescent', ua: 'Спадаючий серп' },
    dayFrom: 23,
    dayTo: 30,
    dayFeature: { en: 'Unfavorable day', ua: 'Несприятливий день' },
    description:
      'Восьма та остання фаза місячного циклу; настає між фазою останньої чверті і молодим місяцем. Зменшуючі фази означає зменшення освітленості Місяця, тому на початку цієї фази ми бачимо половину місячного диска майже повністю освітленої, а потім освітлена область поступово зменшується доки не настає молодик.',
  },
];

@Injectable()
export class MoonService {
  constructor(private readonly telegramService: TelegramService) {}

  public getMoonPhase(): IMoonPhase {
    const moonAgeInDays: number = this.getMoonAge(new Date().toString());

    for (const moonPhase of MOON_PHASES) {
      if (moonAgeInDays > moonPhase.dayFrom && moonAgeInDays < moonPhase.dayTo) {
        return moonPhase;
      }
    }
  }

  public getMoonAge(date: string): number {
    // https://nextfullmoon.org/ru/%D1%84%D0%B0%D0%B7%D0%B0-%D0%BB%D1%83%D0%BD%D1%8B-%D1%81%D0%B5%D0%B3%D0%BE%D0%B4%D0%BD%D1%8F
    // https://planetcalc.ru/524/
    const zeroMoonPhaseDate = '2000-01-06T14:24:00';
    const moonMonthInDays = 29.530588853;

    const zeroMoonPhase = Date.parse(zeroMoonPhaseDate);
    const currentDate = new Date(date);
    const currentDateAtMidnight = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0,
    );
    const currentDateAtMidnightTimestamp = currentDateAtMidnight.getTime();

    const deltaDays = (currentDateAtMidnightTimestamp - zeroMoonPhase) / 1000 / 60 / 60 / 24;
    const moonAgeInDays = deltaDays % moonMonthInDays;

    return moonAgeInDays;
  }
}
