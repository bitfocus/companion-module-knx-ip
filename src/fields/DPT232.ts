import {TextDPT} from './DPT'

interface RGBValue {
	red: number
	green: number
	blue: number
}

function parseHexStr(value: string): RGBValue {
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

function componentToHex(value: number) {
	const hex = value.toString(16);
	return hex.length == 1 ? '0' + hex : hex;
}

function formatHexStr(value: RGBValue): string {
	return '#' + componentToHex(value.red) + componentToHex(value.green) + componentToHex(value.blue);
}

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 6.6
export const DPT232: TextDPT = {
	type: 'text',
	id: 'DPT232',
	label: 'RGB Color',
	valueLabel: '#RRGGBB',
	valueFn: (value) => parseHexStr(value),
	feedbackFn: (value: RGBValue, feedback_fields) =>
		formatHexStr(value) === (feedback_fields['equals']),
	subtypes: [
		{id: '600', label: 'RGB Color'},
	]
}
