import {NumberDPT} from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.19
export const DPT18: NumberDPT = {
	type: 'number',
	id: 'DPT18',
	label: 'Scene Control',
	valueLabel: 'Scene Number',
	numberRange: [0, 63],
	valueFn: (value, extraFields) => ({scenenumber: value, save_recall: extraFields['save_recall'] === '1'}),
	feedbackFn: (value: { scenenumber: number, save_recall: boolean }, feedback_fields) =>
		value.scenenumber >= feedback_fields['min'] &&
		value.scenenumber <= feedback_fields['max'],
	subtypes: [
		{id: '001', label: 'Scene Control'},
	],
	extraFields: [{
		id: 'save_recall',
		type: 'select',
		label: 'Save/Recall',
		choices: [
			{id: '0', label: 'activate the scene'},
			{id: '1', label: 'learn the scene'},
		]
	}]
}
