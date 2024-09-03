import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegisterComponent } from './components/authorization/user-register/user-register.component';

@NgModule({
  declarations: [AppComponent],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, UserRegisterComponent],
})
export class AppModule {}
