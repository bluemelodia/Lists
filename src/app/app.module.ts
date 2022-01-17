import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NavModule } from "./modules/nav/nav.module";

import { DialogComponent } from "./components/dialog/dialog.component";
import { LoginComponent } from "./components/login/login.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { RegisterComponent } from "./components/register/register.component";

import { ElementModule } from "./modules/element/element.module";

@NgModule({
	declarations: [
		AppComponent,
		DialogComponent,
		FooterComponent,
		HeaderComponent,
		LoginComponent,
		RegisterComponent,
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		CommonModule,
		AppRoutingModule,
		HttpClientModule,
		ElementModule,
		NavModule,
		ReactiveFormsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
