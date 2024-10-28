import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { ValidatorsHandlerComponent } from '../../../validators-handler/validators-handler.component';
import { InputControlComponent } from '../../input-control/input-control.component';
import { AuthService } from '../../../services/auth/auth.service';
import { IUser } from '../../../interfaces/user.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IRequest } from '../../../interfaces/request.interface';

@Component({
  selector: 'app-login',
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
  templateUrl: 'user-login.component.html',
  styleUrl: 'styles/login.main.scss',
})
export class UserLoginComponent {
  registerForm!: FormGroup;
  user!: IUser;
  private _destroyRef: DestroyRef = inject(DestroyRef);
  private _router: Router = inject(Router);

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
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
      .login(this.user)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((res: IRequest) => {
        this._authService.setToken(res.accessToken);
        this._authService.currentUserSig.set(res);
        this._router.navigateByUrl('/');
      });
  }

  onReset() {
    this.registerForm.reset();
  }
}
