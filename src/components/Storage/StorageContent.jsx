import React from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { StorageProgress } from './StorageProgress'

import { PremiumLink } from '@/components/Premium/PremiumLink'
import { usePremium } from '@/components/Premium/PremiumProvider'

const StorageContent = () => {
  const { canOpenPremiumLink } = usePremium()
  const { t } = useI18n()

  return (
    <>
      <StorageProgress />
      {canOpenPremiumLink ? (
        <Typography variant="h5" gutterBottom>
          {t('StorageView.more_space')}
        </Typography>
      ) : null}
      <PremiumLink label={t('StorageView.see_offer')} />
    </>
  )
}

export default StorageContent
