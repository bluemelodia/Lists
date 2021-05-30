import { 
  Component, 
  Input, 
  OnInit 
} from '@angular/core';

import { Topic } from '../../../constants/topics';
import { TopicUtils } from '../utils/topic.utils';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  @Input() set topic(topic: Topic) {
    this.name = topic;
    this.imagePath = TopicUtils.imageForTopic(topic);
  }
  public name: Topic;
  public imagePath: string;

  constructor() { }

  ngOnInit(): void {
  }
}
