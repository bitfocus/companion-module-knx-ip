import {SomeCompanionInputField} from '../../../instance_skel_types'
import {BooleanDPT, BooleanSubtype, DPT, DPTs, NumberDPT, NumberSubtype, Subtype, TextDPT, TextSubtype} from './fields/DPT'

const DPT_SELECT_FIELD: SomeCompanionInputField = {
	type: 'dropdown',
	label: 'Data-Type',
	id: 'data_type',
	default: DPTs[0].id,
	choices: DPTs.map(dpt => ({
		id: dpt.id,
		label: dpt.id + ': ' + dpt.label
	}))
}

function constructVisibilityFunction(dptId: string, subtypeId?: string) {
	let body: string

	if (subtypeId !== undefined) {
		body = 'return config.options.data_type === ' + JSON.stringify(dptId) + ' && ' +
			'config.options.data_subtype_' + dptId + ' === ' + JSON.stringify(subtypeId)
	} else {
		body = 'return config.options.data_type === ' + JSON.stringify(dptId)
	}

	return new Function('config', body) as any
}

function makeSubtypeSelectField(dpt: DPT): SomeCompanionInputField {
	return {
		type: 'dropdown',
		label: dpt.id + ': Sub-Type',
		id: 'data_subtype_' + dpt.id,
		default: dpt.subtypes[0].id,
		isVisible: constructVisibilityFunction(dpt.id),
		choices: dpt.subtypes.map(subtype => ({
			id: subtype.id,
			label: subtype.id + ': ' + subtype.label,
		}))
	}
}

const DPT_SUBTYPE_FIELDS: SomeCompanionInputField[] =
	DPTs.map(dpt => makeSubtypeSelectField(dpt))

function constructId(dpt: DPT, subtype?: Subtype) {
	return dpt.id + (subtype ? '_' + subtype.id : '')
}

function constructLabel(dpt: DPT, subtype?: Subtype) {
	return subtype ? subtype.label : dpt.label
}

function makeBooleanValueField(dpt: BooleanDPT, subtype?: BooleanSubtype): SomeCompanionInputField {
	return {
		type: 'dropdown',
		label: constructLabel(dpt, subtype) + ' Value',
		id: 'value_' + constructId(dpt, subtype),
		default: '0',
		isVisible: constructVisibilityFunction(dpt.id, subtype?.id || ''),
		choices: [
			{
				id: '0',
				label: subtype?.booleanLabels?.[0] || dpt.booleanLabels[0],
			},
			{
				id: '1',
				label: subtype?.booleanLabels?.[1] || dpt.booleanLabels[1],
			},
		]
	}
}

function makeNumberValueField(dpt: NumberDPT, subtype?: NumberSubtype): SomeCompanionInputField {
	const unit = subtype?.unit || dpt.unit;
	return {
		type: 'number',
		label: unit ? `${constructLabel(dpt, subtype)} Value (${unit})` : constructLabel(dpt, subtype) + ' Value',
		id: 'value_' + constructId(dpt, subtype),
		default: 0,
		range: true, // ?
		required: true,
		isVisible: constructVisibilityFunction(dpt.id, subtype?.id || ''),
		min: subtype?.projectedRange?.[0] || subtype?.numberRange?.[0] || dpt.projectedRange?.[0] || dpt.numberRange[0],
		max: subtype?.projectedRange?.[1] || subtype?.numberRange?.[1] || dpt.projectedRange?.[1] || dpt.numberRange[1],
	}
}

function makeTextValueField(dpt: TextDPT, subtype?: TextSubtype): SomeCompanionInputField {
	return {
		type: 'textinput',
		label: constructLabel(dpt, subtype) + ' Value',
		id: 'value_' + constructId(dpt, subtype),
		default: '',
		required: true,
		isVisible: constructVisibilityFunction(dpt.id, subtype?.id || ''),
	}
}

function makeValueField(dpt: DPT, subtype?: Subtype): SomeCompanionInputField {
	switch (dpt.type) {
		case 'boolean':
			return makeBooleanValueField(dpt, subtype as BooleanSubtype)
		case 'number':
			return makeNumberValueField(dpt, subtype as NumberSubtype)
		case 'text':
			return makeTextValueField(dpt, subtype as TextSubtype)
	}
}

const DPT_VALUE_FIELDS: SomeCompanionInputField[] =
	DPTs.flatMap(dpt => dpt.subtypes?.map(subtype => makeValueField(dpt, subtype)))

const DPT_COMPARISON_FIELDS: SomeCompanionInputField[] = [];

/*
function makeExtraField(dpt: DPT, extraField: Field): SomeCompanionInputField {
	return undefined;
}

function makeExtraFields(dpt: DPT): SomeCompanionInputField[] {
	return dpt.extraFields?.map(extraField => makeExtraField(dpt, extraField)) || []
}
*/
const DPT_EXTRA_FIELDS: SomeCompanionInputField[] = [];
//DPTs.flatMap(dpt => makeExtraFields(dpt))

export const DPT_ACTION_FIELDS = [
	DPT_SELECT_FIELD,
	...DPT_SUBTYPE_FIELDS,
	...DPT_VALUE_FIELDS,
	...DPT_EXTRA_FIELDS,
]

export const DPT_FEEDBACK_FIELDS = [
	DPT_SELECT_FIELD,
	...DPT_SUBTYPE_FIELDS,
	...DPT_COMPARISON_FIELDS,
	...DPT_EXTRA_FIELDS,
]

export const GROUP_ADDR_FIELD: SomeCompanionInputField = {
	type: 'textwithvariables',
	label: 'Group Address',
	id: 'group_addr',
	default: '',
}
