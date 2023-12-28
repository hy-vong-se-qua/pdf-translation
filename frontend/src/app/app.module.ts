import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PdfTranslationModule } from './module/pdf-translation/pdf-translation.module';
import { Decorator } from './shared/decorator/decorator';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PdfTranslationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    Decorator.injector = injector;
  }
}
