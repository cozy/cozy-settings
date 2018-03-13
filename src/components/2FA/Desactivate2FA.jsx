import React, { Fragment } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Button } from 'cozy-ui/react/Button'
import Modal, { ModalContent } from 'cozy-ui/react/Modal'

import viewStyles from '../../styles/view'

export const Desactivate2FA = ({
  t,
  desactivate2FA,
  closeTwoFADesactivationModal
}) => (
  <div className={viewStyles['set-view-content-twofa-modal-wrapper']}>
    <Modal
      dismissAction={closeTwoFADesactivationModal}
      className={viewStyles['set-view-content-twofa-modal']}
      title={t('ProfileView.twofa.title.desactivate')}
    >
      <ModalContent
        className={viewStyles['set-view-content-twofa-modal-content']}
      >
        <Fragment>
          <p><b>{t('ProfileView.twofa.modal.desactivate_title')}</b></p>
          <p>{t('ProfileView.twofa.modal.desactivate_description')}</p>
          <div className={viewStyles['set-view-content-twofa-modal-content-right-buttons']}>
            <Button
              onClick={closeTwoFADesactivationModal}
              theme='secondary'
              >
              {t('ProfileView.twofa.modal.button.cancel')}
            </Button>
            <Button
              onClick={desactivate2FA}
              theme='danger'
            >
              {t('ProfileView.twofa.modal.button.desactivate')}
            </Button>
          </div>
        </Fragment>
      </ModalContent>
    </Modal>
  </div>
)

export default translate()(Desactivate2FA)
