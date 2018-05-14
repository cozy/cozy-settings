/* eslint-disable */
import React from 'react'
import { translate } from 'cozy-ui/react/I18n'

import Modal, { ModalContent, ModalHeader } from 'cozy-ui/react/Modal'

export const ConfirmModal = props => {
  const { dismissAction, primaryAction, t } = props
  return (
    <Modal
      closable
      dismissAction={dismissAction}
      primaryAction={primaryAction}
      primaryText={t('DeleteAccount.modal.confirm.button.submit.label')}
      primaryType="danger"
      secondaryAction={dismissAction}
      secondaryText={t('DeleteAccount.modal.confirm.button.cancel.label')}
      size="small"
    >
      <ModalHeader>{t('DeleteAccount.modal.confirm.title')}</ModalHeader>
      <ModalContent>
        <ul>
          <li>{t('DeleteAccount.modal.confirm.description.line.1')}</li>
          <li>{t('DeleteAccount.modal.confirm.description.line.2')}</li>
          <li>{t('DeleteAccount.modal.confirm.description.line.3')}</li>
        </ul>
      </ModalContent>
    </Modal>
  );
};

export default translate()(ConfirmModal)
