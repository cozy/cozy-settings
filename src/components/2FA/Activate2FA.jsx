import React from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Button from 'cozy-ui/transpiled/react/Button'

import ActivationConfirmation from 'components/2FA/ActivationConfirmation'
import TwoFactorCode from 'components/2FA/TwoFactorCode'
import ActivationConfirmed from 'components/2FA/ActivationConfirmed'

export const Activate2FA = ({
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
}) => {
  const { t } = useI18n()
  return (
    <ConfirmDialog
      open
      onClose={closeTwoFAActivationModal}
      title={t(
        isTwoFactorEnabled && mailConfirmationCodeIsValid
          ? 'ProfileView.twofa.title.validation'
          : 'ProfileView.twofa.title.activate'
      )}
      size="m"
      actions={
        twoFactor.pending ? null : (
          <Button
            onClick={activate2FA}
            aria-busy={twoFactor.submitting}
            label={t('ProfileView.twofa.modal.button.activate')}
          />
        )
      }
      content={
        <>
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
        </>
      }
    />
  )
}

export default Activate2FA
