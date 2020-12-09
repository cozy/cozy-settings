import React from 'react'
import ReactMarkdown from 'react-markdown'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Button from 'cozy-ui/transpiled/react/Button'
import { Media, Bd, Img } from 'cozy-ui/transpiled/react/Media'
import IconCircle2Arrows from '../assets/icons/IconCircle2Arrows'

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
          <Media>
            <Img className="u-mr-half">
              <IconCircle2Arrows />
            </Img>
            <Bd>
              <ReactMarkdown source={t('revokeDevice.subText')} />
            </Bd>
          </Media>
        </>
      }
    />
  )
}

export default RevokeDeviceDialog
