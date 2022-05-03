import {SomeCompanionInputField} from '../../../instance_skel_types'
import {BooleanDPT, BooleanField, BooleanSubtype, DPT, DPTs, Field, NumberDPT, NumberField, NumberSubtype, SelectDPT, SelectField, SelectSubtype, Subtype, TextDPT, TextField, TextSubtype} from './fields/DPT'

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

const DPT_SELECT_FIELD_FEEDBACK: SomeCompanionInputField = {
	...DPT_SELECT_FIELD,
	id: 'feedback_' + DPT_SELECT_FIELD.id,
	label: 'Feedback: ' + DPT_SELECT_FIELD.label,
}

function constructVisibilityFunction(dptId: string, subtypeId?: string, dpt_field_prefix: string = '') {
	let body: string

	if (subtypeId !== undefined) {
		body = 'return config.options.' + dpt_field_prefix + 'data_type === ' + JSON.stringify(dptId) + ' && ' +
			'config.options.' + dpt_field_prefix + 'data_subtype_' + dptId + ' === ' + JSON.stringify(subtypeId)
	} else {
		body = 'return config.options.' + dpt_field_prefix + 'data_type === ' + JSON.stringify(dptId)
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

const DPT_SUBTYPE_FIELDS_FEEDBACK: SomeCompanionInputField[] =
	DPTs.map(dpt => ({
		...makeSubtypeSelectField(dpt),
		label: dpt.id + ': Sub-Type (Feedback)',
		id: 'feedback_data_subtype_' + dpt.id,
		isVisible: constructVisibilityFunction(dpt.id, undefined, 'feedback_'),
	}))

function constructLabel(dpt: DPT, subtype?: Subtype, unit?: string, label_suffix?: string) {
	let label: string
	if (subtype) {
		label = `${subtype.label} Value`
	} else if (dpt.valueLabel) {
		label = dpt.valueLabel
	} else {
		label = `${dpt.label} Value`
	}

	if (label_suffix) {
		label += ` ${label_suffix}`
	}

	if (unit) {
		label += ` (${unit})`
	}

	return label
}

function formatId(field_id: string, dpt: DPT, subtype: Subtype, suffix?: string) {
	return field_id + '_' + dpt.id + '_' + subtype.id + (suffix ? '_' + suffix : '')
}

function makeBooleanField(field_id: string, dpt: BooleanDPT, subtype: BooleanSubtype, suffix?: string, dpt_field_prefix = ''): SomeCompanionInputField {
	return {
		type: 'dropdown',
		label: constructLabel(dpt, subtype),
		id: formatId(field_id, dpt, subtype, suffix),
		default: '0',
		isVisible: constructVisibilityFunction(dpt.id, subtype.id, dpt_field_prefix),
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

function makeNumberField(field_id: string, dpt: NumberDPT, subtype: NumberSubtype, id_suffix?: string, label_suffix?: string, dpt_field_prefix = ''): SomeCompanionInputField {
	const unit = subtype?.unit || dpt.unit;
	const range = subtype?.projectedRange || subtype?.numberRange || dpt.projectedRange || dpt.numberRange

	return {
		type: 'number',
		label: constructLabel(dpt, subtype, unit, label_suffix),
		id: formatId(field_id, dpt, subtype, id_suffix),
		default: 0,
		range: range != undefined,
		required: true,
		isVisible: constructVisibilityFunction(dpt.id, subtype.id, dpt_field_prefix),
		min: range?.[0],
		max: range?.[1],
		step: subtype?.step || dpt.step || 1,
	}
}

function makeTextField(field_id: string, dpt: TextDPT, subtype: TextSubtype, suffix?: string, dpt_field_prefix = ''): SomeCompanionInputField {
	return {
		type: 'textinput',
		label: constructLabel(dpt, subtype),
		id: formatId(field_id, dpt, subtype, suffix),
		default: '',
		required: true,
		isVisible: constructVisibilityFunction(dpt.id, subtype.id, dpt_field_prefix),
	}
}

function makeSelectField(field_id: string, dpt: SelectDPT, subtype: SelectSubtype, suffix?: string, dpt_field_prefix = ''): SomeCompanionInputField {
	const choices = subtype?.choices || dpt.choices;
	return {
		type: 'dropdown',
		label: constructLabel(dpt, subtype),
		id: formatId(field_id, dpt, subtype, suffix),
		default: choices.length > 0 ? choices[0].id : '',
		isVisible: constructVisibilityFunction(dpt.id, subtype.id, dpt_field_prefix),
		choices,
	}
}

function makeValueFields(dpt: DPT): SomeCompanionInputField[] {
	switch (dpt.type) {
		case 'boolean':
			return dpt.subtypes?.map(subtype => makeBooleanField('value', dpt, subtype))
		case 'number':
			return dpt.subtypes?.map(subtype => makeNumberField('value', dpt, subtype))
		case 'text':
			return dpt.subtypes?.map(subtype => makeTextField('value', dpt, subtype))
		case 'select':
			return dpt.subtypes?.map(subtype => makeSelectField('value', dpt, subtype))
	}
}

function makeFeedbackMatchFields(dpt: DPT): SomeCompanionInputField[] {
	switch (dpt.type) {
		case 'boolean':
			return dpt.subtypes?.map(subtype => makeBooleanField('feedback', dpt, subtype, 'equals', 'feedback_'))
		case 'number':
			return dpt.subtypes?.flatMap(subtype => [
				makeNumberField('feedback', dpt, subtype, 'min', 'Min', 'feedback_'),
				makeNumberField('feedback', dpt, subtype, 'max', 'Max', 'feedback_'),
			])
		case 'text':
			return dpt.subtypes?.map(subtype => makeTextField('feedback', dpt, subtype, 'equals', 'feedback_'))
		case 'select':
			return dpt.subtypes?.map(subtype => makeSelectField('feedback', dpt, subtype, 'equals', 'feedback_'))
	}
}

const DPT_VALUE_FIELDS: SomeCompanionInputField[] =
	DPTs.flatMap(dpt => makeValueFields(dpt))

const DPT_VALUE_FIELDS_POSITIVE: SomeCompanionInputField[] =
	DPT_VALUE_FIELDS.map(field => ({
		...field,
		id: field.id + '_positive',
		label: field.label + ' - When Feedback is Positive',
	}))

const DPT_VALUE_FIELDS_NEGATIVE: SomeCompanionInputField[] =
	DPT_VALUE_FIELDS.map(field => ({
		...field,
		id: field.id + '_negative',
		label: field.label + ' - When Feedback is Negative',
	}))

const DPT_FEEDBACK_MATCH_FIELDS: SomeCompanionInputField[] =
	DPTs.flatMap(dpt => makeFeedbackMatchFields(dpt))

function makeBooleanExtraField(dpt: DPT, field: BooleanField): SomeCompanionInputField {
	return {
		type: 'dropdown',
		label: field.label,
		id: 'extra_' + dpt.id + '_' + field.id,
		default: '0',
		isVisible: constructVisibilityFunction(dpt.id),
		choices: [
			{
				id: '0',
				label: field.booleanLabels[0]
			},
			{
				id: '1',
				label: field.booleanLabels[1]
			},
		]
	}
}

function makeNumberExtraField(dpt: DPT, field: NumberField): SomeCompanionInputField {
	return {
		type: 'number',
		label: field.unit ? `${field.label} (${field.unit})` : field.label,
		id: 'extra_' + dpt.id + '_' + field.id,
		default: 0,
		range: true,
		required: true,
		isVisible: constructVisibilityFunction(dpt.id),
		min: field?.projectedRange?.[0] || field?.numberRange[0],
		max: field?.projectedRange?.[1] || field?.numberRange[1],
		step: field.step || 1
	}
}

function makeTextExtraField(dpt: DPT, field: TextField): SomeCompanionInputField {
	return {
		type: 'textinput',
		label: field.label,
		id: 'extra_' + dpt.id + '_' + field.id,
		default: '',
		required: true,
		isVisible: constructVisibilityFunction(dpt.id),
	}
}

function makeSelectExtraField(dpt: DPT, field: SelectField): SomeCompanionInputField {
	const choices = field.choices;
	return {
		type: 'dropdown',
		label: field.label,
		id: 'extra_' + dpt.id + '_' + field.id,
		default: choices.length > 0 ? choices[0].id : '',
		isVisible: constructVisibilityFunction(dpt.id),
		choices,
	}
}

function makeExtraFields(dpt: DPT): SomeCompanionInputField[] {
	return dpt.extraFields?.map(field => makeExtraField(dpt, field)) || [];
}

function makeExtraField(dpt: DPT, field: Field): SomeCompanionInputField {
	switch (field.type) {
		case 'boolean':
			return makeBooleanExtraField(dpt, field)
		case 'number':
			return makeNumberExtraField(dpt, field)
		case 'text':
			return makeTextExtraField(dpt, field)
		case 'select':
			return makeSelectExtraField(dpt, field)
	}
}

const DPT_EXTRA_FIELDS: SomeCompanionInputField[] =
	DPTs.flatMap(dpt => makeExtraFields(dpt))

const DPT_EXTRA_FIELDS_POSITIVE: SomeCompanionInputField[] =
	DPT_EXTRA_FIELDS.map(field => ({
		...field,
		id: field.id + '_positive',
		label: field.label + ' - When Feedback is Positive',
	}))

const DPT_EXTRA_FIELDS_NEGATIVE: SomeCompanionInputField[] =
	DPT_EXTRA_FIELDS.map(field => ({
		...field,
		id: field.id + '_negative',
		label: field.label + ' - When Feedback is Negative',
	}))

const GROUP_ADDR_FIELD: SomeCompanionInputField = {
	type: 'textwithvariables',
	label: 'Group Address',
	id: 'group_addr',
	default: '',
}

const GROUP_ADDR_FIELD_FEEDBACK = {
	...GROUP_ADDR_FIELD,
	id: 'feedback_' + GROUP_ADDR_FIELD.id,
	label: 'Feedback: ' + GROUP_ADDR_FIELD.label,
}

export const DPT_ACTION_FIELDS = [
	GROUP_ADDR_FIELD,
	DPT_SELECT_FIELD,
	...DPT_SUBTYPE_FIELDS,
	...DPT_VALUE_FIELDS,
	...DPT_EXTRA_FIELDS,
]

export const DPT_TOGGLE_ACTION_FIELDS = [
	GROUP_ADDR_FIELD,
	DPT_SELECT_FIELD,
	...DPT_SUBTYPE_FIELDS,
	...DPT_VALUE_FIELDS_POSITIVE,
	...DPT_EXTRA_FIELDS_POSITIVE,
	...DPT_VALUE_FIELDS_NEGATIVE,
	...DPT_EXTRA_FIELDS_NEGATIVE,

	GROUP_ADDR_FIELD_FEEDBACK,
	DPT_SELECT_FIELD_FEEDBACK,
	...DPT_SUBTYPE_FIELDS_FEEDBACK,
	...DPT_FEEDBACK_MATCH_FIELDS,
]

export const DPT_FEEDBACK_FIELDS = [
	GROUP_ADDR_FIELD_FEEDBACK,
	DPT_SELECT_FIELD_FEEDBACK,
	...DPT_SUBTYPE_FIELDS_FEEDBACK,
	...DPT_FEEDBACK_MATCH_FIELDS,
]
