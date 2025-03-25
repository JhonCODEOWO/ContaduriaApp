export interface Client {
    id:           string;
    fullName:     string;
    sat_password: string;
    rfc:          string;
    phoneNumber:  string;
    active:       boolean;
    createdAt:    Date;
    updatedAt:    Date;
}
