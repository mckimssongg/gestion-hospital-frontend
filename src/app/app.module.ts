import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

//donde estan todos los modulos de angular material
import { SharedModule } from './modules/shared/shared.module';

//INICIAR SECIÓN
import { LoginComponent } from './modules/login/login.component';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    SharedModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
