import React from 'react'

import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import Buttons from 'cozy-ui/transpiled/react/Buttons'

import ReactMarkdownWrapper from '@/components/ReactMarkdownWrapper'
import { PremiumLink } from '@/components/Premium/PremiumLink'

const BlockingSubscriptionModal = ({ onClose, onResume, reason, vendor }) => {
  const { t } = useI18n()

  return (
    <ConfirmDialog
      open
      title={t(`BlockingSubscriptionModal.title.${reason}`)}
      content={
        <ReactMarkdownWrapper
          source={t(`BlockingSubscriptionModal.content.${reason}`, {
            vendor: t(`BlockingSubscriptionModal.content.vendor.${vendor}`)
          })}
        />
      }
      actions={
        <>
          <Buttons
            label={t('BlockingSubscriptionModal.resume')}
            variant="secondary"
            onClick={onResume}
          />
          <PremiumLink
            label={t('BlockingSubscriptionModal.manage')}
            fullWidth={false}
          />
        </>
      }
      onClose={onClose}
    />
  )
}

export { BlockingSubscriptionModal }
