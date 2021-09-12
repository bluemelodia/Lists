import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavModule } from './modules/nav/nav.module';

import { DialogComponent } from './components/dialog/dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ElementModule } from './modules/element/element.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: true,
			// Register the ServiceWorker as soon as the app is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000'
		}),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
