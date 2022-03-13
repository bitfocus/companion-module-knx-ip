import InstanceSkel = require('../../../instance_skel')
import {CompanionInputField} from '../../../instance_skel_types'
import {Config, CONFIG_FIELDS} from './Config'
import {Connection} from './Connection'
import {ACTIONS} from './Actions'
import {FEEDBACKS} from './Feedbacks'

export class Instance extends InstanceSkel<Config> {
	private connection?: Connection

	init(): void {
		this.log('debug', '▶️ init')
		this.connection = new Connection(this.log)
		this.connection.on('connecting', () => this.status(this.STATUS_WARNING, 'Connecting'))
		this.connection.on('connected', () => this.status(this.STATUS_OK, 'Connected'))
		this.connection.on('disconnected', () => this.status(this.STATUS_UNKNOWN, 'Disconnected'))

		this.updateConfig(this.config)
		this.setActions(ACTIONS)
		this.setFeedbackDefinitions(FEEDBACKS)
	}

	destroy(): void {
		this.log('debug', '⏯ destroying')
		if (this.connection) {
			this.connection.disconnect().then(() => {
				this.log('debug', '⏸ destroyed')
			})
		}
	}

	updateConfig(config: Config): void {
		this.log('debug', '🔁 updateConfig=' + JSON.stringify(config))
		if (config.ipAddr && this.connection) {
			this.connection.connect(config.ipAddr)
		}
	}

	config_fields(): CompanionInputField[] {
		return CONFIG_FIELDS
	}
}
