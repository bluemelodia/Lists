import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyComponent } from './family.component';
import { FamilyRoutingModule } from './family-routing.module';

@NgModule({
  declarations: [
    FamilyComponent,
  ],
  imports: [
    CommonModule,
    FamilyRoutingModule,
  ],
  exports: [
    FamilyComponent,
  ]
})
export class FamilyModule { }
