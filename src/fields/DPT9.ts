import {NumberDPT} from './DPT'

// https://www.knx.org/wAssets/docs/downloads/Certification/Interworking-Datapoint-types/03_07_02-Datapoint-Types-v02.02.01-AS.pdf
// Chapter 3.10
export const DPT9: NumberDPT = {
	type: 'number',
	id: 'DPT9',
	label: '16-bit float',
	numberRange: [-65_504, 65_504],
	step: 0.01,
	valueFn: value => value,
	subtypes: [
		{id: '001', label: 'Temperature', unit: '°C', numberRange: [-273, 670760]},
		{id: '002', label: 'Temperature difference', unit: 'K', numberRange: [-670760, 670760]},
		{id: '003', label: 'Kelvin/Hour', unit: '°K/h', numberRange: [-670760, 670760]},
		{id: '004', label: 'Lux', unit: 'lux', numberRange: [0, 670760]},
		{id: '005', label: 'Wind speed', unit: 'm/s', numberRange: [0, 670760]},
		{id: '006', label: 'Pressure', unit: 'Pa', numberRange: [0, 670760]},
		{id: '007', label: 'Humidity', unit: '%', numberRange: [0, 670760]},
		{id: '008', label: 'Air quality', unit: 'ppm', numberRange: [0, 670760]},
		{id: '010', label: 'Period (sec)', unit: 's', numberRange: [-670760, 670760]},
		{id: '011', label: 'Period (msec)', unit: 'ms', numberRange: [-670760, 670760]},
		{id: '020', label: 'Voltage', unit: 'mV', numberRange: [-670760, 670760]},
		{id: '021', label: 'Current', unit: 'mA', numberRange: [-670760, 670760]},
		{id: '022', label: 'Power density', unit: 'W/m²', numberRange: [-670760, 670760]},
		{id: '023', label: 'Kelvin / %', unit: 'K/%', numberRange: [-670760, 670760]},
		{id: '024', label: 'Power (kW)', unit: 'kW', numberRange: [-670760, 670760]},
		{id: '025', label: 'Volume flow', unit: 'l/h', numberRange: [-670760, 670760]},
		{id: '026', label: 'Rain amount', unit: 'l/m²', numberRange: [-670760, 670760]},
		{id: '027', label: 'Temperature (F)', unit: '°F'},
		{id: '028', label: 'Wind speed (km/h)', unit: 'km/h', numberRange: [0, 670760]}
	]
}
