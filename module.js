const instance_skel = require('../../instance_skel')
const KnxIpConnection = require('./connection')

class KnxIpModule extends instance_skel {
	customVariables = {}
	config = {}

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
		this.connection = new KnxIpConnection(this.debug, (isConnecting, isConnected) => this.updateStatus(isConnecting, isConnected));
		this.updateConfig(this.config)

		system.emit('custom_variables_get', variables => this.updateCustomVariables(variables))
		system.on('custom_variables_update', variables => this.updateCustomVariables(variables))

		//this.status(this.STATE_OK)
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
				type: 'textinput',
				id: 'ip',
				label: 'IP-Address of Gateway or Router',
				width: 12,
			},
		]
	}

	action(action) {

	}

	feedback(feedback, bank, info) {

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
}

exports = module.exports = KnxIpModule
