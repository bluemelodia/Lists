import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DirectiveModule } from '../../directives/directives.module';
import { ElementModule } from '../element/element.module';
import { EventRoutingModule } from './event-routing.module';
import { FormModule } from '../form/form.module';
import { ImageModule } from '../image/image.module';

import { AddBirthdayComponent } from './birthday/add-birthday/add.component';

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
    ImageModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddBirthdayComponent,
  ]
})
export class AddEventModule { }