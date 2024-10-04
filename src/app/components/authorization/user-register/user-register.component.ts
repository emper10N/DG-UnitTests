import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { CustomValidators } from '../../../services/custom-validator/custom-validator.service';
import { ValidatorsHandlerComponent } from '../../../validators-handler/validators-handler.component';
import { InputControlComponent } from '../../input-control/input-control.component';
import { AuthService } from '../../../services/auth/auth.service';
import { IUser } from '../../../interfaces/user.interface';
import { IRequest } from '../../../interfaces/request.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class UserRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  user!: IUser;
  private _authService: AuthService = inject(AuthService);
  private _destroyRef: DestroyRef = inject(DestroyRef);

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

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.user = {
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
    };
    this._authService
      .register(this.user)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((res: IRequest) => {
        this._authService.setToken(res.accessToken);
      });
  }

  onReset() {
    this.registerForm.reset();
  }
}
