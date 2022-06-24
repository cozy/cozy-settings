import React from 'react'

import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { useI18n } from 'cozy-ui/transpiled/react'

const Permissions = () => {
  const { t } = useI18n()
  return (
    <Page narrow>
      <PageTitle>{t('Permissions.title')}</PageTitle>
    </Page>
  )
}

export default Permissions
