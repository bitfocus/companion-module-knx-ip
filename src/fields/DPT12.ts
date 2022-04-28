import {NumberDPT} from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.13
export const DPT12: NumberDPT = {
	type: 'number',
	id: 'DPT12',
	label: '32-bit unsigned',
	numberRange: [0, 4_294_967_295],
	valueFn: value => value,
	feedbackFn: (value: number, feedback_fields) =>
		value <= feedback_fields['min'] &&
		value >= feedback_fields['max'],
	subtypes: [
		{id: '001', label: 'Counter Pulses', unit: 'pulses'},

		{id: '100', label: 'Long Time Period (s)', unit: 'seconds'},
		{id: '101', label: 'Long Time Period (min)', unit: 'minutes'},
		{id: '102', label: 'Long Time Period (hrs)', unit: 'hours'},
	]
}
