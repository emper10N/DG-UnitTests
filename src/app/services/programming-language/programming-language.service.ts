import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgrammingLanguageService {
  public language!: string;

  constructor() {}

  public setLanguage(language: string) {
    this.language = language;
  }

  public getFrameworks(language: string): Array<string> {
    if (language === 'python') return ['PyTest', 'Unittest'];
    if (language === 'cpp') return ['GTest', 'Boost.Test'];
    if (language === 'java') return ['JBehave', 'JUnit'];
    return [];
  }
}
