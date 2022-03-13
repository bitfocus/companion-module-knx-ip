const instance_skel = require('../../instance_skel')
const KnxIpConnection = require('./connection')

function rgb(r, g, b) {
	return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff)
}

class KnxIpModule extends instance_skel {
	customVariables = {}
	config = {}

	// TODO extract field config
	DPT_SELECT_FIELD = {
		type: 'dropdown',
		label: 'Data-Type',
		id: 'data_type',
		default: 'DPT1',
		choices: [
			// TODO add subtypes
			{'id': 'DPT1', 'label': 'DPT1: 1-bit control'},
			{'id': 'DPT2', 'label': 'DPT2: 1-bit control w/prio'},
			{'id': 'DPT3', 'label': 'DPT3: 4-bit dimming/blinds'},
			{'id': 'DPT4', 'label': 'DPT4: 8-bit character'},
			{'id': 'DPT5', 'label': 'DPT5: 8-bit unsigned int'},
			{'id': 'DPT6', 'label': 'DPT6: 8-bit signed int'},
			{'id': 'DPT7', 'label': 'DPT7: 16-bit unsigned int'},
			{'id': 'DPT8', 'label': 'DPT8: 16-bit signed integer'},
			{'id': 'DPT9', 'label': 'DPT9: 16-bit floating point'},
			{'id': 'DPT10', 'label': 'DPT10: 24-bit time + day of week'},
			{'id': 'DPT11', 'label': 'DPT11: 24-bit date'},
			{'id': 'DPT12', 'label': 'DPT12: 32-bit unsigned int'},
			{'id': 'DPT13', 'label': 'DPT13: 32-bit signed int'},
			{'id': 'DPT14', 'label': 'DPT14: 32-bit floating point'},
			{'id': 'DPT15', 'label': 'DPT15: 32-bit access control'},
			{'id': 'DPT16', 'label': 'DPT16: ASCII string'},
			{'id': 'DPT17', 'label': 'DPT17: Scene number'},
			{'id': 'DPT18', 'label': 'DPT18: Scene control'},
			{'id': 'DPT19', 'label': 'DPT19: 8-byte Date and Time'},
		]
	}

	GROUP_ADDR_FIELD = {
		type: 'textwithvariables',
		label: 'Group Address',
		id: 'group_addr',
		default: '',
	}

	ACTIONS = {
		send: {
			label: 'Send Telegram to Group Address',
			options: [
				this.GROUP_ADDR_FIELD,
				this.DPT_SELECT_FIELD,
				{ // TODO make DPT dependant
					type: 'textwithvariables',
					label: 'Value to Send',
					id: 'value',
					default: '',
				}
			],
		}
	}

	FEEDBACKS = {
		recv: {
			type: 'boolean',
			label: 'Telegram received on Group Address',
			description: 'When a Telegram is Received on the given Group Address',
			style: {
				// The default style change for a boolean feedback
				// The user will be able to customise these values as well as the fields that will be changed
				color: rgb(0, 0, 0),
				bgcolor: rgb(255, 255, 255)
			},
			options: [
				this.GROUP_ADDR_FIELD,
				this.DPT_SELECT_FIELD
				// TODO add compare-value (DPT dependent) - equality, min or max
			],
			callback: (feedback) => {
				return this.checkFeedbackState(feedback)
			},
		},
		// TODO advanced feedback (dimming)
	}

	constructor(system, id, config) {
		super(system, id, config)
		this.config = config
	}

	static GetUpgradeScripts() {
		return []
	}

	updateCustomVariables(variables) {
		this.customVariables = variables
		this.debug('🔁 customVariables=', variables)
	}

	init() {
		this.debug('▶️ init')
		this.connection = new KnxIpConnection(this.debug,
			(isConnecting, isConnected) => this.updateStatus(isConnecting, isConnected),
			() => this.checkFeedbacks('recv'));
		this.updateConfig(this.config)

		system.emit('custom_variables_get', variables => this.updateCustomVariables(variables))
		system.on('custom_variables_update', variables => this.updateCustomVariables(variables))

		this.setActions(this.ACTIONS)
		this.setFeedbackDefinitions(this.FEEDBACKS)
		this.updateFeedbackListeners()
	}

	destroy() {
		this.debug('⏹ destroy')
		this.connection.disconnect()
	}

	updateConfig(config) {
		this.config = config;
		this.debug('🔁 updateConfig=', config)

		this.connection.connect(config['ip']);
	}

	// Return config fields for web config
	config_fields() {
		return [
			{
				type: 'textwithvariables',
				id: 'ip',
				label: 'IP-Address of Gateway or Router',
				width: 12,
			},
		]
	}

	action(action) {
		switch (action.action) {
			case 'send':
				// TODO convert value from string according to DPT
				this.connection.send(action.options);
				break
		}
	}

	checkFeedbackState(feedback) {
		this.updateFeedbackListeners()
		let st = this.connection.getFeedbackState(feedback.options);
		// TODO parse state from string according to DPT
		/*		if (feedback.options.data_type === 'DPT1') {
					st = parseInt(st) || (st === 'true')
				}
				*/
		this.debug('❓ feedbackState', feedback.options.group_addr, '=', st)
		return st
	}

	updateStatus(isConnecting, isConnected) {
		if (isConnecting) {
			this.status(this.STATUS_WARNING, 'Connecting')
		} else if (isConnected) {
			this.status(this.STATUS_OK, 'Connected')
		} else {
			this.status(this.STATUS_UNKNOWN, 'Disconnected')
		}
	}

	updateFeedbackListeners() {
		const feedbackConfig = this.getAllFeedbacks().map(feedback => feedback.options);
		this.debug('🪚 feedbackConfig', feedbackConfig)
		this.connection.updateFeedbackListeners(feedbackConfig)
	}
}

exports = module.exports = KnxIpModule
