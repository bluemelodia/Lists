import { Component, Input, OnInit } from '@angular/core';

import { AddBirthday } from '../../../../types/birthday/birthday.types';
import { HeaderLevel } from '../../../../types/header.types';

@Component({
  selector: 'task-birthdays-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() list: AddBirthday[];

  headerLevel = HeaderLevel;

  constructor() { }

  ngOnInit(): void {
  }

}
