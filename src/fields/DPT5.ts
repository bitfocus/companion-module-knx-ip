import {NumberDPT} from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.5
export const DPT5: NumberDPT = {
	type: 'number',
	id: 'DPT5',
	label: '8-bit unsigned value',
	numberRange: [0, 255],
	valueFn: (value) => value,
	subtypes: [
		{
			id: '001',
			label: 'Scaling',
			projectedRange: [0, 100],
			unit: '%'
		}, {
			id: '002',
			label: 'Angle',
			projectedRange: [0, 360],
			unit: '°'
		}, {
			id: '004',
			label: 'Percent U8',
			// no projectedRange - 0...255% for finer control
			unit: '0%-255%'
		}, {
			id: '005',
			label: 'Ratio',
			unit: 'ratio'
		}, {
			id: '006',
			label: 'Tarif'
		}, {
			id: '007',
			label: 'Counter Pulses',
			unit: 'pulses'
		}
	]
}
