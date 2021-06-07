import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() name: string;
  @Input() set checked(isChecked: boolean) {
    this.isChecked = isChecked;
  }
  public isChecked: boolean = false;

  @Output() onToggleCheck = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleChecked(event): void {
    this.onToggleCheck.emit(event.target.checked);
  }
}
