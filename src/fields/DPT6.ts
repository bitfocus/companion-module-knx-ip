import {NumberDPT} from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.6
export const DPT6: NumberDPT = {
	type: 'number',
	id: 'DPT6',
	label: '8-bit signed',
	numberRange: [-128, 127],
	valueFn: (value: number) => Math.round(value),
	feedbackFn: (value: number, feedback_fields) =>
		value >= feedback_fields['min'] &&
		value <= feedback_fields['max'],
	subtypes: [
		// no projectedRange - 0...255% for finer control
		{id: '001', label: 'Percent V8', unit: '-128%-127%'},
		{id: '010', label: 'Counter Pulses', unit: 'pulses'},
	]
}
