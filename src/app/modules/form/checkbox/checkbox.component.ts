import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() name: string;
  @Input() checkboxName: string;

  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  toggleChecked(event): void {
    console.log("toggle checked => ", this.form.get(this.checkboxName));
    this.form.get(this.checkboxName).patchValue(
      event.target.checked
    );
  }

  get checkboxValue(): void {
    return this.form.controls[this.checkboxName].value;
  }
}
