import { User } from "../../users/interfaces/user.interface";
import { ClientRelated } from "./client-assigned.interface";

export interface Client {
    id:           string;
    fullName:     string;
    sat_password: string;
    rfc:          string;
    phoneNumber:  string;
    active:       boolean;
    createdAt:    Date;
    updatedAt:    Date;
    created_by?: User; //En algunas respuestas viene el usuario que genero al cliente
    clientUser?: ClientRelated[]; //En algunas respuestas viene incluido el clientUser
}
