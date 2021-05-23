import { 
  Component, 
  Input, 
  OnInit 
} from '@angular/core';

import { Topic } from '../interfaces/topic.interface';
import { TopicUtils } from '../utils/topic.utils';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  @Input() set topic(topic: Topic) {
    console.log("pass in topic: ", topic);
    this.imagePath = TopicUtils.imageForTopic(topic);
  }
  public imagePath: string;

  constructor() { }

  ngOnInit(): void {
  }
}
