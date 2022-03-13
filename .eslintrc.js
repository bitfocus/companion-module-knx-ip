module.exports = {
	extends: './node_modules/@sofie-automation/code-standard-preset/eslint/main',
	overrides: [
		{
			files: ['*.ts'],
			rules: {},
		},
	],
	settings: {
		jest: {
			version: 'latest',
		},
	},
}
