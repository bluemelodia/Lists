import { Component, Input, OnInit } from '@angular/core';
import { topics } from '../constants/topics.constants';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  /**
   * TODO: fetch topics from a service, and concat onto default topics list.
   */
  @Input() topicsList = topics;

  constructor() { }

  ngOnInit(): void {
  }

}
