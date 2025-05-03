import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { basename } from 'path';
import { generateInsertQuery } from './generateSqlInsert';

export default class RubricsSeeder implements Seeder {
  private readonly rubricsSeeds: Array<{
    id: string;
    title: { en: string; ua: string };
    emoji: string;
    description: { en: string; ua: string };
  }> = [
    {
      id: '44f3f8a1-6a97-4d62-a3aa-b8d7c6071be6',
      title: { ua: 'Фаза Місяця сьогодні', en: 'Today’s Moon Phase' },
      emoji: '🌕',
      description: {
        ua: 'Пост про поточну фазу Місяця та її вплив',
        en: 'Post about the current moon phase and its influence',
      },
    },
    {
      id: '6fd1f999-3740-4b4d-b158-6b38422614f6',
      title: { ua: 'Місяць і рослини', en: 'Moon and Plants' },
      emoji: '🌱',
      description: {
        ua: 'Як Місяць впливає на ріст і догляд за рослинами',
        en: 'How the Moon affects plant growth and care',
      },
    },
    {
      id: '1b58b6fd-bd83-417c-9b7f-cd0d71a3177d',
      title: { ua: 'Місяць і емоції', en: 'Moon and Emotions' },
      emoji: '🧘',
      description: { ua: 'Емоційний стан у зв’язку з фазою Місяця', en: 'Emotional state based on the moon phase' },
    },
    {
      id: 'c6011e40-9a97-4209-b4ce-b6eaf36915e2',
      title: { ua: 'Порада дня від Місяця', en: 'Moon’s Advice of the Day' },
      emoji: '💫',
      description: { ua: 'Коротка порада від Місяця на день', en: 'A short daily piece of advice from the Moon' },
    },
    {
      id: 'e6a25f0c-22be-48dc-b84d-3d3d86e6f68f',
      title: { ua: 'Енергетика дня', en: 'Daily Energy Forecast' },
      emoji: '🔮',
      description: {
        ua: 'Яка енергетика дня згідно з фазою Місяця',
        en: 'The energetic forecast of the day based on the Moon',
      },
    },
    {
      id: 'a5880cb6-d4a8-4f90-a4e7-6e9f845c58a4',
      title: { ua: 'Місячний садівник', en: 'Lunar Gardener' },
      emoji: '🌸',
      description: {
        ua: 'Практичні поради для садівників відповідно до фаз Місяця',
        en: 'Gardening tips based on the lunar calendar',
      },
    },
    {
      id: '2b5f8969-e9c1-4ab6-83f2-02eab658ac0e',
      title: { ua: 'Місяць і здоров’я', en: 'Moon and Health' },
      emoji: '🩺',
      description: {
        ua: 'Вплив Місяця на самопочуття та здоров’я',
        en: 'The Moon’s influence on well-being and health',
      },
    },
    {
      id: 'b0147a67-3cf8-4f3c-9616-e4ea5b2c0292',
      title: { ua: 'Астрономічні факти', en: 'Astronomical Facts' },
      emoji: '🌌',
      description: {
        ua: 'Цікаві факти про Місяць, фази, затемнення',
        en: 'Interesting facts about the Moon, phases, and eclipses',
      },
    },
  ];

  public async run(dataSource: DataSource): Promise<void> {
    console.log(basename(__filename), ' == start writing');
    const tableName = 'rubrics';
    const columns = ['id', 'title', 'emoji', 'description'];
    const sqlQueries = generateInsertQuery(tableName, columns, this.rubricsSeeds);
    await dataSource.query(sqlQueries);
    console.log(basename(__filename), ' == end writing');
  }
}
