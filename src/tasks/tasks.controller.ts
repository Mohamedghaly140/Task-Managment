import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): ReturnType<typeof this.tasksService.getAllTasks> {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): ReturnType<typeof this.tasksService.createTask> {
    return this.tasksService.createTask(title, description);
  }
}
