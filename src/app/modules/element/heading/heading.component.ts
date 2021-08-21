import { Component, Input, OnInit } from '@angular/core';
import { HeaderLevel } from '../../../types/header.types';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {
  @Input() level: HeaderLevel = HeaderLevel.H2;
  @Input() text: string;
  HeaderLevel = HeaderLevel;

  constructor() { }

  ngOnInit(): void {
  }

}
