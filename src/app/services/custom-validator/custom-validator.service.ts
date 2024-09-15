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

  public static passwordValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.value;
    let hasNumber = /\d/.test(password);
    let hasUpper = /[A-Z]/.test(password);
    let hasLower = /[a-z]/.test(password);
    const valid = hasNumber && hasUpper && hasLower;
    console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
    if (!valid) {
      return { strong: true };
    }
    return null;
  }
}
