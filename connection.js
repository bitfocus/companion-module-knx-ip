const knx = require('knx');
const exitHook = require('async-exit-hook');

const activeConnections = []

exitHook(cb => {
	if (activeConnections.length === 0) {
		cb()
		return
	}

	console.log('⚠️ Disconnecting', activeConnections.length, 'remaining KNX-Connections');
	Promise.all(activeConnections.map(connection => new Promise((resolve, reject) => {
		connection.disconnect(() => resolve())
	}))).then(() => {
		console.log('⚠️ All disconnected');
		cb()
	})
});

// for nodemon
exitHook.hookEvent('SIGUSR2', 0);

class KnxIpConnection {
	isConnecting = false
	isConnected = false
	connection = null

	onStateChanged = null

	constructor(log, onStateChangedFn) {
		this.log = log
		this.onStateChangedFn = onStateChangedFn
	}

	connect(ip) {
		this.disconnect(() => {
			this.log('🟨 connecting to', ip)

			this.isConnecting = true
			this.updateStatus()

			activeConnections.push(this)
			this.connection = knx.Connection({
				ipAddr: ip
			})

			this.connection.on('connected', () => this.onConnected());
			this.connection.on('disonnected', () => this.onDisconnected());
		})
	}

	onConnected() {
		this.log('🟩 connected')
		this.isConnecting = false
		this.isConnected = true
		this.updateStatus()
	}

	disconnect(cb) {
		if (this.isConnected || this.isConnecting) {
			this.log('🟧 disconnecting')
			this.connection.off() // Unlink all Event-Listeners
			this.connection.Disconnect(() => {
					this.onDisconnected()
					if (cb) cb();
				}
			)
		} else {
			if (cb) cb();
		}
	}

	onDisconnected() {
		this.log('🟥 disconnected')
		this.isConnected = false
		this.isConnecting = false
		this.updateStatus()

		activeConnections.splice(activeConnections.indexOf(this), 1)
	}

	updateStatus() {
		if (this.onStateChangedFn) {
			this.onStateChangedFn(this.isConnecting, this.isConnected)
		}
	}
}

exports = module.exports = KnxIpConnection
