import React from 'react'

import Empty from 'cozy-ui/transpiled/react/Empty'
import { ButtonLink } from 'cozy-ui/transpiled/react/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import EmptyIcon from 'assets/icons/icon-devices.svg'

/**
 * Empty state to be displayed when no device is connected
 */
const NoDevicesMessage = () => {
  const { t } = useI18n()
  return (
    <Empty
      className="u-maw-6"
      icon={EmptyIcon}
      title={t('Empty.devices.title')}
      text={t('Empty.devices.text')}
    >
      <ButtonLink
        href={t('Empty.devices.link.href')}
        label={t('Empty.devices.link.text')}
      />
    </Empty>
  )
}

export default NoDevicesMessage
