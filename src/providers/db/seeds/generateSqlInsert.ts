const snakeToCame = (snake: string): string => snake.replace(/([-_]\w)/g, (match) => match[1].toUpperCase());

export const generateInsertQuery = (tableName: string, columns: string[], data: any[]): string => {
  const columnNames = columns.map((column) => `"${column}"`).join(', ');
  const values = data
    .map(
      (item) =>
        `(${columns
          .map((column) => {
            const value = item[snakeToCame(column)];
            if (value === undefined || value === null) {
              return 'NULL';
            } else if (typeof value === 'object') {
              return `'${JSON.stringify(value)}'`;
            } else {
              return `'${value}'`;
            }
          })
          .join(', ')})`,
    )
    .join(', ');

  return `
    INSERT INTO ${tableName} (${columnNames})
    VALUES 
      ${values}
    ON CONFLICT (id) DO UPDATE
    SET ${columns
      .filter((column) => column.toLowerCase() !== 'id')
      .map((column) => `"${column}" = EXCLUDED."${column}"`)
      .join(', ')}
  `;
};
