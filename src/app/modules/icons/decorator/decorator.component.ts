import { Component, Input } from '@angular/core';

import { Icon } from '../../../constants/icons.constants';

/** 
* Use for decorative icons that are not expected to be interactive.
*/
@Component({
	selector: 'app-decorator',
	templateUrl: './decorator.component.html',
	styleUrls: ['./decorator.component.css']
})
export class DecoratorComponent {
	@Input() ariaLabel = '';
	@Input() icon: Icon;
	@Input() iconClasses = '';
}
