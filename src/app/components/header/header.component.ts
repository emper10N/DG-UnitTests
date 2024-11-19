import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgTemplateOutlet,
    NgIf,
    CommonModule,
    FormsModule,
  ],
  templateUrl: 'header.component.html',
  styleUrl: 'style/header.main.scss',
})
export class HeaderComponent {
  public authService: AuthService = inject(AuthService);
  public http: HttpClient = inject(HttpClient);
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
