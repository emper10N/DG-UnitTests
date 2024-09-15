import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserAuthorizationComponent } from './components/authorization/authorization.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './services/api/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserAuthorizationComponent, HttpClientModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'UnitTest';
}
