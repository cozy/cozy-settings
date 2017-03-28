import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

import Modal from 'cozy-ui/react/Modal'

import ReactMarkdown from 'react-markdown'

import classNames from 'classnames'
import styles from '../styles/devicesModaleRevokeView'

const devicesModaleRevokeView = ({ t, device, revokeDevice, cancelAction }) => {
  return (<Modal
    title={t('revokeDevice.title')}
    primaryText={t('revokeDevice.validate')}
    primaryType='danger'
    primaryAction={() => revokeDevice(device.id)}
    secondaryText='cancel'
    secondaryAction={() => cancelAction()}
    >
    <div className={classNames(styles['coz-modal-content'], styles['coz-modal-revoke-content'])}>
      <ReactMarkdown source={t('revokeDevice.description', {name: device.client_name})} />
      <ReactMarkdown source={t('revokeDevice.subText')} className={classNames(styles['icon'], styles['icon-arrows'])} />
    </div>
  </Modal>)
}

export default translate()(devicesModaleRevokeView)
