import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { Utilities } from './utility/utilities';
import { ApiService } from './service/api.service';
import { LoadingComponent } from './ui/loading/loading.component';
import { NgxLoadingModule } from "ngx-loading";
import { LoadingService } from './service/loading.service';
import { BackdropComponent } from './ui/backdrop/backdrop.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  providers: [Utilities, ApiService, LoadingService],
  declarations: [
    SidebarComponent,
    LoadingComponent,
    BackdropComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    NgxLoadingModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  exports: [
    SidebarComponent,
    BackdropComponent,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ]
})
export class SharedModule { }
