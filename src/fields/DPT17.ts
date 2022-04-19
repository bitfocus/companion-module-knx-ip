import {NumberDPT} from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.18
export const DPT17: NumberDPT = {
	type: 'number',
	id: 'DPT17',
	label: 'Scene Number',
	valueLabel: 'Scene Numberxx',
	numberRange: [0, 63],
	valueFn: (value) => value,
	subtypes: [
		{id: '001', label: 'Scene Number'},
	]
}
