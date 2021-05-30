import { Component, OnInit } from '@angular/core';
import { MENU } from '../constants/nav.constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public menuItems = MENU;

  constructor() { }

  ngOnInit(): void {
  }
}
