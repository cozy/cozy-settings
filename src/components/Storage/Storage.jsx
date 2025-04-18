import React from 'react'

import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import StorageContent from './StorageContent'

import Page from '@/components/Page'
import PageTitle from '@/components/PageTitle'
import { usePremium } from '@/components/Premium/PremiumProvider'

/**
 * Page to show remaining disk space
 */
const Storage = () => {
  const { t } = useI18n()

  const { isLoaded } = usePremium()

  return (
    <Page>
      <PageTitle>{t('StorageView.title')}</PageTitle>
      {isLoaded ? (
        <StorageContent />
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
