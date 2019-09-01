import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.modal';
import * as uuid from 'uuid/v1';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    addNewTask(title: string, description: string): Task {
        const task: Task = {
            id: uuid(),
            title, // same as title:title                        /****** In ES6 object litaral syntax is enhanced in this way
            description, // same as description:description       *****/
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }
}
