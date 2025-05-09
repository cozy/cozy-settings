import React from 'react'

import Button from 'cozy-ui/transpiled/react/Buttons'
import CategoriesIcon from 'cozy-ui/transpiled/react/Icons/Categories'
import DevicesIcon from 'cozy-ui/transpiled/react/Icons/Devices'
import LocationIcon from 'cozy-ui/transpiled/react/Icons/Location'
import PaperIcon from 'cozy-ui/transpiled/react/Icons/Paper'
import ShareCircleIcon from 'cozy-ui/transpiled/react/Icons/ShareCircle'
import List from 'cozy-ui/transpiled/react/List'
import Paper from 'cozy-ui/transpiled/react/Paper'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { SubscriptionAccountsItem } from './SubscriptionAccountsItem'

import Page from '@/components/Page'
import PageTitle from '@/components/PageTitle'
import { usePremium } from '@/components/Premium/PremiumProvider'
import { SubscriptionFlagItem } from '@/components/Subscription/SubscriptionFlagItem'
import { SubscriptionStorageItem } from '@/components/Subscription/SubscriptionStorageItem'

/**
 * Page showing the features included in the user plan
 */
const Subscription = () => {
  const { t, lang } = useI18n()
  const { isLoaded } = usePremium()

  const linkLang = ['en', 'fr', 'es'].includes(lang) ? lang : 'en'

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
          <Button
            className="u-mt-1"
            component="a"
            target="_blank"
            href={`https://cozy.io/${linkLang}/pricing/`}
            label={t('Subscription.action')}
            fullWidth
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
