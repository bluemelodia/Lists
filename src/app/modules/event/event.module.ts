import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ElementModule } from '../element/element.module';
import { EventRoutingModule } from './event-routing.module';
import { FormModule } from '../form/form.module';
import { DirectiveModule } from '../../directives/directives.module';

import { AddBirthdayComponent } from './add-birthday/add-birthday.component';

@NgModule({
  declarations: [
    AddBirthdayComponent,
  ],
  imports: [
    CommonModule,
    DirectiveModule,
    ElementModule,
    EventRoutingModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AddBirthdayComponent,
  ]
})
export class AddEventModule { }