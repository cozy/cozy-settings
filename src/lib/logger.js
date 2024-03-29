import minilog from '@cozy/minilog'

/**
 * @typedef {{ error: (...data: any[]) => void }} Logger
 * @type {Logger}
 */
const logger = minilog(`cozy-settings`)
minilog.enable()

minilog.suggest.allow(`cozy-settings`, 'log')
minilog.suggest.allow(`cozy-settings`, 'info')

export default logger
