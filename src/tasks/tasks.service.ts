import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): TaskModel {
    const { title, description } = createTaskDto;

    const task: TaskModel = {
      id: crypto.randomUUID(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
