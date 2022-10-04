import React from 'react'
import CircleButton from 'cozy-ui/transpiled/react/CircleButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import InfoIcon from 'cozy-ui/transpiled/react/Icons/Info'
import AppLinker, { generateWebLink } from 'cozy-ui/transpiled/react/AppLinker'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { useClient } from 'cozy-client'

export const AboutButton = ({ matchingQueryResultData }) => {
  const { t } = useI18n()
  const client = useClient()
  const { subdomain: subDomainType } = client.getInstanceOptions()
  const appWebRef =
    matchingQueryResultData &&
    generateWebLink({
      cozyUrl: client.getStackClient().uri,
      slug: 'store',
      subDomainType,
      nativePath: `discover/${matchingQueryResultData.slug}`
    })
  const appData = matchingQueryResultData && matchingQueryResultData

  return (
    <AppLinker app={appData} href={appWebRef}>
      {({ onClick, href }) => (
        <CircleButton
          label={t('Permissions.about')}
          href={href}
          onClick={onClick}
        >
          <Icon icon={InfoIcon} />
        </CircleButton>
      )}
    </AppLinker>
  )
}
