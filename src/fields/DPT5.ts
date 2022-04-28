import {NumberDPT, NumberSubtype} from './DPT'
import {scaleDpt} from './ScaleFunction'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.5
export const DPT5: NumberDPT = {
	type: 'number',
	id: 'DPT5',
	label: '8-bit unsigned',
	numberRange: [0, 255],
	valueFn: (value: number, _extraFields, dpt: NumberDPT, subtype: NumberSubtype) => scaleDpt(value, dpt, subtype),
	feedbackFn: (value: number, feedback_fields, _, dpt: NumberDPT, subtype: NumberSubtype) =>
		scaleDpt(value, dpt, subtype) <= feedback_fields['min'] &&
		scaleDpt(value, dpt, subtype) >= feedback_fields['max'],
	subtypes: [
		{id: '001', label: 'Scaling', projectedRange: [0, 100], unit: '%'},
		{id: '002', label: 'Angle', projectedRange: [0, 360], unit: '°'},

		// no projectedRange - 0...255% for finer control
		{id: '004', label: 'Percent U8', unit: '0%-255%'},

		// actually step=1/255 = 0.003921… but it is easier for humans to work with base10 values and have them scaled to the closest value later
		{id: '005', label: 'Ratio', projectedRange: [0, 1], step: 0.001, unit: 'Ratio'},

		{id: '006', label: 'Tarif'},
		{id: '007', label: 'Counter Pulses', unit: 'pulses'},
	]
}
