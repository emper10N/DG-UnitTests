import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { ChoseComponent } from '../chose/chose.component';

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
  textArea!: any;
  autogrow() {
    this.textArea = document.getElementById('textarea');
    this.textArea.style.height = '54px';
    this.textArea.style.height = this.textArea.scrollHeight + 'px';
  }
}
