import { AsyncValidatorFn, ValidationErrors, Validator, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

export class CustomValidators {
  static oneOf(...values: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null;
      }

      if (values.indexOf(control.value) < 0) {
        return { oneOf: { values, actual: control.value } };
      }

      return null;
    };
  }
}
