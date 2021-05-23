import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu/menu.component';
import { TopicComponent } from './topic/topic.component';
import { TopicsComponent } from './topics/topics.component';

@NgModule({
  declarations: [
    MenuComponent,
    TopicComponent,
    TopicsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TopicsComponent
  ]
})
export class TopicModule { }
