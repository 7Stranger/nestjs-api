import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
// import { Observable, catchError, lastValueFrom, map, of } from 'rxjs';
import configs from 'src/configs';
import OpenAI from 'openai';
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources';

const GPT_API_KEY = configs.providers.gpt.apiKey;
const GPT_PROJECT_ID = configs.providers.gpt.projectId;
const GPT_MODEL = 'gpt-3.5-turbo';

@Injectable()
export class GptService {
  constructor(private readonly httpService: HttpService) {}

  private openai = new OpenAI({
    apiKey: GPT_API_KEY,
    project: GPT_PROJECT_ID,
  });

  public async getPost(prompts: any): Promise<any> {
    const systemPrompt = {
      role: prompts.system.role,
      content: prompts.system.content,
    };
    const userPrompt = {
      role: prompts.user.role,
      content: prompts.user.content,
    };
    const messages = [systemPrompt, userPrompt];
    const aiResponse = await this.getAiResponse(messages);
    return `${prompts.rubric.rubricTitle}
    
${aiResponse}`;
  }

  private async getAiResponse(messages: Array<ChatCompletionMessageParam>): Promise<any> {
    const response: ChatCompletion = await this.openai.chat.completions.create({
      messages,
      model: GPT_MODEL,
    });
    const res = response.choices[0].message.content;
    return res;
  }

  // async listModels(): Promise<any> {
  //   const models = await this.openai.models.list();
  //   models.data.forEach((model) => {
  //     console.log(model.id);
  //   });
  // }
}
