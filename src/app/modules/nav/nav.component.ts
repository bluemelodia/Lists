import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public showMenu = false;

  @HostBinding('class.open') public open: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleMenu() {
    this.showMenu = !this.showMenu;
    this.open = this.showMenu;
  }
}
