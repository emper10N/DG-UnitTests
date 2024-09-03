import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAuthorizationComponent } from './components/authorization/authorization.component';

@NgModule({
  declarations: [AppComponent],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, UserAuthorizationComponent],
})
export class AppModule {}
