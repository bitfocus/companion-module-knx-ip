import {CompanionActions} from '../../../instance_skel_types'
import {DPT_ACTION_FIELDS, GROUP_ADDR_FIELD} from './Fields'

export const ACTIONS: CompanionActions = {
	send: {
		label: 'Send Telegram to Group Address',
		options: [
			GROUP_ADDR_FIELD,
			...DPT_ACTION_FIELDS,
		],
	}
}
