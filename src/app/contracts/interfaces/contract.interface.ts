import { Client } from "../../clients/interfaces/client.interface";
import { TaxObligation } from "../../taxes/interfaces/tax-obligation.interface";

export interface Contract {
    id:             string;
    total_amount:   string;
    createdAt:      Date;
    active:         boolean;
    contractedBy:   Client;
    taxObligations: TaxObligation[];
}
