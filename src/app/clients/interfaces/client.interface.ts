import { User } from "../../users/interfaces/user.interface";

export interface Client {
    id:           string;
    fullName:     string;
    sat_password: string;
    rfc:          string;
    phoneNumber:  string;
    active:       boolean;
    createdAt:    Date;
    updatedAt:    Date;
    created_by: User;
}
