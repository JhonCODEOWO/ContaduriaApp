import { AbstractControl, FormArray, FormGroup, FormGroupName, ValidationErrors } from '@angular/forms';

export class FormUtils {
  //Expresiones regulares
  static namePattern = '^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+( [a-zA-ZáéíóúÁÉÍÓÚñÑ]+)+$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getFormError(formGroup: FormGroup): string{
    const errors = formGroup.errors ?? {};
      for(const key of Object.keys(errors)){
        switch(key){
          case 'passwordsNotEqual':
            return 'Las contraseñas no coinciden';

          case 'exception':
            return 'Ha ocurrido un problema no controlado, comunícate con el desarrollador'
          default: 
            return 'No se ha controlado el error';
        } 
      }
    return '';
  }

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
          if (patternData === FormUtils.namePattern) {
            return 'Introduce un nombre con apellido(s)en este campo sin dejar espacios vacíos.'
          }
          return 'Error de patrón contra expresión regular, no se ha controlado la respuesta aún ' + patternData;

        case 'emailTaken':
          return 'El correo electrónico ya ha sido utilizado por lo que no puede utilizarse.';

        case 'notStrider':
          return 'No se permite el uso de strider';
        
         case 'maxlength':
          return `La longitud no debe exceder los ${errors['maxlength'].requiredLength} caracteres`;

        case 'isNotValidUUID':
          return 'El elemento seleccionado es inválido';

        case 'isValidDate':
          return 'No puedes colocar una fecha menor a la actual.';

        default:
          console.log(errors);
          return `Error sin formato en FormUtils: ${key}`
      }
    }

    return null;
  }

  //Returns true if the field contains errors and has touched
  static isValidField(fieldName: string, form: FormGroup): boolean | null {
    const control = form.controls[fieldName];
    return control.errors && control.touched;
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
      console.log(field1Value, field2Value);

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
