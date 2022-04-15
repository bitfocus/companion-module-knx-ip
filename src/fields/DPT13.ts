import {NumberDPT} from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.13
export const DPT13: NumberDPT = {
	type: 'number',
	id: 'DPT13',
	label: '32-bit signed',
	numberRange: [-2_147_483_648, 2_147_483_647],
	valueFn: value => value,
	subtypes: [
		{id: '001', label: 'Counter Pulses', unit: 'pulses'},
		{id: '002', label: 'Flow Rate', unit: 'm³/h'},

		{id: '010', label: 'Active energy (Wh)', unit: 'Wh'},
		{id: '011', label: 'Apparent energy (VAh)', unit: 'VAh'},
		{id: '012', label: 'Reactive energy (VARh)', unit: 'VARh'},

		{id: '013', label: 'Active energy (kWh)', unit: 'kWh'},
		{id: '014', label: 'Apparent energy (kVAh)', unit: 'VAh'},
		{id: '015', label: 'Reactive energy (kVARh)', unit: 'kVARh'},

		{id: '016', label: 'Active energy (MWh)', unit: 'MWh'},

		{id: '100', label: 'Long Time Period (s)', unit: 'seconds'},
	]
}
