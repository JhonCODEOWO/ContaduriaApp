import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { isUUID } from "validator";

/** A UUID validated with standars  */
export function isUUIDValidator(control: AbstractControl): ValidationErrors | null{
    //V
    return isUUID(control.value) ? null : {isNotValidUUID: true}
}
