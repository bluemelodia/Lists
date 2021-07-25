import { Component, Input, OnInit } from '@angular/core';
import { BirthdayService } from 'src/app/services/birthday.service';

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

  constructor(private birthdayService: BirthdayService) { }

  ngOnInit(): void {
  }

  deleteBirthday(uuid: string) {
    this.birthdayService.deleteBirthday(uuid).subscribe();
  }
}
