import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): ReturnType<typeof this.tasksService.getAllTasks> {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
  ): ReturnType<typeof this.tasksService.createTask> {
    return this.tasksService.createTask(createTaskDto);
  }
}
