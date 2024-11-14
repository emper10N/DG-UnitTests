import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { ChoseComponent } from '../chose/chose.component';
import { ProgrammingLanguageService } from '../../../services/programming-language/programming-language.service';
import { TextHighlighterComponent } from '../../text-highlighter/text-highlighter.component';

@Component({
  selector: 'app-response-init',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    NgTemplateOutlet,
    NgIf,
    CommonModule,
    CodeEditorComponent,
    ChoseComponent,
    CommonModule,
    TextHighlighterComponent,
  ],
  templateUrl: 'response.component.html',
  styleUrl: 'style/response.main.scss',
})
export class ResponseComponent {
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

  public getFrameworks(): string[] {
    return this.selectedLanguage
      ? this.choseLanguage.getFrameworks(this.selectedLanguage)
      : [];
  }
}
