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
import { CodeEditorComponent } from '../code-editor/code-editor.component';

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
  ],
  templateUrl: 'chat-init.component.html',
  styleUrl: 'style/chat-init.main.scss',
})
export class ChatInitComponent {}
