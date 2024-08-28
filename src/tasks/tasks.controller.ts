import { Controller, Get, Version } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @Version('1')
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }
}
