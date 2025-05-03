import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { basename } from 'path';
import { generateInsertQuery } from './generateSqlInsert';

export default class PromptsUserSeeder implements Seeder {
  private readonly promptsUserSeeds: Array<{
    id: string;
    rubricId: string;
    content: { en: string; ua: string };
  }> = [
    {
      id: 'd2f6d8f7-8c4a-43d8-882b-7caa3b16ed19',
      rubricId: '44f3f8a1-6a97-4d62-a3aa-b8d7c6071be6',
      content: {
        ua: 'Напиши короткий щоденний пост про поточну фазу Місяця та її вплив на людей.',
        en: 'Write a short daily post about the current moon phase and its influence on people.',
      },
    },
    {
      id: 'd1b4c493-f229-4ae6-b4ce-55fdb8891e6d',
      rubricId: '6fd1f999-3740-4b4d-b158-6b38422614f6',
      content: {
        ua: 'Порадь, які садові або городні роботи краще виконати сьогодні згідно з місячним календарем.',
        en: 'Give advice on what gardening tasks are best to do today according to the lunar calendar.',
      },
    },
    {
      id: '55f16300-b06c-4f68-a772-90b2e7a90aa6',
      rubricId: '1b58b6fd-bd83-417c-9b7f-cd0d71a3177d',
      content: {
        ua: 'Опиши емоційний стан, який може переважати сьогодні згідно з місячною фазою.',
        en: 'Describe the emotional state that may prevail today based on the moon phase.',
      },
    },
    {
      id: '2e180265-dc2a-40f7-8ac2-bc1e0f3c5354',
      rubricId: 'c6011e40-9a97-4209-b4ce-b6eaf36915e2',
      content: {
        ua: 'Напиши образну та поетичну пораду від імені Місяця на сьогодні.',
        en: 'Write a poetic and figurative piece of advice from the Moon for today.',
      },
    },
    {
      id: '03ab5c03-11c3-4fc5-999b-9a15b3a2c2d3',
      rubricId: 'e6a25f0c-22be-48dc-b84d-3d3d86e6f68f',
      content: {
        ua: 'Опиши енергетику сьогоднішнього дня за місячним календарем.',
        en: 'Describe today’s energy based on the lunar calendar.',
      },
    },
    {
      id: '9ff3056a-e0a0-4700-b370-e24b54066fc9',
      rubricId: 'a5880cb6-d4a8-4f90-a4e7-6e9f845c58a4',
      content: {
        ua: 'Дай практичну садівничу пораду відповідно до місячного дня.',
        en: 'Give a practical gardening tip based on the lunar day.',
      },
    },
    {
      id: 'fa4d0ec2-69df-4a47-b626-9291e8b9842c',
      rubricId: '2b5f8969-e9c1-4ab6-83f2-02eab658ac0e',
      content: {
        ua: 'Поясни, як Місяць може впливати на фізичне чи емоційне здоров’я сьогодні.',
        en: 'Explain how the Moon might influence physical or emotional health today.',
      },
    },
    {
      id: '5f0b8c0d-77f2-4e40-a5b2-ecfbaf622f8c',
      rubricId: 'b0147a67-3cf8-4f3c-9616-e4ea5b2c0292',
      content: {
        ua: 'Поділись цікавим фактом про Місяць або його вплив на природу чи людину.',
        en: 'Share an interesting fact about the Moon or its influence on nature or humans.',
      },
    },
  ];

  public async run(dataSource: DataSource): Promise<void> {
    console.log(basename(__filename), ' == start writing');
    const tableName = 'prompts_user';
    const columns = ['id', 'rubric_id', 'content'];
    const sqlQueries = generateInsertQuery(tableName, columns, this.promptsUserSeeds);
    await dataSource.query(sqlQueries);
    console.log(basename(__filename), ' == end writing');
  }
}
