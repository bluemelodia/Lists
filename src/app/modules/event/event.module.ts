import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ElementModule } from '../element/element.module';
import { FormModule } from '../form/form.module';
import { DirectiveModule } from '../../directives/directives.module';

import { AddEventComponent } from './add-event/add-event.component';
import { EventComponent } from './event.component';

@NgModule({
  declarations: [
    AddEventComponent,
    EventComponent
  ],
  imports: [
    CommonModule,
    DirectiveModule,
    ElementModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AddEventComponent,
    EventComponent
  ]
})
export class EventModule { }