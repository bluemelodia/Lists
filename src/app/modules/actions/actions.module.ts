import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './action/action.component';

@NgModule({
  declarations: [
    ActionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
	  ActionComponent
  ]
})
export class ActionsModule { }
