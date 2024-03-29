import React from 'react'

import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { PremiumLink } from 'components/Premium/PremiumLink'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { StorageProgress } from './StorageProgress'
import { usePremium } from 'components/Premium/PremiumProvider'

/**
 * Page to show remaining disk space
 */
const Storage = () => {
  const { t } = useI18n()

  const { isLoaded, canOpenPremiumLink } = usePremium()

  return (
    <Page narrow>
      <PageTitle>{t('StorageView.title')}</PageTitle>
      <Typography variant="h5" gutterBottom>
        {t('StorageView.storage_title')}
      </Typography>
      {isLoaded ? (
        <>
          <StorageProgress />
          {canOpenPremiumLink ? (
            <Typography variant="h5" gutterBottom>
              {t('StorageView.more_space')}
            </Typography>
          ) : null}
          <PremiumLink label={t('StorageView.see_offer')} />
        </>
      ) : (
        <Spinner
          className="u-pos-fixed-s"
          middle
          size="xxlarge"
          loadingType="loading"
        />
      )}
    </Page>
  )
}

export { Storage }
