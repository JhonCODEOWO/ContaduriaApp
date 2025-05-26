import { User } from "./user.interface";

export interface UserResponse {
    data: User[],
    items: number,
    limit: string,
    offset: string,
}