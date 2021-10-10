import { 
	MeetingAction,
	MeetingConfig,
	MeetingFormSubmitActions,
} from "../interfaces/meeting.interface";

export class MeetingUtils {
	public static createMeetingFormConfig(action: MeetingAction): MeetingConfig {
		const config: MeetingConfig = {
			action: action,
			buttonAction: MeetingFormSubmitActions[action]
		};

		return config;
	}
}