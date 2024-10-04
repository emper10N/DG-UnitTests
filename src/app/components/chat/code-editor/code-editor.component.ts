import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import * as monaco from 'monaco-editor';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    NgTemplateOutlet,
    NgIf,
    CommonModule,
  ],
  templateUrl: 'code-editor.component.html',
  styleUrl: 'style/code-editor.main.scss',
})
export class CodeEditorComponent implements OnInit {
  editor: monaco.editor.IStandaloneCodeEditor | undefined;
  code: string = '// Write your code here\nconsole.log("Hello, World!");';

  ngOnInit() {
    this.initEditor();
  }

  initEditor() {
    this.editor = monaco.editor.create(document.getElementById('code-area')!, {
      value: this.code,
      language: 'csharp',
      automaticLayout: true,
      rulers: [],
    });

    this.editor.onDidChangeModelContent(() => {
      this.code = this.editor!.getValue();
    });
  }
}
