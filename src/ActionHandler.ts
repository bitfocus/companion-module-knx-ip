import {CompanionActionEvent, CompanionActions} from '../../../instance_skel_types'
import {DPT_ACTION_FIELDS, GROUP_ADDR_FIELD} from './Fields'
import {DPTs} from './fields/DPT'
import {LogFunction} from './LogFunction'

export class ActionHandler {
	constructor(private readonly log: LogFunction) {
	}

	getActionDefinitions(): CompanionActions {
		return {
			send: {
				label: 'Send Telegram to Group Address',
				options: [
					GROUP_ADDR_FIELD,
					...DPT_ACTION_FIELDS,
				],
				callback: (action) => this.handle(action),
			}
		}
	}

	handle(action: CompanionActionEvent): void {
		const group_addr = action.options['group_addr']
		const data_type = action.options['data_type']
		const data_subtype = action.options['data_subtype_' + data_type]
		const raw_value = action.options['value_' + data_type + '_' + data_subtype]
		const extra_fields = Object.keys(action.options)
			.reduce((filtered, key) => {
				const prefix = 'extra_' + data_type + '_';
				if (key.startsWith(prefix)) {
					const trimmedKey = key.substring(prefix.length)
					filtered[trimmedKey] = action.options[key];
				}
				return filtered
			}, {} as { [key: string]: any })

		const dpt = DPTs.filter(dpt => dpt.id === data_type)[0]
		const subtype = dpt.subtypes.filter(subtype => subtype.id === data_subtype)[0]
		const converted_value = dpt.valueFn(raw_value, extra_fields, dpt, subtype)

		this.log('info', '➡️ sending ' + JSON.stringify({
			'group_addr': group_addr,
			'data_type': data_type + '.' + data_subtype,
			'raw_value': raw_value,
			'extra_fields': extra_fields,
			'converted_value': converted_value
		}, null, 2))
	}
}
