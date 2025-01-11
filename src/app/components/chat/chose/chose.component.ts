import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';
import { ProgrammingLanguageService } from '../../../services/programming-language/programming-language.service';

@Component({
  selector: 'app-chose',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  providers: [ProgrammingLanguageService],
  templateUrl: 'chose.component.html',
  styleUrl: 'style/chose.main.scss',
})
export class ChoseComponent {
  @Input()
  public name!: string;
  @Input()
  public data!: Array<string>;
  @Input()
  public title!: String;
  @Input() styleClass: string = '';

  public selectedItem: string | undefined;

  @Output() selectedChange = new EventEmitter<string>();

  public onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedItem = selectElement.value;
    if (this.name === 'язык') this.selectedChange.emit(this.selectedItem);
    if (this.name === 'фреймворк') this.selectedChange.emit(this.selectedItem);
    console.log(`Выбранный ${this.name}:`, this.selectedItem);
  }
}
