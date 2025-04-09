import { User } from "../../users/interfaces/user.interface";
import { Client } from "./client.interface";

export interface ClientRelated {
    id?:        string; //Opcional porque proviene del backend
    relatedAt?: Date; //Opcional porque proviene del backend
    client:    Client;
    user?: User; //Opcional porque no siempre se recibe en las peticiones
}
