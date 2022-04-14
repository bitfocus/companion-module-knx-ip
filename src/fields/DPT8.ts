import {NumberDPT, NumberSubtype} from './DPT'
import {scaleDpt} from './ScaleFunction'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.9
export const DPT8: NumberDPT = {
	type: 'number',
	id: 'DPT8',
	label: '16-bit signed',
	numberRange: [-32_768, 32_767],
	valueFn: (value: number, _extraFields, dpt: NumberDPT, subtype: NumberSubtype) => scaleDpt(value, dpt, subtype),
	subtypes: [
		{id: '001', label: 'Counter Pulses', unit: 'pulses'},
		{id: '002', label: 'Period (ms)', unit: 'milliseconds'},
		{id: '003', label: 'Period (10ms)', unit: 'centiseconds'},
		{id: '004', label: 'Period (100ms)', unit: 'deciseconds'},
		{id: '005', label: 'Period (s)', unit: 'seconds'},
		{id: '006', label: 'Period (min)', unit: 'minutes'},
		{id: '007', label: 'Period (hrs)', unit: 'hours'},
		{id: '010', label: 'Percent V19', unit: '-327,68%-327,67%', projectedRange: [-327.68, 327.67], step: 0.01},
		{id: '011', label: 'Angle', unit: '°'},
		{id: '012', label: 'Altitude above Sea Level', unit: 'm'},
	]
}
