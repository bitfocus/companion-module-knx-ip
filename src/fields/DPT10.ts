import { TextDPT } from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.11
export const DPT10: TextDPT = {
	type: 'text',
	id: 'DPT10',
	label: 'Time',
	valueFn: (value, extraFields) => extraFields['dow'] + '/' + value,
	feedbackFn: () => false, // TODO Implement Feedback for Time-Types
	subtypes: [{ id: '001', label: 'Time of day (HH:MM:SS)' }],
	extraFields: [
		{
			id: 'dow',
			label: 'Day of Week',
			type: 'select',
			choices: [
				{ id: '0', label: 'no day' },
				{ id: '1', label: 'Monday' },
				{ id: '2', label: 'Tuesday' },
				{ id: '3', label: 'Wednesday' },
				{ id: '4', label: 'Thursday' },
				{ id: '5', label: 'Friday' },
				{ id: '6', label: 'Saturday' },
				{ id: '7', label: 'Sunday' },
			],
		},
	],
}
