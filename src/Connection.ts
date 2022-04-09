import {LogFunction} from './LogFunction'
import {ConnectionTeardown} from './ConnectionTeardown'
import knx = require('knx')
import EventEmitter = require('events')

export class Connection extends EventEmitter {
	private connection?: knx.Connection

	constructor(private readonly log: LogFunction) {
		super()
	}

	async connect(ipAddr: string): Promise<void> {
		await this.disconnect();

		this.log('info', '🟨 connecting to ' + ipAddr)
		this.emit('connecting')

		this.connection = new knx.Connection({ipAddr, manualConnect: true})
		ConnectionTeardown.registerConnection(this.connection)

		this.connection.on('connected', () => this.onConnected())
		this.connection.Connect()
	}

	async disconnect(): Promise<void> {
		if (this.connection) {
			this.log('info', '🟧 disconnecting')
			this.emit('disconnecting')

			return new Promise<void>(resolve => {
				this.connection!.off()
				this.connection!.Disconnect(() => {
					this.onDisconnected()
					resolve()
				})
			})
		} else {
			return Promise.resolve()
		}
	}

	private onConnected(): void {
		this.log('info', '🟩 connected')
		this.emit('connected')
	}

	private onDisconnected(): void {
		this.log('info', '🟥 disconnected')
		this.emit('disconnected')

		this.connection = undefined
	}
}
