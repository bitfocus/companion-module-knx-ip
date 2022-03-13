import {SomeCompanionInputField} from '../../../instance_skel_types'

export const DPT_SELECT_FIELD: SomeCompanionInputField = {
	type: 'dropdown',
	label: 'Data-Type',
	id: 'data_type',
	default: 'DPT1',
	choices: [
		// TODO add subtypes
		{'id': 'DPT1', 'label': 'DPT1: 1-bit control'},
		{'id': 'DPT2', 'label': 'DPT2: 1-bit control w/prio'},
		{'id': 'DPT3', 'label': 'DPT3: 4-bit dimming/blinds'},
		{'id': 'DPT4', 'label': 'DPT4: 8-bit character'},
		{'id': 'DPT5', 'label': 'DPT5: 8-bit unsigned int'},
		{'id': 'DPT6', 'label': 'DPT6: 8-bit signed int'},
		{'id': 'DPT7', 'label': 'DPT7: 16-bit unsigned int'},
		{'id': 'DPT8', 'label': 'DPT8: 16-bit signed integer'},
		{'id': 'DPT9', 'label': 'DPT9: 16-bit floating point'},
		{'id': 'DPT10', 'label': 'DPT10: 24-bit time + day of week'},
		{'id': 'DPT11', 'label': 'DPT11: 24-bit date'},
		{'id': 'DPT12', 'label': 'DPT12: 32-bit unsigned int'},
		{'id': 'DPT13', 'label': 'DPT13: 32-bit signed int'},
		{'id': 'DPT14', 'label': 'DPT14: 32-bit floating point'},
		{'id': 'DPT15', 'label': 'DPT15: 32-bit access control'},
		{'id': 'DPT16', 'label': 'DPT16: ASCII string'},
		{'id': 'DPT17', 'label': 'DPT17: Scene number'},
		{'id': 'DPT18', 'label': 'DPT18: Scene control'},
		{'id': 'DPT19', 'label': 'DPT19: 8-byte Date and Time'},
	]
}

export const GROUP_ADDR_FIELD: SomeCompanionInputField = {
	type: 'textwithvariables',
	label: 'Group Address',
	id: 'group_addr',
	default: '',
}
