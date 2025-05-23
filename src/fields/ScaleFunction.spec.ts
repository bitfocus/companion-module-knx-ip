import { scale } from './ScaleFunction'

test('unsigned', () => {
	expect(scale(0, [0, 255], [0, 100])).toBe(0)
	expect(scale(10, [0, 255], [0, 100])).toBe(26)
	expect(scale(25, [0, 255], [0, 100])).toBe(64)
	expect(scale(50, [0, 255], [0, 100])).toBe(128)
	expect(scale(75, [0, 255], [0, 100])).toBe(191)
	expect(scale(100, [0, 255], [0, 100])).toBe(255)
})

test('signed', () => {
	expect(scale(-50, [-128, 127], [-50, 50])).toBe(-128)
	expect(scale(-25, [-128, 127], [-50, 50])).toBe(-64)
	expect(scale(0, [-128, 127], [-50, 50])).toBe(-0)
	expect(scale(25, [-128, 127], [-50, 50])).toBe(63)
	expect(scale(50, [-128, 127], [-50, 50])).toBe(127)
})

test('unsigned-to-signed', () => {
	expect(scale(0, [-128, 127], [0, 100])).toBe(-128)
	expect(scale(25, [-128, 127], [0, 100])).toBe(-64)
	expect(scale(50, [-128, 127], [0, 100])).toBe(-0)
	expect(scale(75, [-128, 127], [0, 100])).toBe(63)
	expect(scale(100, [-128, 127], [0, 100])).toBe(127)
})
