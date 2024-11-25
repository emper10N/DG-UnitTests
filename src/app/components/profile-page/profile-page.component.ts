import { Component, inject, NgModule } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { ApiService } from '../../services/api/api.service';
import { UserManagementService } from '../../services/user-management-service/user-management.service';
import { Observable, Subscription } from 'rxjs';
import { IChat, IUserInfo } from '../../interfaces/request.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgTemplateOutlet,
    NgIf,
    CommonModule,
    FormsModule,
  ],
  templateUrl: 'profile-page.component.html',
  styleUrl: 'style/profile-page.main.scss',
})
export class ProfilePageComponent {
  public userData: UserManagementService = inject(UserManagementService);
  private _userUrl: string = `http://localhost:5001/api/v1/users/${
    this.userData.getUserData()?.userId
  }`;

  private _userChatsUrl: string = `http://localhost:5001/api/v1/chats`;

  public chats!: any[];

  constructor(private httpClient: HttpClient) {
    this.getChatsInfo();
  }

  public getUserInfo(): Subscription {
    return this.httpClient.get<any>(this._userUrl).subscribe((res) => {
      console.log(res);
    });
  }
  public getChatsInfo(): Subscription {
    return this.httpClient.get<any>(this._userChatsUrl).subscribe((res) => {
      this.chats = res.chats;
      console.log(res);
    });
  }
}
