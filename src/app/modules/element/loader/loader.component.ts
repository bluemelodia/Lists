import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  @Input() fullScreen = false;

  @HostBinding('class') public get hostClasses() {
  	const hostStyles = [];

  	if (this.fullScreen) {
  		hostStyles.push("full-screen");
  	}

  	return hostStyles.join(" ");
  } 

  constructor() { }

  ngOnInit(): void {
  }

}
