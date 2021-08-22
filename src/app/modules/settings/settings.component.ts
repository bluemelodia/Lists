import { Component, OnInit } from '@angular/core';
import { HeaderLevel } from '../../types/header.types';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  headerLevel = HeaderLevel;

  constructor() { }

  ngOnInit(): void {
  }
}
