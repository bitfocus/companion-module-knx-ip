import { BooleanDPT } from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.1
export const DPT1: BooleanDPT = {
	id: 'DPT1',
	label: '1-bit',
	type: 'boolean',
	booleanLabels: ['False', 'True'],
	valueFn: (value) => value === '1',
	feedbackFn: (value: boolean, feedback_fields) => value === (feedback_fields['equals'] === '1'),
	subtypes: [
		{ id: '001', label: 'Switch', booleanLabels: ['Off', 'On'] },
		{ id: '002', label: 'Boolean', booleanLabels: ['False', 'True'] },
		{ id: '003', label: 'Enable', booleanLabels: ['Disable', 'Enable'] },
		{ id: '004', label: 'Ramp', booleanLabels: ['No ramp', 'Ramp'] },
		{ id: '005', label: 'Alarm', booleanLabels: ['No alarm', 'Alarm'] },
		{ id: '006', label: 'Binary Value', booleanLabels: ['Low', 'High'] },
		{ id: '007', label: 'Step', booleanLabels: ['Decrease', 'Increase'] },
		{ id: '008', label: 'Up/Down', booleanLabels: ['Up', 'Down'] },
		{ id: '009', label: 'Open/Close', booleanLabels: ['Open', 'Close'] },
		{ id: '010', label: 'Start/Stop', booleanLabels: ['Stop', 'Start'] },
		{ id: '011', label: 'State', booleanLabels: ['Inactive', 'Active'] },
		{ id: '012', label: 'Invert', booleanLabels: ['Not inverted', 'Inverted'] },
		{ id: '013', label: 'Dim Send style', booleanLabels: ['Start/stop', 'Cyclically'] },
		{ id: '014', label: 'Input Source', booleanLabels: ['Fixed', 'Calculated'] },
		{ id: '015', label: 'Reset', booleanLabels: ['No action (Dummy)', 'Reset command (trigger)'] },
		{ id: '016', label: 'ACK', booleanLabels: ['No action (Dummy)', 'Acknowledge command (trigger)'] },
		{ id: '017', label: 'Trigger', booleanLabels: ['Trigger (False)', 'Trigger (True)'] },
		{ id: '018', label: 'Occupancy', booleanLabels: ['Not occupied', 'Occupied'] },
		{ id: '019', label: 'Window/Door', booleanLabels: ['Closed', 'Open'] },
		{ id: '021', label: 'Logical Function', booleanLabels: ['OR', 'AND'] },
		{ id: '022', label: 'Scene A/B', booleanLabels: ['Scene A', 'Scene B'] },
		{
			id: '023',
			label: 'Shutter/Blinds Mode',
			booleanLabels: ['Only move Up/Down mode (Shutter)', 'Move Up/Down + StepStop mode (Blind)'],
		},
		{ id: '024', label: 'Day/Night', booleanLabels: ['Day', 'Night'] },
	],
}
