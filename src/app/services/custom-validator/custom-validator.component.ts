import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  public static emailValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const email = control.value;
    const validEmailPattern: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!validEmailPattern.test(email)) {
      return { emailValidator: true };
    }

    return null;
  }

  public static dateValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const date = control.value;
    const validDatePattern: RegExp = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD

    if (!validDatePattern.test(date)) {
      return { dateValidator: true };
    }

    return null;
  }
}
