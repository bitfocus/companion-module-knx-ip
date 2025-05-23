import {SomeCompanionConfigField} from '@companion-module/base'

export const CONFIG_FIELDS: SomeCompanionConfigField[] = [
	{
		type: 'textinput',
		id: 'ipAddr',
		label: 'IP-Address of Gateway or Router',

		width: 12,
	},
]

export interface Config {
	ipAddr?: string
}
