import React from 'react'
import PropTypes from 'prop-types'

import { ButtonLink } from 'cozy-ui/transpiled/react/deprecated/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'

import styles from 'styles/storage.styl'

const OffersLink = props => {
  const { t } = useI18n()
  const { storageData } = props
  return storageData.offersLink ? (
    <div>
      <Typography variant="h5" gutterBottom>
        {t('StorageView.more_space')}
      </Typography>
      <ButtonLink
        theme="regular"
        className={styles['set-offer-button']}
        href={storageData.offersLink}
        target
      >
        {t('StorageView.see_offer')}
      </ButtonLink>
    </div>
  ) : null
}

OffersLink.propTypes = {
  storageData: PropTypes.object.isRequired
}

export default OffersLink
