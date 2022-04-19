import {DPT1} from './DPT1'
import {DPT2} from './DPT2'
import {DPT3} from './DPT3'
import {DPT4} from './DPT4'
import {DPT5} from './DPT5'
import {DPT6} from './DPT6'
import {DPT7} from './DPT7'
import {DPT8} from './DPT8'
import {DPT9} from './DPT9'
import {DPT10} from './DPT10'
import {DPT11} from './DPT11'
import {DPT12} from './DPT12'
import {DPT13} from './DPT13'
import {DPT14} from './DPT14'
import {DPT16} from './DPT16'
import {DPT17} from './DPT17'
import {DPT18} from './DPT18'

export type FieldValues = { [key: string]: any }
export type ValueFunction = (value: any, extraFields: FieldValues, dpt: DPT, subtype: Subtype) => any;

// Field Specs
interface FieldBase {
	id: string;
	label: string;
}

export interface BooleanField extends FieldBase {
	type: 'boolean'
	booleanLabels: [string, string]
}

export interface NumberField extends FieldBase {
	type: 'number'
	numberRange: [number, number]
	projectedRange?: [number, number]
	step?: number
	unit?: string
}

export interface TextField extends FieldBase {
	type: 'text'
}

export interface SelectField extends FieldBase {
	type: 'select'
	choices: { id: string, label: string }[]
}

export type Field = BooleanField | NumberField | TextField | SelectField;

// DPTs
interface DPTBase {
	id: string;
	label: string;
	valueLabel?: string;
	valueFn: ValueFunction
	subtypes?: SubtypeBase[]
	extraFields?: Field[]
}

interface SubtypeBase {
	id: string
	label: string
}

export interface BooleanDPT extends DPTBase {
	type: 'boolean'
	booleanLabels: [string, string]
	subtypes?: BooleanSubtype[]
}

export interface BooleanSubtype extends SubtypeBase {
	booleanLabels: [string, string]
}

export interface NumberDPT extends DPTBase {
	type: 'number'
	numberRange?: [number, number]
	projectedRange?: [number, number]
	step?: number
	unit?: string
	subtypes?: NumberSubtype[]
}

export interface NumberSubtype extends SubtypeBase {
	numberRange?: [number, number]
	projectedRange?: [number, number]
	step?: number
	unit?: string
}

export interface TextDPT extends DPTBase {
	type: 'text'
	subtypes?: TextSubtype[]
}

export interface TextSubtype extends SubtypeBase {
}

export interface SelectDPT extends DPTBase {
	type: 'select'
	subtypes?: SelectSubtype[]
	choices: { id: string, label: string }[]
}

export interface SelectSubtype extends SubtypeBase {
	choices: { id: string, label: string }[]
}

// Aggregate
export type DPT = BooleanDPT | NumberDPT | TextDPT | SelectDPT;
export type Subtype = BooleanSubtype | NumberSubtype | TextSubtype | SelectSubtype;
export const DPTs: DPT[] = [
	DPT1,
	DPT2,
	DPT3,
	DPT4,
	DPT5,
	DPT6,
	DPT7,
	DPT8,
	DPT9,
	DPT10,
	DPT11,
	DPT12,
	DPT13,
	DPT14,
	DPT16,
	DPT17,
	DPT18,
]
