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
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth/auth.service';

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
  http = inject(HttpClient);
  private _destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {}

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
    const user = {
      id: '1123',
      username: 'aboba',
      email: 'd@ff.com',
      password: 'porno',
      token: 'iaushguhg',
    };
    this.httpClient
      .post<any>('http://localhost:3000/users/', user)
      .subscribe((res: any) => {
        if (res.result) {
          alert('ez');
        } else {
          alert(res.message);
        }
      });
  }

  onReset() {
    this.registerForm.reset();
  }
}
