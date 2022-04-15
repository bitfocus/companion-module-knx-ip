import {LogFunction} from './LogFunction'
import {ConnectionTeardown} from './ConnectionTeardown'
import knx = require('knx')
import EventEmitter = require('events')

export type DptMap = { [key: string]: knx.Datapoint }

export class Connection extends EventEmitter {
	private connection?: knx.Connection
	private dpts: DptMap = {}
	private connected = false;

	constructor(private readonly log: LogFunction) {
		super()
	}

	get isConnected(): boolean {
		return this.connected;
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
			this.connected = false

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

	getOrCreateDpt(ga: string, dpt: string): knx.Datapoint {
		if (!(ga in this.dpts)) {
			this.dpts[ga] = new knx.Datapoint({ga, dpt}, this.connection)
		}

		return this.dpts[ga]
	}

	private onConnected(): void {
		this.log('info', '🟩 connected')
		this.connected = true
		this.emit('connected')
	}

	private onDisconnected(): void {
		this.log('info', '🟥 disconnected')
		this.emit('disconnected')

		ConnectionTeardown.unregisterConnection(this.connection)
		this.connection = undefined
	}
}
