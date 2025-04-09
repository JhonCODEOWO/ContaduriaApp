import { User } from "../../users/interfaces/user.interface";
import { ClientRelated } from "./client-assigned.interface";

export interface ClientRelatedResponse {
    user: User,
    clientAssigned: ClientRelated[],
}