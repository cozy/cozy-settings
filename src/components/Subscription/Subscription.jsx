import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import List from 'cozy-ui/transpiled/react/List'
import Paper from 'cozy-ui/transpiled/react/Paper'
import ExchangeIcon from 'cozy-ui/transpiled/react/Icons/Exchange'
import PaperIcon from 'cozy-ui/transpiled/react/Icons/Paper'
import CategoriesIcon from 'cozy-ui/transpiled/react/Icons/Categories'
import ShareCircleIcon from 'cozy-ui/transpiled/react/Icons/ShareCircle'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { isFlagshipApp } from 'cozy-device-helper'

import { SubscriptionFlagItem } from 'components/Subscription/SubscriptionFlagItem'
import { SubscriptionStorageItem } from 'components/Subscription/SubscriptionStorageItem'
import { useInstanceInfo } from 'hooks/useInstanceInfo'
import { SubscriptionLink } from 'components/SubscriptionLink'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'

/**
 * Page showing the features included in the user plan
 */
const Subscription = () => {
  const { t } = useI18n()

  const { isLoaded } = useInstanceInfo()

  return (
    <Page narrow>
      <PageTitle className="u-mb-2">{t('Subscription.title')}</PageTitle>
      {isLoaded ? (
        <>
          <Paper variant="outlined">
            <Typography variant="h5" className="u-ph-1 u-pt-1 u-pb-half">
              {t('Subscription.included.title')}
            </Typography>
            <List dense>
              <SubscriptionStorageItem />
              <SubscriptionFlagItem
                icon={ExchangeIcon}
                name="harvest.accounts.max"
              />
              <SubscriptionFlagItem
                icon={PaperIcon}
                name="mespapiers.papers.max"
              />
              <SubscriptionFlagItem
                icon={CategoriesIcon}
                name="drive.office.write"
              />
              <SubscriptionFlagItem
                icon={ShareCircleIcon}
                name="passwords.can-share-organizations"
              />
            </List>
          </Paper>
          {!isFlagshipApp() && (
            <SubscriptionLink
              className="u-mt-1"
              label={t('Subscription.action')}
            />
          )}
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

export { Subscription }
