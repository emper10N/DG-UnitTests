import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { UserLoginComponent } from '../user-login/user-login.component';
@Component({
  selector: 'app-authorization-buttons',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    UserRegisterComponent,
    UserLoginComponent,
    NgTemplateOutlet,
  ],
  templateUrl: 'authorization-buttons.component.html',
})
export class AuthorizationButtonsComponent {
  protected registerButton: string = 'sign up';
  protected logButton: string = 'log in';

  @Output() loginEvent = new EventEmitter<void>();
  @Output() signupEvent = new EventEmitter<void>();
}
