import {CompanionInputField} from '../../../instance_skel_types'

export const CONFIG_FIELDS: CompanionInputField[] = [
	{
		type: 'textinput',
		id: 'ipAddr',
		label: 'IP-Address of Gateway or Router',
	},
]

export interface Config {
	ipAddr?: string
}
