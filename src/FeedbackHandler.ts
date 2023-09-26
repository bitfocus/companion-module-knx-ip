import {DPT_FEEDBACK_FIELDS} from './Fields'
import {LogFunction} from './LogFunction'
import {Connection} from './Connection'
import {getDpt, getDptSubtype} from './fields/DPT'
import {CompanionFeedbackBooleanEvent, CompanionFeedbackDefinitions} from '@companion-module/base/dist/module-api/feedback'
import {rgb} from './Color'

export class FeedbackHandler {
	constructor(
		private readonly log: LogFunction,
		private readonly connection: Connection
	) {
	}

	getFeedbackDefinitions(): CompanionFeedbackDefinitions {
		return {
			recv: {
				type: 'boolean',
				name: 'Telegram received on Group Address',
				description: 'When a Telegram is Received on the given Group Address',
				defaultStyle: {
					// The default style change for a boolean feedback
					// The user will be able to customise these values as well as the fields that will be changed
					color: rgb(0, 0, 0),
					bgcolor: rgb(255, 255, 255)
				},
				options: DPT_FEEDBACK_FIELDS,
				callback: (feedback: CompanionFeedbackBooleanEvent) => {
					try {
						return this.handle(feedback)
					} catch (e) {
						this.log('error', `Error: ${e}`)
						return false
					}
				},
			}
		}
	}

	private handle(feedback: CompanionFeedbackBooleanEvent): boolean {
		const group_addr = feedback.options['feedback_group_addr'] as string
		const data_type = feedback.options['feedback_data_type'] as string
		if (group_addr == '' || data_type == '') {
			return false;
		}

		const data_subtype = feedback.options['feedback_data_subtype_' + data_type] as string
		const extra_fields = Object.keys(feedback.options)
			.reduce((filtered, key) => {
				const prefix = 'extra_' + data_type + '_';
				if (key.startsWith(prefix)) {
					const trimmedKey = key.substring(prefix.length)
					filtered[trimmedKey] = feedback.options[key];
				}
				return filtered
			}, {} as { [key: string]: any })

		const feedback_fields = Object.keys(feedback.options)
			.reduce((filtered, key) => {
				const prefix = 'feedback_' + data_type + '_' + data_subtype + '_';
				if (key.startsWith(prefix)) {
					const trimmedKey = key.substring(prefix.length)
					filtered[trimmedKey] = feedback.options[key];
				}
				return filtered
			}, {} as { [key: string]: any })

		this.connection.getOrCreateDpt(group_addr, data_type) // registers change-lister and reads value once
		const raw_value = this.connection.getLastValue(group_addr, data_type)

		const dpt = getDpt(data_type)
		const subtype = getDptSubtype(dpt, data_subtype)
		const feedback_value = dpt.feedbackFn(raw_value, feedback_fields, extra_fields, dpt, subtype)

		this.log('debug', '⬅ check feedback ' + JSON.stringify({
			'group_addr': group_addr,
			'data_type': data_type + '.' + data_subtype,
			'raw_value': raw_value,
			'feedback_fields': feedback_fields,
			'extra_fields': extra_fields,
			'feedback_value': feedback_value
		}, null, 2))

		return feedback_value
	}
}
