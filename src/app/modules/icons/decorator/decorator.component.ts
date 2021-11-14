import { Component, Input, OnInit } from '@angular/core';
import { Icon } from 'src/app/constants/actions.constants';

/** 
* Use for decorative icons that are not expected to be interactive.
*/
@Component({
	selector: 'app-decorator',
	templateUrl: './decorator.component.html',
	styleUrls: ['./decorator.component.css']
})
export class DecoratorComponent implements OnInit {
	@Input() ariaLabel = '';
	@Input() icon: Icon;

	constructor() { }

	ngOnInit(): void {
	}
}
