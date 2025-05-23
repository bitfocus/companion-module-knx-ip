import { SomeCompanionConfigField } from '@companion-module/base'

export const CONFIG_FIELDS: SomeCompanionConfigField[] = [
	{
		type: 'static-text',
		id: 'info',
		label: 'Information',
		width: 12,
		value: 'This module connects to a KNX IP Gateway or Router',
	},
	{
		type: 'textinput',
		id: 'ipAddr',
		label: 'IP Address of Gateway or Router',

		width: 12,
	},
]

export interface Config {
	ipAddr?: string
}
