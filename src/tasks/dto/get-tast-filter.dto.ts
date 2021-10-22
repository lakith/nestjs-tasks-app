import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task.modal";

export class GetTaskFilterDTO {

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;

    @IsString()
    @IsOptional()
    search?: string;
}