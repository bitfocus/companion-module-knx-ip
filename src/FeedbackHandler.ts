import {CompanionFeedbackEvent, CompanionFeedbacks} from '../../../instance_skel_types'
import {rgb} from './Color'
import {DPT_FEEDBACK_FIELDS, GROUP_ADDR_FIELD} from './Fields'
import {LogFunction} from './LogFunction'
import {Connection} from './Connection'
import {getDpt, getDptSubtype} from './fields/DPT'

interface FeedbackOptions {
	group_addr: string
	data_type: string
}

export class FeedbackHandler {
	constructor(
		private readonly log: LogFunction,
		private readonly connection: Connection,
		private readonly allFeedbackGetter: () => CompanionFeedbackEvent[]
	) {
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

	private handle(feedback: CompanionFeedbackEvent): boolean {
		this.updateWatches()

		const group_addr = feedback.options['group_addr'] as string
		const data_type = feedback.options['data_type'] as string
		if (group_addr == '' || data_type == '') {
			return false;
		}

		console.log('feedback.options', feedback.options)

		const data_subtype = feedback.options['data_subtype_' + data_type] as string
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

		const raw_value = this.connection.getLastValue(group_addr)

		const dpt = getDpt(data_type)
		const subtype = getDptSubtype(dpt, data_subtype)
		const feedback_value = dpt.feedbackFn(raw_value, feedback_fields, extra_fields, dpt, subtype)

		this.log('info', '⬅ check feedback ' + JSON.stringify({
			'group_addr': group_addr,
			'data_type': data_type + '.' + data_subtype,
			'raw_value': raw_value,
			'extra_fields': extra_fields,
			'feedback_value': feedback_value
		}, null, 2))
		return feedback_value

	}

	updateWatches() {
		let feedbackOptions = this.allFeedbackGetter()
			.map(feedback => feedback.options as any as FeedbackOptions)
			.filter(options => options.group_addr != '' && options.data_type != '')

		this.log('debug', '🎩 initializing feedback ' + JSON.stringify(
			feedbackOptions.map(options => options.group_addr)
		))
		feedbackOptions.forEach(options => {
			this.connection.getOrCreateDpt(options.group_addr, options.data_type)
		})
	}
}
