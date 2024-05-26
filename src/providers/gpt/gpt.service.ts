import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, catchError, lastValueFrom, map, of } from 'rxjs';
import configs from 'src/configs';
import OpenAI from 'openai';

interface IGptResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: [
    {
      message: {
        role: string;
        content: string;
      };
      logprobs: null;
      finish_reason: string;
      index: number;
    },
  ];
}

const GPT_URL = 'https://api.openai.com/v1/chat/completions';
const GPT_API_KEY = configs.providers.gpt.apiKey;

@Injectable()
export class GptService {
  constructor(private readonly httpService: HttpService) {}

  openai = new OpenAI({
    apiKey: GPT_API_KEY,
    project: 'proj_yiVjo8UY5lVLxCwWD1FjpLXW',
  });

  async main(): Promise<any> {
    const response = await this.openai.completions
      .create({
        prompt: 'Say this is a test',
        model: 'gpt-3.5-turbo',
      })
      .asResponse();
    console.log(`response headers: `, Object.fromEntries(response.headers.entries()));
    console.log(`response json: `, await response.json());
  }

  public getGptResponse(content: string): Observable<string> {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GPT_API_KEY}`,
    };

    const data = {
      model: 'gpt-3.5-turbo-instruct',
      prompt: 'Say this is a test',
      max_tokens: 7,
      temperature: 0,
    };

    return this.httpService.post<IGptResponse>(GPT_URL, data, { headers }).pipe(
      map(({ data }) => data.choices[0].message.content.trim()),
      catchError((err) => {
        console.log('ERROR!!!!!!!!!!!!!!!!!!! ', err);
        return of(err);
      }),
    );
  }

  async getUsage() {
    const apiKey = GPT_API_KEY;
    const url = 'https://api.openai.com/v1/dashboard/billing/usage';

    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }),
      );
      return response;
    } catch (error) {
      console.error('Error fetching usage data:', error);
    }
  }
}
