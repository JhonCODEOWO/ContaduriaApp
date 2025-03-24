import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  //Expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  //Métodos de apoyo para errores
  static getTextError(errors: ValidationErrors){
    for(const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'Este campo es obligatorio';
        
        case 'minlength':
          return `La longitud debe de ser de ${errors['minlength'].requiredLength}.`
        
        case 'min':
          return `Valor mínimo ${errors['min'].min}`
        
        case 'email':
          return 'Este campo debe tener un formato de correo válido.'

        case 'pattern':
          const patternData = errors['pattern'].requiredPattern;
          if(patternData === FormUtils.emailPattern) {
            return 'El correo electrónico no es permitido';
          }
          if(patternData === FormUtils.notOnlySpacesPattern) {
            return 'No se permiten espacios para este campo.';
          }
          return 'Error de patrón contra expresión regular, no se ha controlado la respuesta aún';

        case 'emailTaken':
          return 'El correo electrónico ya ha sido utilizado por lo que no puede utilizarse.';

        case 'notStrider':
          return 'No se permite el uso de strider';

        default:
          return `Error sin formato en FormUtils: ${key}`
      }
    }

    return null;
  }

  static isValidField(fieldName: string, form: FormGroup): boolean | null {
    return form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  static getFieldError(fieldName: string, form: FormGroup): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number){
    return (formArray.controls[index].errors && formArray.controls[index].touched)
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    //Si no hay elementos en el arreglo...
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};


    return FormUtils.getTextError(errors);
  }

  static isFieldOneEqualFieldTwo(field: string, field2: string){
    //formGroup: AbstractControl es el acceso al formulario en donde se utilice el validador angular lo envía automáticamente al usarlo como validador
    return (formGroup: AbstractControl) => {
      //Obtener controls del FormGroup
      const field1Value = formGroup.get(field)?.value;
      const field2Value = formGroup.get(field2)?.value;

      //Realizar operaciones para ver si se cumple la validación deseada
      return field1Value === field2Value ? null : {
        passwordsNotEqual: true
      }
    }
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null>{
    // await sleep(); // 2 Segundos para resolver

    const formValue = control.value; //Tomar valor del control a evaluar en base a su valor con la respuesta
    console.log(formValue);

    //Realizar validaciones comparando el valor del campo con un dato del lado del servidor simulando que hola@mundo.com es un correo existente en el backend
    if(formValue === 'hola@mundo.com') {
      //Error a retornar
      return {
        emailTaken: true,
      };
    }
    return null;
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (value === 'strider') {
      return {
        notStrider: true,
      }
    }

    return null;
  }
}
