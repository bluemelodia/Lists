import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-direction',
	templateUrl: './direction.component.html',
	styleUrls: ['./direction.component.css']
})
export class DirectionComponent implements OnInit {
  @Input() expanded = false;

  constructor() { }

  ngOnInit(): void {
  }

}
