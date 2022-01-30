import { 
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

import { Icon } from '../../../constants/icons.constants';

@Component({
	selector: 'app-action',
	templateUrl: './action.component.html',
	styleUrls: ['./action.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionComponent {
	@Input() ariaLabel = '';
	@Input() enabled = false;
	@Input() icon: Icon;

	@Output() actionSelected = new EventEmitter<void>();

	onActionClick(): void {
		this.actionSelected.emit();
	}
}
