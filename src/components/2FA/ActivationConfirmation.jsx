import React, { Fragment } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Button } from 'cozy-ui/react/Button'

import viewStyles from '../../styles/view'
import styles from '../../styles/fields'
import ReactMarkdownWrapper from '../ReactMarkdownWrapper'

export const ActivationConfirmation = ({
  t,
  activate2FA,
  images,
  twoFactor
}) => (
  <Fragment>
    <img
      alt={t('ProfileView.twofa.title.activate')}
      src={images.twoFaModalBanner}
    />
    <h3>{t('ProfileView.twofa.modal.protect')}</h3>
    <p>
      <ReactMarkdownWrapper
        source={
          t('ProfileView.twofa.modal.change', {link: 'https://support.cozy.io/article/114-doubleauthentification'})
        }
      />
    </p>
    <div className={viewStyles['set-view-content-twofa']}>
      <div className={viewStyles['set-view-content-twofa-point']}>
        <img
          className={viewStyles['set-view-content-twofa-point-image']}
          alt="{t('ProfileView.twofa.modal.secu_title')}"
          src={images.twoFaModalSecu}
        />
        <div>
          <b>{t('ProfileView.twofa.modal.secu_title')}</b>
          <p>{t('ProfileView.twofa.modal.secu_description')}</p>
        </div>
      </div>
      <div className={viewStyles['set-view-content-twofa-point']}>
        <img
          className={viewStyles['set-view-content-twofa-point-image']}
          alt="{t('ProfileView.twofa.modal.protect_title')}"
          src={images.twoFaModalProtect}
        />
        <div>
          <b>{t('ProfileView.twofa.modal.protect_title')}</b>
          <p>{t('ProfileView.twofa.modal.protect_description')}</p>
        </div>
      </div>
    </div>
    {twoFactor.error && <p className={styles['coz-form-errors']}>
        {t(twoFactor.error)}
      </p>
    }
    <div className={viewStyles['set-view-content-twofa-modal-content-button']}>
      <Button
        onClick={activate2FA}
        aria-busy={twoFactor.submitting}
      >
        <span>
          {t('ProfileView.twofa.modal.button.activate')}
        </span>
      </Button>
    </div>
  </Fragment>
)

export default translate()(ActivationConfirmation)
