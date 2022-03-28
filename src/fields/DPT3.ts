import {NumberDPT} from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.3
export const DPT3: NumberDPT = {
	type: 'number',
	id: 'DPT3',
	label: '4-bit Dimming/Blinds control',
	numberRange: [0, 7],
	projectedRange: [0, 100],
	unit: '%',
	valueFn: (value, otherFields) => ({
		data: parseInt(value),
		decr_incr: otherFields['decr_incr'] === '1'
	}),
	extraFields: [{
		id: 'decr_incr',
		label: 'Decrease/Increase',
		type: 'boolean',
		booleanLabels: ['Decrease', 'Increase'],
	}],
	subtypes: [
		{
			id: '007',
			label: 'Dimming Control',
		}, {
			id: '008',
			label: 'Blinds Control',
		}
	]
}
