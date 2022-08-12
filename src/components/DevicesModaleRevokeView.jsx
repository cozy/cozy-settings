import React, { useCallback } from 'react'
import ReactMarkdown from 'react-markdown'

import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Button from 'cozy-ui/transpiled/react/Button'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import IconCircle2Arrows from '../assets/icons/IconCircle2Arrows'
import { Media, Bd, Img } from 'cozy-ui/transpiled/react/Media'

import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'

import logger from 'lib/logger'

const RevokeDeviceDialog = ({ device, cancelAction, onDeviceRevoked }) => {
  const { t } = useI18n()
  const client = useClient()
  const revokeDevice = useCallback(async () => {
    try {
      await client.destroy(device)
    } catch (err) {
      logger.warn(err)
      return Alerter.error(t('revokeDevice.error'))
    }

    onDeviceRevoked()
  }, [client, device, onDeviceRevoked, t])

  return (
    <ConfirmDialog
      open
      title={t('revokeDevice.title')}
      actions={
        <>
          <Button
            label={t('revokeDevice.validate')}
            theme="danger"
            onClick={revokeDevice}
          />
          <Button
            label={t('revokeDevice.cancel')}
            theme="secondary"
            onClick={cancelAction}
          />
        </>
      }
      onClose={cancelAction}
      content={
        <>
          <Typography>
            {t('revokeDevice.description', { name: device.client_name })}
          </Typography>

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
