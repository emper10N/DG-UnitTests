import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { ChoseComponent } from '../chose/chose.component';
import { ProgrammingLanguageService } from '../../../services/programming-language/programming-language.service';
import { HttpClient } from '@angular/common/http';
import {
  IChat,
  IChatId,
  IContent,
  IMessage,
} from '../../../interfaces/request.interface';
import { TransportCodeService } from '../../../services/transport-code/transport-code.service';
import { tap } from 'rxjs';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { TransportResponseService } from '../../../services/transport-response/transport-response.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-chat-init',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CodeEditorComponent,
    ChoseComponent,
    CommonModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: 'chat-init.component.html',
  styleUrl: 'style/chat-init.main.scss',
})
export class ChatInitComponent implements OnInit {
  public selectedLanguage: string | undefined;
  private _api: string = 'http://localhost:5001/api/v1/chats';
  private _apiMessage: string = 'http://localhost:5001/api/v1/messages';
  public id!: string;
  isLoading = false;
  public code!: string;
  public choseLanguage: ProgrammingLanguageService = inject(
    ProgrammingLanguageService
  );
  public authService: AuthService = inject(AuthService);

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private transportCode: TransportCodeService,
    private transportResponse: TransportResponseService
  ) {}
  ngOnInit(): void {
    this.transportCode.currentCode.subscribe((message) => {
      this.code = message;
    });
  }

  public onLanguageChange(language: string): void {
    this.selectedLanguage = language;
  }

  public getFrameworks(): string[] {
    return this.selectedLanguage
      ? this.choseLanguage.getFrameworks(this.selectedLanguage)
      : [];
  }

  public sendMessage() {
    const chat: IChat = {
      name: this.selectedLanguage!,
    };

    this.httpClient.post<IChatId>(this._api, chat).subscribe((res: IChatId) => {
      this.id = res.chatId;
    });

    const message: IMessage = {
      model: this.selectedLanguage!,
      chatId: this.id,
      message: `Write unit tests for the following function. Make sure that:
      1. The tests fully correspond to the function's logic and behavior.
      2. There is nothing in the tests that does not stem from the function's code.
      3. Correct data, incorrect data, edge cases, and exceptional situations are covered.
      
      Function code:
      ${this.code}
      
      Requirements:
      - Language: ${this.selectedLanguage}.
      - Testing framework: ${this.getFrameworks()}.
      The answer should contain only valid test code without comments or explanations,
      but don't import this function and don't generate code of this function in answer also write code only without comments.
      ;`,
    };
    this.isLoading = true;
    this.httpClient
      .post<IContent>(this._apiMessage, message)
      .pipe(
        tap((res: IContent) => {
          this.continueWorkAfterResponse(res.content);
        })
      )
      .subscribe(
        () => {},
        (error) => {
          console.error('Ошибка при отправке сообщения:', error);
        }
      );
  }

  public async continueWorkAfterResponse(res: string) {
    this.transportResponse.changeCode(res);
    this.isLoading = false;
    await this.router.navigate(['/response']);
  }
}
