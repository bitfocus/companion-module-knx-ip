import { NumberDPT } from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.15
export const DPT14: NumberDPT = {
	type: 'number',
	id: 'DPT14',
	label: '32-bit float',
	valueFn: (value) => value,
	feedbackFn: (value: number, feedback_fields) => value >= feedback_fields['min'] && value <= feedback_fields['max'],
	subtypes: [
		{ id: '000', label: 'Acceleration', unit: 'ms-2' },
		{ id: '001', label: 'Acceleration Angular', unit: 'rad s-2' },
		{ id: '002', label: 'Activation Energy', unit: 'J mol-1' },
		{ id: '003', label: 'Radioactive Activity', unit: 's-1' },
		{ id: '004', label: 'Mol', unit: 'mol' },
		{ id: '005', label: 'Amplitude' },
		{ id: '006', label: 'AngleRad', unit: 'rad' },
		{ id: '007', label: 'AngleDeg', unit: '°' },
		{ id: '008', label: 'Angular Momentum', unit: 'J s' },
		{ id: '009', label: 'Angular Velocity', unit: 'rad s-1' },
		{ id: '010', label: 'Area', unit: 'm2' },
		{ id: '011', label: 'Capacitance', unit: 'F' },
		{ id: '012', label: 'Charge DensitySurface', unit: 'C m-2' },
		{ id: '013', label: 'Charge DensityVolume', unit: 'C m-3' },
		{ id: '014', label: 'Compressibility', unit: 'm2 N-1' },
		{ id: '015', label: 'Conductance', unit: 'S = Ω-1' },
		{ id: '016', label: 'Electrical Conductivity', unit: 'S m-1' },
		{ id: '017', label: 'Density', unit: 'kg m-3' },
		{ id: '018', label: 'Electric Charge', unit: 'C' },
		{ id: '019', label: 'Electric Current', unit: 'A' },
		{ id: '020', label: 'Electric CurrentDensity', unit: 'A m-2' },
		{ id: '021', label: 'Electric DipoleMoment', unit: 'C m' },
		{ id: '022', label: 'Electric Displacement', unit: 'C m-2' },
		{ id: '023', label: 'Electric FieldStrength', unit: 'V m-1' },
		{ id: '024', label: 'Electric Flux', unit: 'c' },
		{ id: '025', label: 'Electric FluxDensity', unit: 'C m-2' },
		{ id: '026', label: 'Electric Polarization', unit: 'C m-2' },
		{ id: '027', label: 'Electric Potential', unit: 'V' },
		{ id: '028', label: 'Electric PotentialDifference', unit: 'V' },
		{ id: '029', label: 'ElectromagneticMoment', unit: 'A m2' },
		{ id: '030', label: 'Electromotive Force', unit: 'V' },
		{ id: '031', label: 'Energy', unit: 'J' },
		{ id: '032', label: 'Force', unit: 'N' },
		{ id: '033', label: 'Frequency', unit: 'Hz = s-1' },
		{ id: '034', label: 'Angular Frequency', unit: 'rad s-1' },
		{ id: '035', label: 'Heat Capacity', unit: 'J K-1' },
		{ id: '036', label: 'Heat FlowRate', unit: 'W' },
		{ id: '037', label: 'Heat Quantity', unit: 'J' },
		{ id: '038', label: 'Impedance', unit: 'Ω' },
		{ id: '039', label: 'Length', unit: 'm' },
		{ id: '040', label: 'Light Quantity', unit: 'J or lm s' },
		{ id: '041', label: 'Luminance', unit: 'cd m-2' },
		{ id: '042', label: 'Luminous Flux', unit: 'lm' },
		{ id: '043', label: 'Luminous Intensity', unit: 'cd' },
		{ id: '044', label: 'Magnetic FieldStrength', unit: 'A m-1' },
		{ id: '045', label: 'Magnetic Flux', unit: 'Wb' },
		{ id: '046', label: 'Magnetic FluxDensity', unit: 'T' },
		{ id: '047', label: 'Magnetic Moment', unit: 'A m2' },
		{ id: '048', label: 'Magnetic Polarization', unit: 'T' },
		{ id: '049', label: 'Magnetization', unit: 'A m-1' },
		{ id: '050', label: 'Magnetomotive Force', unit: 'A' },
		{ id: '051', label: 'Mass', unit: 'kg' },
		{ id: '052', label: 'MassFlux', unit: 'kg s-1' },
		{ id: '053', label: 'Momentum', unit: 'N s-1' },
		{ id: '054', label: 'Phase AngleRad', unit: 'rad' },
		{ id: '055', label: 'Phase AngleDeg', unit: '°' },
		{ id: '056', label: 'Power', unit: 'W' },
		{ id: '057', label: 'Power Factor' },
		{ id: '058', label: 'Pressure', unit: 'Pa = N m-2' },
		{ id: '059', label: 'Reactance', unit: 'Ω' },
		{ id: '060', label: 'Resistance', unit: 'Ω' },
		{ id: '061', label: 'Resistivity', unit: 'Ωm' },
		{ id: '062', label: 'SelfInductance', unit: 'H' },
		{ id: '063', label: 'SolidAngle', unit: 'sr' },
		{ id: '064', label: 'Sound Intensity', unit: 'W m-2' },
		{ id: '065', label: 'Speed', unit: 'm s-1' },
		{ id: '066', label: 'Stress', unit: 'Pa = N m-2' },
		{ id: '067', label: 'Surface Tension', unit: 'Nm-1' },
		{ id: '068', label: 'Common Temperature', unit: '°C' },
		{ id: '069', label: 'Absolute Temperature', unit: 'K' },
		{ id: '070', label: 'TemperatureDifference', unit: 'K' },
		{ id: '071', label: 'Thermal Capacity', unit: 'JK-1' },
		{ id: '072', label: 'Thermal Conductivity', unit: 'W m-1 K-1' },
		{ id: '073', label: 'ThermoelectricPower', unit: 'V K-1' },
		{ id: '074', label: 'Time', unit: 's' },
		{ id: '075', label: 'Torque', unit: 'Nm' },
		{ id: '076', label: 'Volume', unit: 'm3' },
		{ id: '077', label: 'Volume Flux', unit: 'm3 s-1' },
		{ id: '078', label: 'Weight', unit: 'N' },
		{ id: '079', label: 'Work', unit: 'J' },
		{ id: '080', label: 'ApparentPower', unit: 'VA' },
	],
}
