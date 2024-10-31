import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { ChoseComponent } from '../chose/chose.component';
import { ProgrammingLanguageService } from '../../../services/programming-language/programming-language.service';

@Component({
  selector: 'app-chat-init',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    NgTemplateOutlet,
    NgIf,
    CommonModule,
    CodeEditorComponent,
    ChoseComponent,
  ],
  templateUrl: 'chat-init.component.html',
  styleUrl: 'style/chat-init.main.scss',
})
export class ChatInitComponent {
  public selectedLanguage: string | undefined;
  public choseLanguage: ProgrammingLanguageService = inject(
    ProgrammingLanguageService
  );
  textArea!: any;
  autogrow() {
    this.textArea = document.getElementById('textarea');
    this.textArea.style.height = '54px';
    this.textArea.style.height = this.textArea.scrollHeight + 'px';
  }

  public onLanguageChange(language: string): void {
    this.selectedLanguage = language;
  }

  public getFrameworks(): string[] {
    return this.selectedLanguage
      ? this.choseLanguage.getFrameworks(this.selectedLanguage)
      : [];
  }
}
