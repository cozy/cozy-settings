import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Modal, { ModalContent } from 'cozy-ui/react/Modal'

import viewStyles from 'styles/view'
import ActivationConfirmation from 'components/2FA/ActivationConfirmation'
import TwoFactorCode from 'components/2FA/TwoFactorCode'
import ActivationConfirmed from 'components/2FA/ActivationConfirmed'

export const Activate2FA = ({
  t,
  activate2FA,
  checkTwoFactorCode,
  mailConfirmationCodeIsValid,
  closeTwoFAActivationModal,
  isTwoFactorEnabled,
  twoFactor,
  onChange,
  instance,
  cozyDomain,
  images
}) => (
  <div className={viewStyles['set-view-content-twofa-modal-wrapper']}>
    <Modal
      dismissAction={closeTwoFAActivationModal}
      className={viewStyles['set-view-content-twofa-modal']}
      title={t(
        isTwoFactorEnabled && mailConfirmationCodeIsValid
          ? 'ProfileView.twofa.title.validation'
          : 'ProfileView.twofa.title.activate'
      )}
      size="large"
    >
      <ModalContent
        className={viewStyles['set-view-content-twofa-modal-content']}
      >
        {twoFactor.pending ? (
          mailConfirmationCodeIsValid ? (
            <ActivationConfirmed
              closeTwoFAActivationModal={closeTwoFAActivationModal}
              instance={instance}
              cozyDomain={cozyDomain}
            />
          ) : (
            <TwoFactorCode
              checkTwoFactorCode={checkTwoFactorCode}
              closeTwoFAActivationModal={closeTwoFAActivationModal}
              onChange={onChange}
              twoFactor={twoFactor}
              email={instance && instance.data.attributes.email}
            />
          )
        ) : (
          <ActivationConfirmation
            activate2FA={activate2FA}
            images={images}
            twoFactor={twoFactor}
          />
        )}
      </ModalContent>
    </Modal>
  </div>
)

export default translate()(Activate2FA)
