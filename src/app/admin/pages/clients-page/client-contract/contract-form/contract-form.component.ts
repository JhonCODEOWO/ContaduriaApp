import { Component, inject, input, OnInit, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../../../utils/form-utils';
import { isUUIDValidator } from '../../../../../common/validators/uuid.validator';
import { InputFieldComponent } from '../../../../../common/components/input-field/input-field.component';
import { SelectComponent } from '../../../../../common/components/select/select.component';
import { Client } from '../../../../../clients/interfaces/client.interface';
import { ClientsService } from '../../../../../clients/services/clients.service';
import { SelectData } from '../../../../../common/components/select/interfaces/select-data.interface';
import { TaxesService } from '../../../../../taxes/services/taxes.service';
import { TaxRegime } from '../../../../../taxes/interfaces/tax-regime.interface';
import { RegimeDataComponent } from '../../../taxes-page/regime-data/regime-data.component';
import { ObligationElementComponent } from '../../../../../taxes/components/obligation-element/obligation-element.component';
import { TaxObligation } from '../../../../../taxes/interfaces/tax-obligation.interface';
import { Contract } from '../../../../../contracts/interfaces/contract.interface';
import { ContractService } from '../../../../../contracts/services/contract.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contract-form',
  imports: [
    ReactiveFormsModule,
    InputFieldComponent,
    SelectComponent,
    ObligationElementComponent,
  ],
  templateUrl: './contract-form.component.html',
})
export class ContractFormComponent implements OnInit {
  fb = inject(FormBuilder);
  taxService = inject(TaxesService);
  clientService = inject(ClientsService);
  contractService = inject(ContractService);
  formUtils = FormUtils;

  clientDataSelect = input.required<SelectData[]>(); //Data to show in the select Input
  taxObligations = signal<TaxObligation[] | null>(null); //Tax regimes data to select in the form
  clientPreselected = input(false); //Manage if the form initializes the select with just one client selected

  actualContractID =
    inject(ActivatedRoute).snapshot.paramMap.get('idContract') ?? 'new'; //Get the id in the url use it to implement create or update actions

  //Reactive form data
  contractForm = this.fb.group({
    total_amount: ['', [Validators.required, Validators.min(1)]],
    active: [false],
    contractedBy: ['', [Validators.required, isUUIDValidator]],
    taxObligations: this.fb.array<FormControl<string>>(
      [],
      [Validators.required]
    ),
  });

  ngOnInit(): void {
    //Apply the default value if clientPreselected true
    if (this.clientPreselected())
      this.contractForm
        .get('contractedBy')
        ?.setValue(this.clientDataSelect()[0].id.toString()); //Set just the first value initial to the contractedBy control

    this.taxService
      .getTaxObligations()
      .subscribe((regimes) => this.taxObligations.set(regimes));

    //Checks if the resource to manage is new or is a update
    if (this.actualContractID != 'new') {
      this.contractService
        .get(this.actualContractID)
        .subscribe((contract) => this.loadForm(contract));
    }
  }

  //Return the form array from the form
  get getObligations() {
    return this.contractForm.get('taxObligations') as FormArray<FormControl<string>>;
  }

  //Sets data to the form using the contract given
  loadForm(contract: Contract) {
    this.contractForm.reset({
      active: contract.active,
      total_amount: contract.total_amount,
      contractedBy: contract.contractedBy.id,
    });
    this.setFormObligations(contract.taxObligations.map(ob => ob.id));
  }

  //Set controls to the  obligations FormArray
  setFormObligations(data: string[]){
    const formArrayData = this.getObligations;
    const formControls = data.map(ob => this.fb.nonNullable.control(ob, isUUIDValidator));
    formArrayData.clear();
    formControls.forEach(control => formArrayData.push(control));
  }

  //Handle submit event from Reactive form...
  onSubmit() {
    this.contractForm.markAllAsTouched(); //Mark all as touched
    console.log(this.contractForm.value);
    if (this.contractForm.invalid) return; //If the form is invalid...

    //Manage data to send
    const { taxObligations = [], ...contractData } = this.contractForm.value; //Get taxObligations and date separately
    const contract: Partial<Contract> = {
      ...(contractData as any),
    };

    //Manage actions in each case of create or edit...
    if (this.actualContractID === 'new'){
      this.contractService
        .createContractWithObligations(contract, taxObligations)
        .subscribe((data) => console.log(data));
    }

    this.contractService.updateContractAndObligations(this.actualContractID, contract, taxObligations).subscribe(contract => console.log(contract));
  }

  //Handle the event from component of TaxObligation
  handleChecked(idObligation: string) {
    this.getObligations.push(this.fb.nonNullable.control(idObligation, isUUIDValidator));
  }

  //Handle not checked from component TaxObligation
  handleNotChecked(idObligation: string) {
    //Find index of controls inside of array
    const idInArrayControls = this.getObligations.controls.findIndex(
      (control) => control.value === idObligation
    );
    this.getObligations.removeAt(idInArrayControls); //Delete the control of the array
  }
}
