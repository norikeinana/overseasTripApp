import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {JsonpModule } from '@angular/http';

import {HttpService} from "./http.service";
import { AppComponent } from './app.component';
import { DetailComponent } from './detail/detail.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    Ng2BootstrapModule.forRoot()
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
