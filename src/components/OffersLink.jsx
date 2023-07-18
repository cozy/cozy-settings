import React from 'react'

import { ButtonLink } from 'cozy-ui/transpiled/react/deprecated/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { buildPremiumLink } from 'cozy-client/dist/models/instance'
import { useInstanceInfo } from 'hooks/useInstanceInfo'

import styles from 'styles/storage.styl'

const OffersLink = () => {
  const { t } = useI18n()

  const instance = useInstanceInfo()
  const link = buildPremiumLink(instance)

  if (link) {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          {t('StorageView.more_space')}
        </Typography>
        <ButtonLink
          theme="regular"
          className={styles['set-offer-button']}
          href={link}
          target
        >
          {t('StorageView.see_offer')}
        </ButtonLink>
      </>
    )
  }

  return null
}

export default OffersLink
