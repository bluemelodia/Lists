import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './action/action.component';
import { DecoratorComponent } from './decorator/decorator.component';

@NgModule({
  declarations: [
    ActionComponent,
    DecoratorComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
	  ActionComponent,
	  DecoratorComponent,
  ]
})
export class IconsModule { }
