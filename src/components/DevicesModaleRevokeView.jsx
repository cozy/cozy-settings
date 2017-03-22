import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'
import Modal from 'cozy-ui/react/Modal'

const devicesModaleRevokeView = ({ t, device, revokeDevice, cancelAction }) => {
  return (<Modal
    title={t('revokeDevice.title')}
    description={t('revokeDevice.description', {name: device.client_name})}
    subText={t('revokeDevice.subText')}
    cancelText='cancel'
    cancelAction={() => cancelAction()}
    validateText={t('revokeDevice.validate')}
    validateType='danger'
    validateAction={() => revokeDevice(device.id)}
  />)
}

export default translate()(devicesModaleRevokeView)
