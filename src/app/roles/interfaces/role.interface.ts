import { Permission } from "./permission.interface";

export interface Role {
    id: string;
    name: string;
    description: string;
    permissions?: Permission[];
}