import { Component, Input, OnInit } from '@angular/core';
import { DateStatus } from '../../../types/date/date.types';

@Component({
  selector: 'app-date-indicator',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateIndicatorComponent implements OnInit {
  @Input() status: DateStatus;
  public dateStatus = DateStatus;

  constructor() { }

  ngOnInit(): void {
  }

}
