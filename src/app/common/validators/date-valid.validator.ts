import { AbstractControl, ValidationErrors } from "@angular/forms";

/* Check if a date is valid using a date bigger or actual but not less */
export function isValidDate(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    const actual = new Date();
    date.setHours(0, 0, 0, 0);
    actual.setHours(0, 0, 0, 0);
    
    return !(date >= actual) ? { isValidDate: false} : null;
}