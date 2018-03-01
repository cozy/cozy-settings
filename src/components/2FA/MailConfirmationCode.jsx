import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Button } from 'cozy-ui/react/Button'

import viewStyles from '../../styles/view'
import styles from '../../styles/fields'
import ReactMarkdownWrapper from '../ReactMarkdownWrapper'
import Input from '../Input'

export const MailConfirmationCode = ({
  fields,
  t,
  checkMailConfirmationCode,
  closeTwoFAActivationModal,
  onChange,
  email
}) => (
  <div>
    <div>
      <h3>{t('ProfileView.twofa.modal.confirmation_title')}</h3>
      <ReactMarkdownWrapper
        source={
          t('ProfileView.twofa.modal.confirmation_description', {email: email})
        }
      />
    </div>
    <label className={styles['coz-form-label']}>{t('ProfileView.twofa.modal.code')}</label>
    <div className={viewStyles['set-view-content-twofa-modal-confirmation-input']}>
      <Input
        name='mail_confirmation_code'
        type='text'
        {...fields.mail_confirmation_code}
        onChange={onChange}
        submitting={false}
      />
      <div className={viewStyles['set-view-content-twofa-modal-nocode']}>
        <p>{t('ProfileView.twofa.modal.nocode')}</p>
        <p>{t('ProfileView.twofa.modal.nocode_claude')}<a href='mailto:claude@cozycloud.cc'>claude@cozycloud.cc</a></p>
      </div>
    </div>
    {
      !fields.email.value && <p className={styles['coz-form-errors']}>
        {t('ProfileView.twofa.modal.email')}
      </p>
    }
    <div className={viewStyles['set-view-content-twofa-modal-content-right-buttons']}>
      <Button
        onClick={closeTwoFAActivationModal}
        theme='secondary'
      >
        {t('ProfileView.twofa.modal.button.cancel')}
      </Button>
      <Button
        onClick={() => checkMailConfirmationCode(fields.mail_confirmation_code.value)}
        disabled={!fields.email.value}
      >
        {t('ProfileView.twofa.modal.button.validate')}
      </Button>
    </div>
  </div>
)

export default translate()(MailConfirmationCode)
