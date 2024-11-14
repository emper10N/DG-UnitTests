import { Component, ElementRef, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserAuthorizationComponent } from './components/authorization/authorization.component';
import { AuthService } from './services/auth/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { ChoseComponent } from './components/chat/chose/chose.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodeEditorComponent } from './components/chat/code-editor/code-editor.component';
import { ProgrammingLanguageService } from './services/programming-language/programming-language.service';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UserAuthorizationComponent,
    HeaderComponent,
    ChoseComponent,
    CommonModule,
    FormsModule,
    CodeEditorComponent,
    MonacoEditorModule,
    CodeEditorComponent,
  ],
  providers: [AuthService, ProgrammingLanguageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'UnitTest';
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setStyle(
      this.el.nativeElement.ownerDocument.body,
      'backgroundColor',
      'rgb(1,20,27)'
    );
  }
}
