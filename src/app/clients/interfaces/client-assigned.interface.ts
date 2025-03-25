import { Client } from "./client.interface";

export interface ClientRelated {
    id:        string;
    relatedAt: Date;
    client:    Client;
}
