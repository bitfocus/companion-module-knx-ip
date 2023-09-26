import {Instance} from './Instance'
import {runEntrypoint} from '@companion-module/base'
import {CompanionStaticUpgradeScript} from '@companion-module/base/dist/module-api/upgrade'
import {Config} from './Config'

const upgradeScripts: CompanionStaticUpgradeScript<Config>[] = [
	// add update scripts here
]
runEntrypoint(Instance, upgradeScripts)
