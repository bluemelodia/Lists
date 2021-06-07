import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { navInfoForType, SectionType } from '../types/section.types';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private router: Router) { }

  navigateToSection(section: SectionType) {
    this.router.navigateByUrl(this.createURL(section));
  }

  private createURL(section: SectionType): string {
    const sectionInfo = navInfoForType(section);
    let paramList = [];
    let params = '';
    if (sectionInfo.routeParams) {
      for (const [key, value] of Object.entries(sectionInfo.routeParams)) {
        paramList.push(`${key}=${value}`);
      }

      if (paramList.length > 0) {
        params = `?${paramList.join('&')}`;
      }
    }
    return '/' + sectionInfo.route + params;
  }
}
