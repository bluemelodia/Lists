import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

import { ElementModule } from '../element/element.module';

@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    ElementModule,
    SettingsRoutingModule,
  ],
  exports: [
    SettingsComponent,
  ]
})
export class SettingsModule { }