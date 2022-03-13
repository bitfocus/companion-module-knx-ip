import {Dpt, DptLib} from 'knx'
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
		.map(key => ({
			id: key,
			label: key + ': ' + DptLib[key].basetype.desc
		}))
}

function makeSubtypeSelectField(dptKey: string, dpt: Dpt): SomeCompanionInputField {
	return {
		type: 'dropdown',
		label: dptKey + ': Sub-Type',
		id: 'data_subtype_' + dptKey,
		default: '',
		// Hack to get dptKey into the serialized version of the isVisible function
		isVisible: new Function('config', 'return config.options.data_type === ' + JSON.stringify(dptKey)) as any,
		choices: [
			{
				id: '',
				label: '[None]',
			},
			...Object.keys(dpt.subtypes)
				.sort(naturalCollator.compare)
				.map(subkey => ({
					id: subkey,
					label: dpt.subtypes[subkey].desc
				}))
		]
	}
}

export const DPT_SUBTYPE_SELECT_FIELDS: SomeCompanionInputField[] = Object.keys(DptLib)
	.filter(key => typeof DptLib[key] === 'object')
	.sort(naturalCollator.compare)
	.map(key => makeSubtypeSelectField(key, DptLib[key]))

export const GROUP_ADDR_FIELD: SomeCompanionInputField = {
	type: 'textwithvariables',
	label: 'Group Address',
	id: 'group_addr',
	default: '',
}
