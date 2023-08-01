import React from 'react'

import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { isFlagshipApp } from 'cozy-device-helper'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { SubscriptionLink } from 'components/SubscriptionLink'

import Page from 'components/Page'
import PageTitle from 'components/PageTitle'

import { useInstanceInfo } from 'hooks/useInstanceInfo'
import { StorageProgress } from './StorageProgress'

/**
 * Page to show remaining disk space
 */
const Storage = () => {
  const { t } = useI18n()

  const { isLoaded } = useInstanceInfo()

  return (
    <Page narrow>
      <PageTitle>{t('StorageView.title')}</PageTitle>
      <Typography variant="h5" gutterBottom>
        {t('StorageView.storage_title')}
      </Typography>
      {isLoaded ? (
        <>
          <StorageProgress />
          {!isFlagshipApp() && (
            <Typography variant="h5" gutterBottom>
              {t('StorageView.more_space')}
            </Typography>
          )}
          <SubscriptionLink label={t('StorageView.see_offer')} />
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
