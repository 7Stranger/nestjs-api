import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/providers/db/db.service';

interface IMoonPhase {
  id: string;
  name: string;
  dayFrom: number;
  dayTo: number;
  dayFeature: string;
  description: string;
  moonDay: number;
}

@Injectable()
export class MoonService {
  constructor(private readonly dbService: DatabaseService) {}

  public async getMoonPhase(): Promise<IMoonPhase> {
    const moonAgeInDays: number = this.getMoonAge(new Date().toString());

    const [{ moonPhase }] = await this.dbService.query(`SELECT * FROM get_moon_phase_by_age($1) AS "moonPhase"`, [
      moonAgeInDays,
    ]);

    return { ...moonPhase, moonDay: moonAgeInDays.toFixed(1) };
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
