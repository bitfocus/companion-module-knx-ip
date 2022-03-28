type Range = [number, number]

export function scale(value: number, range: Range, projected?: Range): number {
	if (projected) {
		let result = (value - projected[0]) / (projected[1] - projected[0]) * range[1] + range[0]
		console.log('scaling', value, 'through', projected, 'to', range, ' = ', result)
		return result
	}

	return value
}
