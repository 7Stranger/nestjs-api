import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { basename } from 'path';
import { generateInsertQuery } from './generateSqlInsert';

export default class MoonPhaseSeeder implements Seeder {
  private readonly moonPhaseSeeds: Array<{
    id: string;
    name: { en: string; ua: string };
    dayFrom: number;
    dayTo: number;
    dayFeature: { en: string; ua: string };
    description: { en: string; ua: string };
  }> = [
    {
      id: 'f4a11eb9-fe5d-4a4b-ae9d-912efc2558db',
      name: { en: 'New moon', ua: 'Молодий місяць' },
      dayFrom: 0,
      dayTo: 1,
      dayFeature: { en: 'Neutral day', ua: 'Нейтральний день' },
      description: {
        ua: 'Перша фаза місячного циклу; настає на початку звернення Місяця орбітою. Місяць знаходиться між Землею та Сонцем, тому сторона Місяця, що знаходиться в тіні, звернена до Землі. Вона виглядає абсолютно темною, зазвичай невидимою неозброєним оком',
        en: '',
      },
    },
    {
      id: 'fcf08857-c079-4232-879b-34cac4c34f98',
      name: { en: 'Growing sickle', ua: 'Зростаючий серп' },
      dayFrom: 1,
      dayTo: 7,
      dayFeature: { en: 'Favorable day', ua: 'Сприятливий день' },
      description: {
        ua: 'Друга фаза місячного циклу; настає між молодим місяцем і першою чвертю. Зростання фази означають збільшення освітленості Місяця, тому на початку цієї фази Місяць має форму тонкого півмісяця, а потім освітлена область поступово збільшується поки не настає фаза першої чверті',
        en: '',
      },
    },
    {
      id: '172238af-4f9f-42ce-9ffa-f44026dab2ff',
      name: { en: 'First quarter', ua: 'Перша чверть' },
      dayFrom: 7,
      dayTo: 8,
      dayFeature: { en: 'Favorable day', ua: 'Сприятливий день' },
      description: {
        ua: 'Третя фаза місячного циклу; настає, коли Місяць проходить чверть шляху своєю орбітою. При спостереженні із Землі Місяць розташовується під прямим кутом по відношенню до Сонця. Вона виглядає наполовину освітленою і помітна на вечірньому небі',
        en: '',
      },
    },
    {
      id: '6dc8d009-020d-4b81-9f69-7862d069728a',
      name: { en: 'Waxing Crescent', ua: 'Зростаючий місяць' },
      dayFrom: 8,
      dayTo: 14,
      dayFeature: { en: 'Favorable day', ua: 'Сприятливий день' },
      description: {
        ua: 'Четверта фаза місячного циклу; настає між першою чвертю і повним місяцем. Зростаюча фаза являє собою збільшення освітленості Місяця, тому на початку цієї фази Місяць виглядає наполовину освітленим, а потім освітлена область поступово збільшується доки не настає повний місяць',
        en: '',
      },
    },
    {
      id: 'fa945aae-6e41-43e1-a929-905c6726dc7f',
      name: { en: 'Full moon', ua: 'Повний місяць' },
      dayFrom: 14,
      dayTo: 15,
      dayFeature: { en: 'Neutral day', ua: 'Нейтральний день' },
      description: {
        ua: `П’ята фаза місячного циклу; настає, коли Місяць проходить половину своєї орбіти. Місяць і Сонце розташовані по різні боки Землі, тому вся сторона Місяця, звернена до Землі, освітлена. На нічному небі Місяць виглядає як яскравий круглий диск і видно всю ніч`,
        en: '',
      },
    },
    {
      id: 'accf91eb-144f-489d-acd7-6ac92fd1fcfe',
      name: { en: 'Waning moon', ua: 'Спадаючий місяць' },
      dayFrom: 15,
      dayTo: 22,
      dayFeature: { en: 'Unfavorable day', ua: 'Несприятливий день' },
      description: {
        ua: 'Шоста фаза місячного циклу; настає між повним місяцем і фазою останньої чверті. Зменшувальні фази означають зменшення освітленості Місяця, тому на початку цієї фази ми бачимо майже повністю освітлений місячний диск, а потім освітлена область поступово зменшується, поки не настає фаза останньої чверті',
        en: '',
      },
    },
    {
      id: '8847d467-94d8-4c6b-b173-b8407efad202',
      name: { en: 'Last quarter', ua: 'Остання чверть' },
      dayFrom: 22,
      dayTo: 23,
      dayFeature: { en: 'Unfavorable day', ua: 'Несприятливий день' },
      description: {
        ua: 'Сьома фаза місячного циклу; настає, коли Місяць проходить три чверті своєї орбіти. При спостереженні із Землі Місяць розташовується під прямим кутом по відношенню до Сонця. Він виглядає наполовину освітленим і помітний на вечірньому небі',
        en: '',
      },
    },
    {
      id: 'ebf59d11-5d31-44e7-abbd-2dec85663285',
      name: { en: 'Waning crescent', ua: 'Спадаючий серп' },
      dayFrom: 23,
      dayTo: 30,
      dayFeature: { en: 'Unfavorable day', ua: 'Несприятливий день' },
      description: {
        ua: 'Восьма та остання фаза місячного циклу; настає між фазою останньої чверті і молодим місяцем. Зменшуючі фази означає зменшення освітленості Місяця, тому на початку цієї фази ми бачимо половину місячного диска майже повністю освітленої, а потім освітлена область поступово зменшується доки не настає молодик',
        en: '',
      },
    },
  ];

  public async run(dataSource: DataSource): Promise<void> {
    console.log(basename(__filename), ' == start writing');
    const tableName = 'moon_phase';
    const columns = ['id', 'name', 'day_from', 'day_to', 'day_feature', 'description'];
    const sqlQueries = generateInsertQuery(tableName, columns, this.moonPhaseSeeds);
    await dataSource.query(sqlQueries);
    console.log(basename(__filename), ' == end writing');
  }
}
