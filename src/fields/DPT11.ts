import {TextDPT} from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.12
export const DPT11: TextDPT = {
	type: 'text',
	id: 'DPT11',
	label: 'Date',
	valueFn: value => value,
	subtypes: [
		{id: '001', label: 'Date (YYYY/MM/DD)'},
	]
}
