import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.modal';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTaskFilterDTO } from './dto/get-tast-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(@Query() filterDTO: GetTaskFilterDTO): Task[] {
        if(Object.keys(filterDTO).length) {
            return this.tasksService.getTasksWithFilters(filterDto);
        }
        return this.tasksService.getAllTasks();
    }

    @Get('/get-task-by-id/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    addNewTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.addNewTask(createTaskDto);
    }

    @Patch(':id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body() updateTaskDTO: UpdateTaskDTO,
    ): Task {
        return this.tasksService.updateTask(id, updateTaskDTO)
    }


    @Delete('delete-task-by-id/:id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }
}
