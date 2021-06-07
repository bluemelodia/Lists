import { Component, Input, OnInit } from '@angular/core';
import { HeaderLevel } from '../../../types/header.types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() level: HeaderLevel = HeaderLevel.H2;
  @Input() text: string;
  HeaderLevel = HeaderLevel;

  constructor() { }

  ngOnInit(): void {
  }

}
