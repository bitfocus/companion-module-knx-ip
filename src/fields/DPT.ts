import {DPT1} from './DPT1'
import {DPT2} from './DPT2'
import {DPT3} from './DPT3'
import {DPT4} from './DPT4'
import {DPT5} from './DPT5'

/**
 * DPT <> Fields
 *
 * Field:
 *  id
 *  label
 *  specializaton (boolean, booleanLabels, …)
 *
 * DPT:
 *  valueFn
 *  subtypes
 *  ! specialization also (Type-Specific Subtypes)
 */


export type FieldValues = { [key: string]: any }
export type ValueFunction = (value: string, otherFields: FieldValues) => any;

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
	unit?: string
}

export interface TextField extends FieldBase {
	type: 'text'
}

export type Field = BooleanField | NumberField | TextField;

// DPTs
interface DPTBase {
	id: string;
	label: string;
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
	numberRange: [number, number]
	projectedRange?: [number, number]
	unit?: string
	subtypes?: NumberSubtype[]
}

export interface NumberSubtype extends SubtypeBase {
	numberRange?: [number, number]
	projectedRange?: [number, number]
	unit?: string
}

export interface TextDPT extends DPTBase {
	type: 'text'
	subtypes?: TextSubtype[]
}

export interface TextSubtype extends SubtypeBase {
}

// Aggregate
export type DPT = BooleanDPT | NumberDPT | TextDPT;
export type Subtype = BooleanSubtype | NumberSubtype | TextSubtype;
export const DPTs: DPT[] = [
	DPT1,
	DPT2,
	DPT3,
	DPT4,
	DPT5,
]
