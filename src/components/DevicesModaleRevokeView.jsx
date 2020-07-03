import React from 'react'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import Modal, { ModalContent } from 'cozy-ui/transpiled/react/Modal'

import ReactMarkdown from 'react-markdown'

import classNames from 'classnames'
import styles from 'styles/devicesModaleRevokeView'

const devicesModaleRevokeView = ({ t, device, revokeDevice, cancelAction }) => {
  return (
    <Modal
      title={t('revokeDevice.title')}
      primaryText={t('revokeDevice.validate')}
      primaryType="danger"
      primaryAction={() => revokeDevice(device.id)}
      secondaryText="cancel"
      secondaryAction={() => cancelAction()}
      dismissAction={() => cancelAction()}
    >
      <ModalContent className={styles['coz-modal-revoke-content']}>
        <ReactMarkdown
          source={t('revokeDevice.description', { name: device.client_name })}
        />
        <ReactMarkdown
          source={t('revokeDevice.subText')}
          className={classNames(styles['icon'], styles['icon-arrows'])}
        />
      </ModalContent>
    </Modal>
  )
}

export default translate()(devicesModaleRevokeView)
