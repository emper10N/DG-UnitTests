import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CommonModule,
  isPlatformBrowser,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    NgTemplateOutlet,
    NgIf,
    CommonModule,
    MonacoEditorModule,
  ],
  templateUrl: 'code-editor.component.html',
  styleUrl: 'style/code-editor.main.scss',
})
export class CodeEditorComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadMonacoEditor();
    }
  }

  loadMonacoEditor() {
    const editorElement = document.getElementById('editor');

    if (editorElement) {
      import('monaco-editor').then((monaco) => {
        monaco.editor.defineTheme('myCustomTheme', {
          base: 'vs',
          inherit: true,
          rules: [
            { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
            { token: 'comment.css', foreground: '0000ff' }, // will inherit fontStyle from `comment` above
          ],
          colors: {
            'editor.background': '#5FA0C6',
          },
        });
        monaco.editor.create(editorElement, {
          value: 'function hello() {\n\tconsole.log("Hello, world!");\n}',
          language: 'python',
          theme: 'myCustomTheme',
        });
      });
    } else {
      console.error('Element with id "editor" not found');
    }
  }
}
