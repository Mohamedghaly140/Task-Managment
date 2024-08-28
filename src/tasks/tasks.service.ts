import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks: string[] = ['test', 'test2'];

  getAllTasks(): string[] {
    return this.tasks;
  }
}
