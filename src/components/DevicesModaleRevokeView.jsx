import React from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Button from 'cozy-ui/transpiled/react/Button'

import ReactMarkdown from 'react-markdown'

import classNames from 'classnames'
import styles from 'styles/devicesModaleRevokeView'

const RevokeDeviceDialog = ({ device, revokeDevice, cancelAction }) => {
  const { t } = useI18n()
  return (
    <ConfirmDialog
      open
      title={t('revokeDevice.title')}
      actions={
        <>
          <Button
            label={t('revokeDevice.validate')}
            theme="danger"
            onClick={() => revokeDevice(device.id)}
          />
          <Button
            label={t('revokeDevice.cancel')}
            theme="secondary"
            onClick={() => cancelAction()}
          />
        </>
      }
      onClose={() => cancelAction()}
      content={
        <>
          <ReactMarkdown
            source={t('revokeDevice.description', { name: device.client_name })}
          />
          <ReactMarkdown
            source={t('revokeDevice.subText')}
            className={classNames(styles['icon'], styles['icon-arrows'])}
          />
        </>
      }
    />
  )
}

export default RevokeDeviceDialog
