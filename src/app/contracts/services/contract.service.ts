import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, switchMap } from 'rxjs';
import { Contract } from '../interfaces/contract.interface';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  route = `${environment.API_URL}/contracts`;
  contractTax_route = `${environment.API_URL}/contract-tax`;
  httpClient = inject(HttpClient);

  getAll(limit: number = 5, offset: number = 0): Observable<Contract[]>{
    return this.httpClient.get<Contract[]>(`${this.route}`);
  }

  create(contract: Partial<Contract>): Observable<Contract>{
    return this.httpClient.post<Contract>(`${this.route}`, contract);
  }

  createTaxObligation(contractId: string, taxObligationIds: string[]): Observable<Contract>{
    return this.httpClient.post<Contract>(`${this.contractTax_route}`, {contractId, taxObligationIds});
  }

  createContractWithObligations(contract: Partial<Contract>, taxObligationIds: string[]){
    return this.create(contract).pipe(
      switchMap(contract => this.createTaxObligation(contract.id, taxObligationIds))
    )
  }

  get(contractId: string): Observable<Contract>{
    return this.httpClient.get<Contract>(`${this.route}/${contractId}`);
  }

  updateContract(contractId: string, dataToUpdate: Partial<Contract>): Observable<Contract>{
    return this.httpClient.patch<Contract>(`${this.route}/${contractId}`, dataToUpdate);
  }

  updateContractAndObligations(contractId: string, dataToUpdate: Partial<Contract>,taxObligationIds: string[]): Observable<Contract>{
    return this.updateContract(contractId, dataToUpdate).pipe(
      switchMap(contractUpdated => this.updateObligations(contractUpdated.id, taxObligationIds))
    )
  }

  updateObligations(contractId: string, taxObligationIds: string[]): Observable<Contract>{
    return this.httpClient.patch<Contract>(`${this.contractTax_route}/${contractId}`, {taxObligationIds});
  }

  delete(contractId: string): Observable<boolean>{
    return this.httpClient.delete<boolean>(`${this.route}/${contractId}`);
  }
}
