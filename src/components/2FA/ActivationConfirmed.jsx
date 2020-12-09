import React, { Fragment } from 'react'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Button } from 'cozy-ui/transpiled/react/Button'

import viewStyles from 'styles/view.styl'

export const ActivationConfirmed = ({
  t,
  closeTwoFAActivationModal,
  instance,
  cozyDomain
}) => (
  <Fragment>
    <h3>{t('ProfileView.twofa.modal.validation_title')}</h3>
    <p>{t('ProfileView.twofa.modal.validation_description')}</p>
    <p>{t('ProfileView.twofa.modal.validation_logs')}</p>
    <ul>
      <li>{instance && instance.data.attributes.email}</li>
      <li>{cozyDomain}</li>
    </ul>
    <div
      className={
        viewStyles['set-view-content-twofa-modal-content-right-buttons']
      }
    >
      <Button
        onClick={closeTwoFAActivationModal}
        label={t('ProfileView.twofa.modal.button.terminate')}
      />
    </div>
  </Fragment>
)

export default translate()(ActivationConfirmed)
