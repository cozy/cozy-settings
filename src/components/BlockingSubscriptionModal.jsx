import React from 'react'

import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import Buttons from 'cozy-ui/transpiled/react/Buttons'

import { SubscriptionLink } from 'components/SubscriptionLink'

const BlockingSubscriptionModal = ({ onClose, reason }) => {
  const { t } = useI18n()

  return (
    <ConfirmDialog
      open
      title={t(`BlockingSubscriptionModal.title.${reason}`)}
      content={t(`BlockingSubscriptionModal.content.${reason}`)}
      actions={
        <>
          <SubscriptionLink
            label={t('BlockingSubscriptionModal.confirm')}
            fullWidth={false}
          />
          <Buttons
            label={t('BlockingSubscriptionModal.cancel')}
            variant="secondary"
            onClick={onClose}
          />
        </>
      }
      onClose={onClose}
    />
  )
}

export { BlockingSubscriptionModal }
