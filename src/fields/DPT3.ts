import { NumberDPT } from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.3
export const DPT3: NumberDPT = {
	type: 'number',
	id: 'DPT3',
	label: '4-bit Dimming/Blinds control',
	numberRange: [0, 7],
	unit: '0-7 = 0-100%',
	valueFn: (value: number, extraFields) => ({
		value: Math.round(value),
		decr_incr: extraFields['decr_incr'] === '1',
	}),
	feedbackFn: (value: number, feedback_fields) => value >= feedback_fields['min'] && value <= feedback_fields['max'],
	extraFields: [
		{
			id: 'decr_incr',
			label: 'Decrease/Increase',
			type: 'boolean',
			booleanLabels: ['Decrease', 'Increase'],
		},
	],
	subtypes: [
		{ id: '007', label: 'Dimming Control' },
		{ id: '008', label: 'Blinds Control' },
	],
}
