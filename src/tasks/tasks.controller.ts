import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @Version('1')
  getAllTasks(): ReturnType<typeof this.tasksService.getAllTasks> {
    return this.tasksService.getAllTasks();
  }

  @Post()
  @Version('1')
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): ReturnType<typeof this.tasksService.createTask> {
    return this.tasksService.createTask(title, description);
  }
}
