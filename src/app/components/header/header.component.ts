import {
  Component,
  ComponentRef,
  inject,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    NgTemplateOutlet,
    NgIf,
    CommonModule,
  ],
  templateUrl: 'header.component.html',
  styleUrl: 'style/header.main.scss',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  public async openRegister() {
    await this.router.navigate(['/registration']);
  }

  public async openLogin(): Promise<void> {
    await this.router.navigate(['/login']);
  }

  public async openMain(): Promise<void> {
    await this.router.navigate(['/home']);
  }
}
