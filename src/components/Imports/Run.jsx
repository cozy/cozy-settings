import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from 'cozy-ui/transpiled/react/Button'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import Page from '@/components/Page'
import { routes } from '@/constants/routes'

const Run = () => {
  const { t } = useI18n()
  const navigate = useNavigate()
  const enabled = useSelector(state => state.importData?.enabled ?? false)

  return (
    <Page>
      <Typography variant="h3" gutterBottom>
        {t('ImportsRun.title')}
      </Typography>
      {!enabled ? (
        <>
          <Typography variant="body1" gutterBottom>
            {t('ImportsRun.disabled_helper')}
          </Typography>
          <Button variant="primary" onClick={() => navigate(routes.imports)}>
            {t('ImportsRun.back_to_settings')}
          </Button>
        </>
      ) : (
        <>
          <Typography variant="body1" gutterBottom>
            {t('ImportsRun.helper')}
          </Typography>
          {/* Placeholder fournisseur — tu brancheras la vraie liste plus tard */}
          <div style={{ opacity: 0.7 }}>
            <Typography variant="caption">
              {t('ImportsRun.providers_placeholder')}
            </Typography>
          </div>
        </>
      )}
    </Page>
  )
}

export default Run
