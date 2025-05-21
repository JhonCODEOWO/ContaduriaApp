import { Client } from "../../clients/interfaces/client.interface";
import { User } from "../../users/interfaces/user.interface";

export interface Payment {
    id: string;
    amount: number;
    createdAt: string;
    method: string;
    payedBy: Client;
    issuedBy: User;
    details: string;
}