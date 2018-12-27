import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { SharedModule } from './../shared/shared.module';
import { TemplateFormComponent } from './template-form.component';
// import { FormDebugComponent } from '../form-debug/form-debug.component';
// import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    SharedModule
  ],
  declarations: [
    TemplateFormComponent,
    // FormDebugComponent,
    // CampoControlErroComponent
  ]
})
export class TemplateFormModule { }
