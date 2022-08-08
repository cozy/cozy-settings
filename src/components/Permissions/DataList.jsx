import React from 'react'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

const DataList = () => {
  const { t } = useI18n()
  return (
    <Page narrow>
      <PageTitle>{t('Permissions.data')}</PageTitle>
    </Page>
  )
}

export default DataList
