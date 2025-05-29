import { User } from "./user.interface";

export interface UserResponse {
    data: User[],
    items: number,
    limit: string,
    offset: string,
}

export interface GetAllResponse<T> {
    data: T[],
    items: number,
    limit: string,
    offset: string,
}