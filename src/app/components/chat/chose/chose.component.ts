import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-chose',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    NgTemplateOutlet,
    NgIf,
    CommonModule,
  ],
  templateUrl: 'chose.component.html',
  styleUrl: 'style/chose.main.scss',
})
export class ChoseComponent {
  @Input()
  public data!: Array<string>;
  @Input()
  public title!: String;
  @Input() styleClass: string = '';
}
