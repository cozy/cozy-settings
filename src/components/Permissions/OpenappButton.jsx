import React from 'react'
import CircleButton from 'cozy-ui/transpiled/react/CircleButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import OpenappIcon from 'cozy-ui/transpiled/react/Icons/Openapp'
import AppLinker, { generateWebLink } from 'cozy-ui/transpiled/react/AppLinker'
import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

export const OpenappButton = ({ type, matchingQueryResultData }) => {
  const { t } = useI18n()
  const client = useClient()
  const { subdomain: subDomainType } = client.getInstanceOptions()

  let appWebRef = ''
  let appData = ''
  if (type === 'konnector') {
    appWebRef =
      matchingQueryResultData &&
      generateWebLink({
        cozyUrl: client.getStackClient().uri,
        slug: 'home',
        subDomainType,
        nativePath: `connected/${matchingQueryResultData.slug}`
      })

    appData = matchingQueryResultData && matchingQueryResultData
  } else {
    appWebRef = matchingQueryResultData.links?.related
    appData = matchingQueryResultData
  }

  return (
    <AppLinker app={appData} href={appWebRef}>
      {({ onClick, href }) => (
        <CircleButton
          label={t('Permissions.open')}
          href={href}
          onClick={onClick}
        >
          <Icon icon={OpenappIcon} />
        </CircleButton>
      )}
    </AppLinker>
  )
}
