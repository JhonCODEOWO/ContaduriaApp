import { Role } from "../../roles/interfaces/role.interface";

export interface User {
    id:           string;
    name:         string;
    lastName:     string;
    email:        string;
    active:       boolean;
    phone_number: string;
    roles: Role[];
    createdAt:    Date;
    updatedAt:    Date;
     /** Contraseña del usuario (opcional, solo se utiliza en peticiones de cliente  a servidor) */
    password?: string;
}
