import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CallLogManagerModule } from './call-log-manager.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CallLogManagerModule
  ],
  declarations: [AppComponent],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {}
