import { ISqlRaisedError } from '../interfaces/sql_raised_error.interface';

export function getSqlRaisedError(err: any): ISqlRaisedError {
  return JSON.parse(err.driverError.toString().split('error: ')[1]);
}
