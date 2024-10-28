import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { authInterceptor } from './services/auth-interceptor/auth-inteceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(MonacoEditorModule.forRoot()),
  ],
};
