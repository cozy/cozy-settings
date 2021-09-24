import minilog from '@cozy/minilog'

const logger = minilog(`cozy-settings`)
minilog.enable()

minilog.suggest.allow(`cozy-settings`, 'log')
minilog.suggest.allow(`cozy-settings`, 'info')

export default logger
