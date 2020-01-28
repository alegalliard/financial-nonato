import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ //disponibiliza esse módulos para serem conhecidos pelos outros módulos que importarem o shared module (esse)
    //shared modules
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
