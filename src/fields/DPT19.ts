import { TextDPT } from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.20
export const DPT19: TextDPT = {
	type: 'text',
	id: 'DPT19',
	label: 'Date & Time',
	valueLabel: 'YYYY-MM-DDTHH:mm:ss',
	valueFn: (value) => new Date(value),
	feedbackFn: () => false, // TODO Implement Feedback for Time-Types
	subtypes: [{ id: '001', label: 'Date & Time' }],
}
