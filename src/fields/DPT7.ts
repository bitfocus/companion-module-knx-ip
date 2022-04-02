import {NumberDPT} from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.8
export const DPT7: NumberDPT = {
	type: 'number',
	id: 'DPT7',
	label: '16-bit unsigned',
	numberRange: [0, 65_535],
	valueFn: (value: number) => Math.round(value),
	subtypes: [
		{
			id: '001',
			label: 'Pulses',
			unit: 'pulses'
		}, {
			id: '002',
			label: 'Period (1ms)',
			unit: 'milliseconds'
		}, {
			id: '003',
			label: 'Period (10ms)',
			unit: 'centiseconds'
		}, {
			id: '004',
			label: 'Period (100ms)',
			unit: 'deciseconds'
		}, {
			id: '005',
			label: 'Period (s)',
			unit: 'seconds'
		}, {
			id: '006',
			label: 'Period (min)',
			unit: 'minutes'
		}, {
			id: '007',
			label: 'Period (hours)',
			unit: 'hours'
		}, {
			id: '011',
			label: 'Length (mm)',
			unit: 'millimeters'
		}, {
			id: '012',
			label: 'Bus Power Supply current',
			unit: 'mA'
		}, {
			id: '013',
			label: 'Brightness',
			unit: 'lux'
		}, {
			id: '600',
			label: 'Absolute colour temperature',
			unit: 'K'
		}
	]
}
