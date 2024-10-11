import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filters.dto';
import { TaskEntity } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
    const { status, search } = filterDto;

    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    if (status && search) {
      query
        .where('task.status = :status', { status })
        .andWhere(
          'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
          { search: `%${search}%` },
        );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.taskRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatusById(
    id: string,
    status: TaskStatus,
  ): Promise<TaskEntity> {
    const task = await this.getTaskById(id);

    task.status = status;

    const updatedTask = await this.taskRepository.save(task);

    return updatedTask;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const { title, description } = createTaskDto;

    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.taskRepository.save(task);

    return task;
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    const found = await this.taskRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }
}
