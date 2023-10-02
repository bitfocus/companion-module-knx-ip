import {LogFunction} from './LogFunction'
import {ConnectionTeardown} from './ConnectionTeardown'
import * as knx from 'knx'
import EventEmitter from 'eventemitter3'

export type DptMap = { [key: string]: knx.Datapoint }
export type DptValueMap = { [key: string]: knx.KnxValue }

export class Connection extends EventEmitter {
	private connection?: knx.Connection
	private dpts: DptMap = {}
	private connected = false
	private dptValues: DptValueMap = {}

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
		const key = `${ga}-${dpt}`
		if (!(key in this.dpts)) {
			const dp = this.dpts[key] = new knx.Datapoint({ga, dpt, autoread: true}, this.connection)
			dp.on('change', (_oldValue, newValue) => {
				this.log('info', `onChange dpt ${ga}@${dpt} ➡ ${newValue}`)
				this.dptValues[key] = newValue
				this.onChanged()
			})
		}

		return this.dpts[key]
	}

	getLastValue(ga: string, dpt: string): knx.KnxValue | undefined {
		const key = `${ga}-${dpt}`
		return this.dptValues[key]
	}

	private onConnected(): void {
		this.log('info', '🟩 connected')
		this.connected = true
		this.emit('connected')
	}

	private onDisconnected(): void {
		this.log('info', '🟥 disconnected')
		this.emit('disconnected')

		if (this.connection) {
			ConnectionTeardown.unregisterConnection(this.connection)
		}
		this.connection = undefined
	}

	private onChanged(): void {
		this.log('info', 'ℹ️ value changed')
		this.emit('valueChanged')
	}
}
