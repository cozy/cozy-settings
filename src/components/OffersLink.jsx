import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { ButtonLink } from 'cozy-ui/transpiled/react/Button'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import viewStyles from 'styles/view'
import styles from 'styles/storage'

export class OffersLink extends PureComponent {
  render() {
    const { storageData, t } = this.props
    return storageData.offersLink ? (
      <div>
        <h3 className={viewStyles['set-view-subtitle']}>
          {t('StorageView.more_space')}
        </h3>
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
}

OffersLink.propTypes = {
  storageData: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
}

export default translate()(OffersLink)
