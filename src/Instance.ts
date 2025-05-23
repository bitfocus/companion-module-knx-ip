import { Config, CONFIG_FIELDS } from './Config'
import { Connection } from './Connection'
import { FeedbackHandler } from './FeedbackHandler'
import { ActionHandler } from './ActionHandler'
import { InstanceBase, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'

export class Instance extends InstanceBase<Config> {
	private connection?: Connection
	private actionHandler: ActionHandler
	private feedbackHandler: FeedbackHandler

	async init(config: Config): Promise<void> {
		this.log('debug', '▶️ init')
		this.connection = new Connection(this.log.bind(this))
		this.connection.on('connecting', () => this.updateStatus(InstanceStatus.UnknownWarning, 'Connecting'))
		this.connection.on('connected', () => {
			this.updateStatus(InstanceStatus.Ok, 'Connected')
		})
		this.connection.on('disconnected', () => this.updateStatus(InstanceStatus.UnknownWarning, 'Disconnected'))
		this.connection.on('valueChanged', () => this.checkFeedbacks('recv'))

		this.actionHandler = new ActionHandler(this.log.bind(this), this.connection)
		this.setActionDefinitions(this.actionHandler.getActionDefinitions())

		this.feedbackHandler = new FeedbackHandler(this.log.bind(this), this.connection)
		this.setFeedbackDefinitions(this.feedbackHandler.getFeedbackDefinitions())

		await this.configUpdated(config)
	}

	async destroy(): Promise<void> {
		this.log('debug', '⏯ destroying')
		if (this.connection) {
			await this.connection.disconnect()
			this.log('debug', '⏹ destroyed')
		}
	}

	async configUpdated(config: Config): Promise<void> {
		this.log('debug', '💾 configUpdated=' + JSON.stringify(config))
		if (this.connection) {
			if (config.ipAddr) {
				await this.connection.connect(config.ipAddr)
			} else {
				await this.connection.disconnect()
			}
		}
	}

	public getConfigFields(): SomeCompanionConfigField[] {
		return CONFIG_FIELDS
	}
}
