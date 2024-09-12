import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { CustomValidators } from '../../../services/custom-validator/custom-validator.component';
import { ValidatorsHandlerComponent } from '../../../validators-handler/validators-handler.component';
import { InputControlComponent } from '../../input-control/input-control.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    NgTemplateOutlet,
    NgIf,
    CommonModule,
    ValidatorsHandlerComponent,
    InputControlComponent,
  ],
  templateUrl: 'user-register.component.html',
})
export class UserRegisterComponent {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.emailValidator]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ],
      ],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    alert(
      'SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4)
    );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
