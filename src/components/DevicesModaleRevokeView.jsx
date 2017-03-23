import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

import Modal from 'cozy-ui/react/Modal'

import ReactMarkdown from 'react-markdown'

import classNames from 'classnames'
import styles from '../styles/devicesModaleRevokeView'

const devicesModaleRevokeView = ({ t, device, revokeDevice, cancelAction }) => {
  const descriptionText = `${t('revokeDevice.description', {name: device.client_name})}\n\n${t('revokeDevice.subText')}`

  return (<Modal
    title={t('revokeDevice.title')}
    validateText={t('revokeDevice.validate')}
    validateType='danger'
    validateAction={() => revokeDevice(device.id)}
    cancelText='cancel'
    cancelType='secondary'
    cancelAction={() => cancelAction()}
    >
    <div className={classNames(styles['coz-modal-content'], styles['coz-modal-revoke-content'])}>
      <ReactMarkdown source={descriptionText} />
    </div>
  </Modal>)
}

export default translate()(devicesModaleRevokeView)
