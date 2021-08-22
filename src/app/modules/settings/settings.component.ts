import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { HeaderLevel } from '../../types/header.types';
import { Channel } from './types/settings.types';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  channel = Channel;
  headerLevel = HeaderLevel;
  settingsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    		/* Set the controls for the form. */
		this.settingsForm = this.fb.group({
			channels: this.fb.group({
				[Channel.email]: this.fb.control(false),
				[Channel.text]: this.fb.control(false),
				[Channel.notification]: this.fb.control(false),
			}),
		},
		{ 
			updateOn: 'submit'
		});
  }
}
