import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [
    RouterOutlet,
    NgTemplateOutlet,
    NgIf,
    FormsModule,
    MonacoEditorModule,
  ],
  templateUrl: 'code-editor.component.html',
  styleUrls: ['style/code-editor.main.scss'],
})
export class CodeEditorComponent implements OnChanges {
  @Input()
  public language!: string;

  public code: string = '';

  @Output()
  public editorInitialized = new EventEmitter<void>();
  editorOptions: any;

  constructor() {
    if (this.language === undefined) this.language = 'c';
    this.editorOptions = {
      theme: 'vs-dark',
      language: this.language.toLowerCase(),
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.editorOptions = {
      theme: 'vs-dark',
      language: this.language.toLowerCase(),
    };
  }

  getValue(): void {
    console.log(this.code);
  }
}
