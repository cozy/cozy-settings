import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import List from 'cozy-ui/transpiled/react/List'
import Paper from 'cozy-ui/transpiled/react/Paper'
import PaperIcon from 'cozy-ui/transpiled/react/Icons/Paper'
import CategoriesIcon from 'cozy-ui/transpiled/react/Icons/Categories'
import ShareCircleIcon from 'cozy-ui/transpiled/react/Icons/ShareCircle'
import DevicesIcon from 'cozy-ui/transpiled/react/Icons/Devices'
import LocationIcon from 'cozy-ui/transpiled/react/Icons/Location'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useInstanceInfo } from 'cozy-client'

import { SubscriptionFlagItem } from 'components/Subscription/SubscriptionFlagItem'
import { SubscriptionStorageItem } from 'components/Subscription/SubscriptionStorageItem'
import { SubscriptionLink } from 'components/SubscriptionLink'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { SubscriptionAccountsItem } from './SubscriptionAccountsItem'

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
              <SubscriptionAccountsItem />
              <SubscriptionFlagItem
                icon={PaperIcon}
                name="mespapiers.papers.max"
                hideWithoutFlag
              />
              <SubscriptionFlagItem
                icon={CategoriesIcon}
                name="drive.office.write"
              />
              <SubscriptionFlagItem
                icon={ShareCircleIcon}
                name="passwords.can-share-organizations"
              />
              <SubscriptionFlagItem
                icon={DevicesIcon}
                name="cozy.oauthclients.max"
                hideWithoutFlag
              />
              <SubscriptionFlagItem
                icon={LocationIcon}
                name="coachco2.max-days-to-capture"
                hideWithoutFlag
              />
            </List>
          </Paper>
          <SubscriptionLink
            className="u-mt-1"
            label={t('Subscription.action')}
          />
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
