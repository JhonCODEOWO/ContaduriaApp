import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { isNull } from "lodash";
import { isUUID } from "validator";

/** A UUID validated with standars  */
export function isUUIDValidator(control: AbstractControl): ValidationErrors | null{
    //If the value is null then returns null
    if(control.value === null) return null;
    //Validate value
    return isUUID(control.value) ? null : {isNotValidUUID: true}
}
