import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as monaco from 'monaco-editor';
import { TransportResponseService } from '../../services/transport-response/transport-response.service';

@Component({
  selector: 'app-text-highlighter',
  standalone: true,
  templateUrl: './text-highlighter.component.html',
  styleUrls: ['./text-highlighter.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class TextHighlighterComponent implements OnInit {
  editor: monaco.editor.IStandaloneCodeEditor | undefined;
  public message!: string;
  @Output()
  public editorInitialized = new EventEmitter<void>();

  constructor(private transportResponse: TransportResponseService) {}
  ngOnInit() {
    this.transportResponse.currentRes.subscribe((message) => {
      this.message = message;
    });
    this.initEditor();
  }

  initEditor() {
    monaco.editor.defineTheme('my-dark', {
      base: 'vs', 
      inherit: true,
      rules: [],
      colors: {
        "editor.background": '#CDC6C6'
      }
    });
    this.message = this.message
      .replace('```', '')
      .replace('python', '')
      .replace('```', '');
    this.editor = monaco.editor.create(document.getElementById('editor')!, {
      value: this.message,
      language: 'python',
      theme: 'my-dark',
      automaticLayout: true,
    });

    this.editor.onDidChangeModelContent(() => {
      this.code = this.editor!.getValue();
    });
  }

  code: string = '';
  buttonPosition = { top: '0px', left: '0px' };
  public getCode(): string | undefined {
    return this.editor!.getModel()?.getValueInRange(
      this.editor?.getSelection() as monaco.IRange
    );
  }

  selectedText: string | undefined = '';
  showButton: boolean = false;

  getSelectedText(event: MouseEvent) {
    this.setButtonPosition(event);
    const selection: string | undefined = this.getCode();
    if (selection!.length > 0) {
      this.selectedText = selection;
      this.showButton = this.selectedText!.length > 0;
    } else {
      this.selectedText = '';
      this.showButton = false;
    }
  }

  getInfo() {
    console.log(
      this.editor!.getModel()?.getValueInRange(
        this.editor?.getSelection() as monaco.IRange
      )
    );
  }

  setButtonPosition(event: MouseEvent) {
    this.buttonPosition.top = `${event.clientY}px`;
    this.buttonPosition.left = `${event.clientX}px`;
  }
}
