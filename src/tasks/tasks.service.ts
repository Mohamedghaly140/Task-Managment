import { Injectable } from '@nestjs/common';
import { TaskModel, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filters.dto';

@Injectable()
export class TasksService {
  private tasks: TaskModel[] = [];

  getAllTasks(): TaskModel[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): TaskModel[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): TaskModel {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatusById(id: string, status: TaskStatus): TaskModel {
    const task = this.getTaskById(id);
    const index = this.tasks.findIndex((task) => task.id === id);
    task.status = status;
    this.tasks[index].status = status;
    return task;
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
