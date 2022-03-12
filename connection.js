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

function formatDpKey(group_addr, data_type) {
	return group_addr + '-' + data_type;
}

class KnxIpConnection {
	isConnecting = false
	isConnected = false
	connection = null
	dataPoints = {}
	feedbackState = {}

	onStateChangedFn = null
	onFeedbackChangedFn = null;

	constructor(log, onStateChangedFn, onFeedbackChangedFn) {
		this.log = log
		this.onStateChangedFn = onStateChangedFn
		this.onFeedbackChangedFn = onFeedbackChangedFn;
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

	send(config) {
		const dp = this.getOrCreateDatapoint(config.group_addr, config.data_type)
		let value = config.value
		if (config.data_type === 'DPT1') {
			value = (value === '1' || value.toLowerCase() === 'true')
		}
		if (config.data_type === 'DPT5') {
			value = parseInt(value)
		}

		console.log('dp.write', JSON.stringify(value))
		dp.write(value);
	}

	updateFeedbackListeners(listenerConfig) {
		listenerConfig.forEach(config => {
			this.getOrCreateDatapoint(config.group_addr, config.data_type || 'DPT1')
		})
	}

	getOrCreateDatapoint(group_addr, data_type) {
		const key = formatDpKey(group_addr, data_type)
		if (!(key in this.dataPoints)) {
			this.log('🔨 new dp', key)
			const dp = new knx.Datapoint({ga: group_addr, dpt: data_type, autoread: true}, this.connection);
			dp.on('change', (oldValue, newValue) => {
				this.log('💡 dp onChange', key, oldValue, '->', newValue, typeof newValue)
				this.feedbackState[key] = newValue;
				this.onFeedbackChangedFn()
			})
			this.dataPoints[key] = dp
		}

		return this.dataPoints[key];
	}

	getFeedbackState(config) {
		let group_addr = config.group_addr;
		let data_type = config.data_type || 'DPT1';
		const key = formatDpKey(group_addr, data_type)
		return this.feedbackState[key]
	}
}

exports = module.exports = KnxIpConnection
