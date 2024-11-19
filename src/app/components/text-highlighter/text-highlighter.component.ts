import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HighlightAndShowButtonDirective } from '../../directives/highlight-and-show-button.directive';
import * as monaco from 'monaco-editor';
import { error } from 'console';

@Component({
  selector: 'app-text-highlighter',
  standalone: true,
  templateUrl: './text-highlighter.component.html',
  styleUrls: ['./text-highlighter.component.scss'],
  imports: [CommonModule, FormsModule, HighlightAndShowButtonDirective],
})
export class TextHighlighterComponent implements OnInit {
  editor: monaco.editor.IStandaloneCodeEditor | undefined;
  ngOnInit() {
    this.initEditor();
  }

  initEditor() {
    monaco.editor.defineTheme('myCustomTheme', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#697277',
      },
    });

    this.editor = monaco.editor.create(document.getElementById('editor')!, {
      value: this.code,
      language: 'python',
      theme: 'myCustomTheme',
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