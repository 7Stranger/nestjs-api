/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { EnvironmentEnum } from './enums/environment.enum';

@Injectable()
export class CommonService {
  static basicInit(): void {
    const environment: string =
      process.env.NODE_ENV! in EnvironmentEnum ? process.env.NODE_ENV! : EnvironmentEnum.production;

    dotenv.config({
      path: path.resolve(__dirname, '..', '..', `.env.${environment}`),
    });
  }

  static generateRandomNumberSequence(length: number = 6): string {
    if (typeof length !== 'number') {
      length = 6;
    } else {
      length = parseInt(length as any);
    }

    if (length <= 0) {
      length = 6;
    }

    return Math.floor(Math.random() * 10 ** length)
      .toString()
      .padStart(length, '0');
  }

  static generateRandomString(length: number = 64): string {
    if (typeof length !== 'number') {
      length = 64;
    } else {
      length = parseInt(length as any);
    }

    if (length <= 0) {
      length = 64;
    }

    return crypto.randomBytes(length).toString('hex').slice(0, length);
  }
}
