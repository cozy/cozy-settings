import React from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'cozy-ui/transpiled/react/Buttons'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const DeleteSection = () => {
  const { t } = useI18n()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('delete')
  }

  return (
    <div className="u-mt-2">
      <Typography variant="h5" gutterBottom>
        {t('DeleteAccount.title')}
      </Typography>
      <Typography variant="body1">{t('DeleteAccount.label')}</Typography>
      <Button
        className="u-mt-1"
        variant="secondary"
        color="error"
        label={t('DeleteAccount.button.label')}
        onClick={handleClick}
      />
    </div>
  )
}

export { DeleteSection }
