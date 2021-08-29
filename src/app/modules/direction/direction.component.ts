import { Component, Input, } from '@angular/core';

@Component({
	selector: 'app-direction',
	templateUrl: './direction.component.html',
	styleUrls: ['./direction.component.css']
})
export class DirectionComponent {
  @Input() expanded = false;
}
