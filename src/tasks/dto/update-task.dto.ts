import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.modal";

export class UpdateTaskDTO {

    @IsEnum(TaskStatus)
    status: TaskStatus
}