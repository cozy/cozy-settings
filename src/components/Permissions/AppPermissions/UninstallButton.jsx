import React from 'react'
import CircleButton from 'cozy-ui/transpiled/react/CircleButton'
import Icon from 'cozy-ui/transpiled/react/Icon'
import TrashIcon from 'cozy-ui/transpiled/react/Icons/Trash'
import AppLinker from 'cozy-ui/transpiled/react/AppLinker'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { useClient, generateWebLink } from 'cozy-client'

export const UninstallButton = ({ appData }) => {
  const { t } = useI18n()
  const client = useClient()
  const { subdomain: subDomainType } = client.getInstanceOptions()
  const appWebRef =
    appData &&
    generateWebLink({
      cozyUrl: client.getStackClient().uri,
      slug: 'store',
      subDomainType,
      hash: `discover/${appData.slug}/uninstall`
    })

  return (
    <AppLinker app={appData} href={appWebRef}>
      {({ onClick, href }) => (
        <CircleButton
          label={t('Permissions.uninstall')}
          href={href}
          onClick={onClick}
        >
          <Icon icon={TrashIcon} />
        </CircleButton>
      )}
    </AppLinker>
  )
}
