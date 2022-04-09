import {CompanionFeedbackEvent, CompanionFeedbacks} from '../../../instance_skel_types'
import {rgb} from './Color'
import {DPT_FEEDBACK_FIELDS, GROUP_ADDR_FIELD} from './Fields'
import {LogFunction} from './LogFunction'

export class FeedbackHandler {
	constructor(private readonly log: LogFunction) {
	}

	getFeedbackDefinitions(): CompanionFeedbacks {
		return {
			recv: {
				type: 'boolean',
				label: 'Telegram received on Group Address',
				description: 'When a Telegram is Received on the given Group Address',
				style: {
					// The default style change for a boolean feedback
					// The user will be able to customise these values as well as the fields that will be changed
					color: rgb(0, 0, 0),
					bgcolor: rgb(255, 255, 255)
				},
				options: [
					GROUP_ADDR_FIELD,
					...DPT_FEEDBACK_FIELDS,
				],
				callback: (feedback: CompanionFeedbackEvent) => this.handle(feedback),
			}
		}
	}

	private handle(feedback: CompanionFeedbackEvent) {
		this.log('info', 'ℹ️ checkFeedback ' + JSON.stringify(feedback, null, 2))
		return false
	}
}
