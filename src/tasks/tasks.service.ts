import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.modal';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { GetTaskFilterDTO } from './dto/get-tast-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        const task = this.tasks.find(task => task.id === id);
        if(!task) {
            throw new NotFoundException();
        }
        return task;
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

    updateTask(id:string ,updateTaskDTO: UpdateTaskDTO): Task {
        const found = this.getTaskById(id);
        found.status = updateTaskDTO.status
        return found;
    }

    deleteTask(id: string): void {
        const found = this.getTaskById(id);
        this.tasks.filter(task => task.id === found.id);
    }

    getTasksWithFilters(filterDto: GetTaskFilterDTO): Task[] {
        const { status, search } = filterDto;
    
        let tasks = this.getAllTasks();
    
        // do something with status
        if (status) {
          tasks = tasks.filter((task) => task.status === status);
        }
    
        if (search) {
          tasks = tasks.filter((task) => {
            if (task.title.includes(search) || task.description.includes(search)) {
              return true;
            }
    
            return false;
          });
        }
    
        return tasks;
      }
}
