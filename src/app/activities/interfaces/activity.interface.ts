import { Client } from "../../clients/interfaces/client.interface";
import { User } from "../../users/interfaces/user.interface";

export interface Activity {
    id:         string;
    status:     boolean;
    createdAt:  string;
    limitDate:  string;
    details:    string;
    client:     Client;
    appliesTo:  User;
    assignedBy: User;
}
