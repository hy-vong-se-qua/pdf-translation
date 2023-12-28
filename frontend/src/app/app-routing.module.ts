import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfTranslationComponent } from './module/pdf-translation/view/pdf-translation/pdf-translation.component';

const routes: Routes = [
  {
    path: "pdf-translation",
    component: PdfTranslationComponent
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "pdf-translation"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
