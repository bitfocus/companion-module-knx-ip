import {TextDPT} from './DPT'

function parseHexStr(value: string) {
	let result = value.match(/^#([\dA-F]{2})([\dA-F]{2})([\dA-F]{2})$/);
	if (!result) {
		return {red: 0, green: 0, blue: 0};
	}

	return {
		red: parseInt(result[1], 16),
		green: parseInt(result[2], 16),
		blue: parseInt(result[3], 16)
	}
}

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 6.6
export const DPT232: TextDPT = {
	type: 'text',
	id: 'DPT232',
	label: 'RGB Color',
	valueLabel: '#RRGGBB',
	valueFn: (value) => parseHexStr(value),
	subtypes: [
		{id: '600', label: 'RGB Color'},
	]
}
