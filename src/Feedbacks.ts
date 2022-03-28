import {CompanionFeedbackEvent, CompanionFeedbacks} from '../../../instance_skel_types'
import {rgb} from './Color'
import {DPT_FEEDBACK_FIELDS, GROUP_ADDR_FIELD} from './Fields'

export const FEEDBACKS: CompanionFeedbacks = {
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
		callback: (feedback: CompanionFeedbackEvent) => {
			console.log('checkFeedback', feedback)
			return false
		},
	},
	// TODO advanced feedback (dimming)
}
