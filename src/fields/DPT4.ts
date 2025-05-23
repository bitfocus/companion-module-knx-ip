import { TextDPT } from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.4
export const DPT4: TextDPT = {
	type: 'text',
	id: 'DPT4',
	label: 'Character',
	valueFn: (value) => value,
	feedbackFn: (value: string, feedback_fields) => value == feedback_fields['equals'],
	subtypes: [
		{ id: '001', label: 'ASCII' },
		{ id: '008', label: 'ISO-8859-1' },
	],
}
