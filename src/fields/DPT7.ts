import { NumberDPT } from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.8
export const DPT7: NumberDPT = {
	type: 'number',
	id: 'DPT7',
	label: '16-bit unsigned',
	numberRange: [0, 65_535],
	valueFn: (value: number) => Math.round(value),
	feedbackFn: (value: number, feedback_fields) => value >= feedback_fields['min'] && value <= feedback_fields['max'],
	subtypes: [
		{ id: '600', label: 'Absolute colour temperature', unit: 'K' },
		{ id: '001', label: 'Counter Pulses', unit: 'pulses' },
		{ id: '002', label: 'Period (ms)', unit: 'milliseconds' },
		{ id: '003', label: 'Period (10ms)', unit: 'centiseconds' },
		{ id: '004', label: 'Period (100ms)', unit: 'deciseconds' },
		{ id: '005', label: 'Period (s)', unit: 'seconds' },
		{ id: '006', label: 'Period (min)', unit: 'minutes' },
		{ id: '007', label: 'Period (hrs)', unit: 'hours' },
		{ id: '011', label: 'Length in mm', unit: 'mm' },
		{ id: '012', label: 'Bus Power Supply current (mA)', unit: 'mA' },
		{ id: '013', label: 'Interior Brightness', unit: 'lux' },
	],
}
