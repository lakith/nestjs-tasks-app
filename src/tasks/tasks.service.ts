import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.modal';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    addNewTask(createTaskDto: CreateTaskDto): Task {
        const {title, description} = createTaskDto; // object destructuring

        const task: Task = {
            id: uuid(),
            title, // same as title:title                        /****** In ES6 object litaral syntax is enhanced in this way
            description, // same as description:description       *****/
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string): Task[] {
        return this.tasks.filter(task => task.id === id);
    }
}
