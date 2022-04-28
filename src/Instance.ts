import InstanceSkel = require('../../../instance_skel')
import {CompanionInputField} from '../../../instance_skel_types'
import {Config, CONFIG_FIELDS} from './Config'
import {Connection} from './Connection'
import {FeedbackHandler} from './FeedbackHandler'
import {ActionHandler} from './ActionHandler'

export class Instance extends InstanceSkel<Config> {
	private connection?: Connection
	private actionHandler: ActionHandler
	private feedbackHandler: FeedbackHandler

	init(): void {
		this.log('debug', '▶️ init')
		this.connection = new Connection(this.log)
		this.connection.on('connecting', () => this.status(this.STATUS_WARNING, 'Connecting'))
		this.connection.on('connected', () => {
			this.status(this.STATUS_OK, 'Connected')
			this.feedbackHandler.updateWatches()
		})
		this.connection.on('disconnected', () => this.status(this.STATUS_UNKNOWN, 'Disconnected'))
		this.connection.on('valueChanged', () => this.checkFeedbacks('recv'))

		this.updateConfig(this.config)

		this.actionHandler = new ActionHandler(this.log, this.connection)
		this.setActions(this.actionHandler.getActionDefinitions())

		this.feedbackHandler = new FeedbackHandler(this.log, this.connection, () => this.getAllFeedbacks())
		this.setFeedbackDefinitions(this.feedbackHandler.getFeedbackDefinitions())
	}

	destroy(): void {
		this.log('debug', '⏯ destroying')
		if (this.connection) {
			this.connection.disconnect()
				.then(() => this.log('debug', '⏹ destroyed'))
		}
	}

	updateConfig(config: Config): void {
		this.log('debug', '🔁 updateConfig=' + JSON.stringify(config))
		if (this.connection) {
			if (config.ipAddr) {
				this.connection.connect(config.ipAddr)
			} else {
				this.connection.disconnect()
			}
		}
	}

	config_fields(): CompanionInputField[] {
		return CONFIG_FIELDS
	}
}
