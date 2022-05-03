import {NumberDPT} from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.18
export const DPT17: NumberDPT = {
	type: 'number',
	id: 'DPT17',
	label: 'Scene Number',
	valueLabel: 'Scene Number',
	numberRange: [0, 63],
	valueFn: (value) => value,
	feedbackFn: (value: number, feedback_fields) =>
		value >= feedback_fields['min'] &&
		value <= feedback_fields['max'],
	subtypes: [
		{id: '001', label: 'Scene Number'},
	]
}
