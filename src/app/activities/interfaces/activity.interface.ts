import { Client } from "../../clients/interfaces/client.interface";
import { User } from "../../users/interfaces/user.interface";

export interface Activity {
    id:         string;
    status:     boolean;
    createdAt:  Date;
    limitDate:  Date;
    details:    string;
    client:     Client;
    appliesTo:  User;
    assignedBy: User;
}
