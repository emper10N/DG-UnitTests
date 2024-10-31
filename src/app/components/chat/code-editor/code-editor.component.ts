import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CommonModule,
  isPlatformBrowser,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';

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
  styleUrls: ['style/code-editor.main.scss'],
})
export class CodeEditorComponent implements OnChanges {
  @Input()
  public language: string | undefined;

  @Output()
  public editorInitialized = new EventEmitter<void>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.language === undefined) this.language = 'c';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.removeAndCreateEditor();
    if (isPlatformBrowser(this.platformId)) {
      this.loadMonacoEditor();
      this.editorInitialized.emit();
    }
  }

  private removeAndCreateEditor(): void {
    document.getElementById('editor')?.remove();
    const editorContainer = document.getElementById('editor-container');
    const newEditor = document.createElement('div');
    newEditor.id = 'editor';
    newEditor.style.height = '554px';
    newEditor.style.width = '1078px';
    editorContainer?.appendChild(newEditor);
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
            { token: 'comment.css', foreground: '0000ff' },
          ],
          colors: {
            'editor.background': '#5FA0C6',
          },
        });
        monaco.editor.create(editorElement, {
          value: '',
          language: this.language?.toLowerCase(),
          theme: 'myCustomTheme',
        });
      });
    } else {
      console.error('Element with id "editor" not found');
    }
  }

  getData() {
    const editorElement = document.getElementById('editor');
    console.log(editorElement?.textContent);
  }
}
