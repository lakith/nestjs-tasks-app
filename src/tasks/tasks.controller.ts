import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.modal';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Post()
    addNewTask(
        @Body('title') title,
        @Body('description') description,
    ): Task {
        return this.tasksService.addNewTask(title, description);
    }
}
