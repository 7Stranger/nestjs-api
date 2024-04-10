import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private delay = (interval: number) =>
    new Promise((resolve) => setTimeout(resolve, interval));

  public async getRequestIndex(requestIndex: number): Promise<number> {
    console.log(requestIndex);
    const randDelay = Math.floor(Math.random() * 1000) + 1;

    // await this.delay(randDelay);

    return requestIndex;
  }
}
