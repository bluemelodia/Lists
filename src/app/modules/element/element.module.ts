import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { NoResultsComponent } from './no-results/no-results.component';

@NgModule({
    declarations: [
        HeaderComponent,
        LoaderComponent,
        NoResultsComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HeaderComponent,
        LoaderComponent,
        NoResultsComponent
    ]
})
export class ElementModule {}