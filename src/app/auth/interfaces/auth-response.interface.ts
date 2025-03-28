import { UserSession } from "./user-session.interface";

export interface AuthResponse {
    user: UserSession;
    token:    string;
}
