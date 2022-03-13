import {DptLib} from 'knx'
import {SomeCompanionInputField} from '../../../instance_skel_types'

const naturalCollator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});

export const DPT_SELECT_FIELD: SomeCompanionInputField = {
	type: 'dropdown',
	label: 'Data-Type',
	id: 'data_type',
	default: 'DPT1',
	choices: Object.keys(DptLib)
		.filter(key => typeof DptLib[key] === 'object')
		.sort(naturalCollator.compare)
		.flatMap(key => [
			{
				id: key,
				label: key + ': ' + DptLib[key].basetype.desc
			},
			...Object.keys(DptLib[key].subtypes)
				.sort(naturalCollator.compare)
				.map(subkey => ({
					id: key + '.' + subkey,
					label: key + '.' + subkey + ': ' + DptLib[key].subtypes[subkey].desc
				}))
		])
}

export const GROUP_ADDR_FIELD: SomeCompanionInputField = {
	type: 'textwithvariables',
	label: 'Group Address',
	id: 'group_addr',
	default: '',
}
