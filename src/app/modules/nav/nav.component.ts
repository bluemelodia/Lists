import { Component, HostBinding, OnInit, ɵPlayState } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavService } from "../../services/nav.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  public showMenu = false;

  private ngUnsubscribe$ = new Subject<void>();
  private onMenuChange$ = this.nav.onMenuChange$;

  @HostBinding('class.open') public open: Boolean = false;

  constructor(private nav: NavService) {
    this.onMenuChange$
      .pipe(
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe((menuState: boolean) => {
        this.setMenuOpen(menuState);
      });
  }

  public toggleMenu() {
    this.showMenu = !this.showMenu;
    this.open = this.showMenu;
  }

  public setMenuOpen(state: boolean) {
    this.showMenu = state;
    this.open = this.showMenu;
  }
}
