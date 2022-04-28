import {BooleanDPT} from './DPT'
import {DPT1} from './DPT1'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.2
export const DPT2: BooleanDPT = {
	type: 'boolean',
	booleanLabels: DPT1.booleanLabels,
	id: 'DPT2',
	label: '1-bit with Priority',
	valueFn: (value, extraFields) => ({
		data: value === '1',
		priority: extraFields['priority'] === '1'
	}),
	feedbackFn: (value: { data: boolean, priority: boolean }, feedback_fields) =>
		value.data == (feedback_fields['equals'] === '1'),
	subtypes: DPT1.subtypes.filter(subtype => ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010', '011', '012'].includes(subtype.id)),
	extraFields: [{
		id: 'priority',
		label: 'Priority',
		type: 'boolean',
		booleanLabels: ['No Control', 'Control'],
	}]
}
