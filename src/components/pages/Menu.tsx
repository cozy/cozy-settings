import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import Sidebar from 'components/Sidebar'

export const Menu = (): JSX.Element => {
  const { t } = useI18n()

  return (
    <Page className="u-m-0" withoutMarginTop>
      <PageTitle>{t('manifest.name')}</PageTitle>

      <Sidebar />
    </Page>
  )
}
