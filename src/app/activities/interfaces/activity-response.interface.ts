import { Activity } from "./activity.interface";

export interface ActivityResponse {
    data: Activity[],
    pages: number,
    items: number,
    limit: number,
}