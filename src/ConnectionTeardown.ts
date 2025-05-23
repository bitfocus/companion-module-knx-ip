import * as knx from 'knx'
import AsyncExitHook from 'async-exit-hook'

AsyncExitHook(async cb => {
	await ConnectionTeardown.teardown()
	cb()
});

// for nodemon
AsyncExitHook.hookEvent('SIGUSR2', 0);

class ConnectionTeardownManager {
	private activeConnections: knx.Connection[] = []

	registerConnection(connection: knx.Connection): void {
		this.activeConnections.push(connection)
	}

	async teardown(): Promise<void> {
		console.log('⚠️ Disconnecting', this.activeConnections.length, 'remaining KNX-Connections');
		await this.disconnectAll().then(() => {
			console.log('⚠️ All disconnected');
		})
	}

	private async disconnectAll(): Promise<void> {
		await Promise.all(this.activeConnections.map(
			(connection, index) => this.disconnectOne(connection, index)
		))
	}

	private async disconnectOne(connection: knx.Connection, index: number): Promise<void> {
		console.log('⚠️ Disconnecting #' + index)
		return new Promise<void>((resolve, _reject) => {
			console.log('⚠️ Disconnected #' + index);
			connection.Disconnect(() => resolve(undefined))
		})
	}

	unregisterConnection(connection: knx.Connection) {
		const index = this.activeConnections.indexOf(connection)
		if (index !== -1) {
			this.activeConnections.splice(index, 1);
		}
	}
}

export const ConnectionTeardown = new ConnectionTeardownManager()
