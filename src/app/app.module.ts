import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavModule } from './modules/nav/nav.module';

import { DialogComponent } from './components/dialog/dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ElementModule } from './modules/element/element.module';

@NgModule({
	declarations: [
		AppComponent,
		DialogComponent,
		FooterComponent,
		HeaderComponent,
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		CommonModule,
		AppRoutingModule,
		HttpClientModule,
		ElementModule,
		NavModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
