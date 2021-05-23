import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from './topic/topic.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [
    TopicComponent,
    MenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopicComponent
  ]
})
export class TopicModule { }
