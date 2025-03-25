import { TaxObligation } from "./tax-obligation.interface";

export interface TaxRegime {
    id:              string;
    name:            string;
    description:     string;
    createdAt:       Date;
    taxObligations: TaxObligation[];
}

