import { NgModule } from '@angular/core';
import { FocusFixDirective } from './focus-fix.directive';
import { FocusDirective } from './focus.directive';

@NgModule({
	declarations: [ 
		FocusDirective,
		FocusFixDirective,
	],
	exports: [
		FocusDirective,
		FocusFixDirective,
	]
})
export class DirectiveModule {}