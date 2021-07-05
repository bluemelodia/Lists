import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Input() message: string;

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  hideDialog() {
    this.dialogService.hideDialog();
  }
}
