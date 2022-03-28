import {BooleanDPT} from './DPT'
import {DPT1} from './DPT1'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.2
export const DPT2: BooleanDPT = {
	type: 'boolean',
	booleanLabels: DPT1.booleanLabels,
	id: 'DPT2',
	label: '1-bit value with priority',
	valueFn: (value, otherFields) => ({
		data: value === '1',
		priority: otherFields['priority'] === '1'
	}),
	subtypes: DPT1.subtypes.filter(subtype => ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010', '011', '012'].includes(subtype.id)),
	extraFields: [{
		id: 'priority',
		label: 'Priority',
		type: 'boolean',
		booleanLabels: ['High', 'Low'],
	}]
}
