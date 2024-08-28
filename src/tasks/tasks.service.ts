import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Task 1 description',
      status: TaskStatus.OPEN,
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Task 2 description',
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Task 3 description',
      status: TaskStatus.DONE,
    },
  ];

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }
}
