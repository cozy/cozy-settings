import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Modal, { ModalContent } from 'cozy-ui/react/Modal'

import viewStyles from '../../styles/view'
import ActivationConfirmation from './ActivationConfirmation'
import MailConfirmationCode from './MailConfirmationCode'
import ActivationConfirmed from './ActivationConfirmed'

export const Activate2FA = ({
  t,
  activate2FA,
  checkMailConfirmationCode,
  mailConfirmationCodeRequested,
  mailConfirmationCodeIsValid,
  closeTwoFAActivationModal,
  fields,
  onChange,
  instance,
  cozyDomain,
  images
}) => (
  <div className={viewStyles['set-view-content-twofa-modal-wrapper']}>
    <Modal
      dismissAction={closeTwoFAActivationModal}
      className={viewStyles['set-view-content-twofa-modal']}
      title={
        t(fields.two_fa.value && mailConfirmationCodeIsValid
          ? 'ProfileView.twofa.title.validation'
          : 'ProfileView.twofa.title.activate'
        )
      }
    >
      <ModalContent
        className={viewStyles['set-view-content-twofa-modal-content']}
      >
        {mailConfirmationCodeRequested
        ? mailConfirmationCodeIsValid
          ? <ActivationConfirmed
            closeTwoFAActivationModal={closeTwoFAActivationModal}
            instance={instance}
            cozyDomain={cozyDomain}
            />
          : <MailConfirmationCode
            checkMailConfirmationCode={checkMailConfirmationCode}
            closeTwoFAActivationModal={closeTwoFAActivationModal}
            fields={fields}
            onChange={onChange}
            email={instance && instance.data.attributes.email}
          />
        : <ActivationConfirmation activate2FA={activate2FA} images={images} />}
      </ModalContent>
    </Modal>
  </div>
)

export default translate()(Activate2FA)
