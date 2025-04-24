import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
// import { Observable, catchError, lastValueFrom, map, of } from 'rxjs';
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

const GPT_API_KEY = configs.providers.gpt.apiKey;
const GPT_PROJECT_ID = configs.providers.gpt.projectId;

@Injectable()
export class GptService {
  constructor(private readonly httpService: HttpService) {}

  private openai = new OpenAI({
    apiKey: GPT_API_KEY,
    project: GPT_PROJECT_ID,
  });

  public async main(): Promise<any> {
    const response = await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: 'Привет! Расскажи шутку про программистов.' }],
      model: 'gpt-4.1-nano-2025-04-14',
    });
    console.log(response.choices[0].message.content);
  }
}
