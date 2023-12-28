import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './view/upload-file/upload-file.component';
import { PdfTranslationService } from './service/pdf-translation.service';
import { SharedModule } from '@app/shared/shared.module';
import { MainComponent } from './view/main/main.component';
import { PdfTranslationComponent } from './view/pdf-translation/pdf-translation.component';



@NgModule({
  providers: [PdfTranslationService],
  declarations: [
    UploadFileComponent,
    MainComponent,
    PdfTranslationComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PdfTranslationModule { }
