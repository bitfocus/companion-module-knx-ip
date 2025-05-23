import type { CompanionActionEvent } from '@companion-module/base'
import { DPT_ACTION_FIELDS, DPT_TOGGLE_ACTION_FIELDS } from './Fields'
import { getDpt, getDptSubtype } from './fields/DPT'
import { LogFunction } from './LogFunction'
import { Connection } from './Connection'
import { CompanionActionDefinitions } from '@companion-module/base/dist/module-api/action'

export class ActionHandler {
	constructor(
		private readonly log: LogFunction,
		private connection: Connection
	) {}

	getActionDefinitions(): CompanionActionDefinitions {
		return {
			send: {
				name: 'Send Telegram to Group Address',
				options: DPT_ACTION_FIELDS,
				callback: (action) => this.handle(action),
			},
			toggle: {
				name: 'Send One of Two Telegram to Group Address depending on Feedback State (Toggle)',
				options: DPT_TOGGLE_ACTION_FIELDS,
				callback: (action) => this.handleToggle(action),
			},
		}
	}

	handle(action: CompanionActionEvent): void {
		const group_addr = action.options['group_addr'] as string
		const data_type = action.options['data_type'] as string
		const data_subtype = action.options['data_subtype_' + data_type] as string
		const raw_value = action.options['value_' + data_type + '_' + data_subtype]
		const extra_fields = this.extractExtraFields(action, data_type)

		const dpt = getDpt(data_type)
		const subtype = getDptSubtype(dpt, data_subtype)
		const converted_value = dpt.valueFn(raw_value, extra_fields, dpt, subtype)

		this.log(
			'info',
			'➡️ sending ' +
				JSON.stringify(
					{
						group_addr: group_addr,
						data_type: data_type + '.' + data_subtype,
						raw_value: raw_value,
						extra_fields: extra_fields,
						converted_value: converted_value,
					},
					null,
					2
				)
		)

		if (this.connection.isConnected) {
			this.connection.getOrCreateDpt(group_addr, data_type).write(converted_value)
		}
	}

	private extractExtraFields(action: CompanionActionEvent, data_type: string) {
		return Object.keys(action.options).reduce(
			(filtered, key) => {
				const prefix = 'extra_' + data_type + '_'
				if (key.startsWith(prefix)) {
					const trimmedKey = key.substring(prefix.length)
					filtered[trimmedKey] = action.options[key]
				}
				return filtered
			},
			{} as { [key: string]: any }
		)
	}

	handleToggle(action: CompanionActionEvent): void {
		const group_addr = action.options['group_addr'] as string
		const data_type = action.options['data_type'] as string
		const data_subtype = action.options['data_subtype_' + data_type] as string
		const feedback_state = this.evaluateFeedback(action)

		const value_field = feedback_state ? 'positive' : 'negative'
		const raw_value = action.options['value_' + data_type + '_' + data_subtype + '_' + value_field]

		const extra_fields = Object.keys(action.options).reduce(
			(filtered, key) => {
				const prefix = 'extra_' + data_type + '_'
				const suffix = '_' + value_field
				if (key.startsWith(prefix) && key.endsWith(suffix)) {
					const trimmedKey = key.substring(prefix.length, key.length - suffix.length)
					filtered[trimmedKey] = action.options[key]
				}
				return filtered
			},
			{} as { [key: string]: any }
		)

		const dpt = getDpt(data_type)
		const subtype = getDptSubtype(dpt, data_subtype)
		const converted_value = dpt.valueFn(raw_value, extra_fields, dpt, subtype)

		this.log(
			'info',
			'➡️ sending toggle ' +
				JSON.stringify(
					{
						group_addr: group_addr,
						data_type: data_type + '.' + data_subtype,
						feedback_state: feedback_state,
						value_field: value_field,
						raw_value: raw_value,
						extra_fields: extra_fields,
						converted_value: converted_value,
					},
					null,
					2
				)
		)

		if (this.connection.isConnected) {
			this.connection.getOrCreateDpt(group_addr, data_type).write(converted_value)
		}
	}

	// Resolve Duplication with FeedbackHandler (pass prefixes?)
	private evaluateFeedback(action: CompanionActionEvent): boolean {
		const group_addr = action.options['feedback_group_addr'] as string
		const data_type = action.options['feedback_data_type'] as string
		const data_subtype = action.options['feedback_data_subtype_' + data_type] as string
		const extra_fields = this.extractExtraFields(action, data_type)

		const feedback_fields = Object.keys(action.options).reduce(
			(filtered, key) => {
				const prefix = 'feedback_' + data_type + '_' + data_subtype + '_'
				if (key.startsWith(prefix)) {
					const trimmedKey = key.substring(prefix.length)
					filtered[trimmedKey] = action.options[key]
				}
				return filtered
			},
			{} as { [key: string]: any }
		)

		const raw_value = this.connection.getLastValue(group_addr, data_type)

		const dpt = getDpt(data_type)
		const subtype = getDptSubtype(dpt, data_subtype)
		let feedback_value = dpt.feedbackFn(raw_value, feedback_fields, extra_fields, dpt, subtype)

		this.log(
			'info',
			'⬅ check feedback for action ' +
				JSON.stringify(
					{
						group_addr: group_addr,
						data_type: data_type + '.' + data_subtype,
						raw_value: raw_value,
						feedback_fields: feedback_fields,
						extra_fields: extra_fields,
						feedback_value: feedback_value,
					},
					null,
					2
				)
		)

		return feedback_value
	}
}
