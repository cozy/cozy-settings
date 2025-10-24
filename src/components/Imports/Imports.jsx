import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button from 'cozy-ui/transpiled/react/Button'
import Switch from 'cozy-ui/transpiled/react/Switch'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
// Toggle -> Switch (dépréciation)

import { routes } from '../../constants/routes'

import Page from '@/components/Page'
import { setImportsEnabled } from '@/reducers/import'

const LS_KEY = 'settings_imports_enabled'

/**
 * Page to manage/import external data
 */
const Imports = () => {
  const { t } = useI18n()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Vu dans DevTools: reducer monté sous `importData`
  const reduxEnabled = useSelector(state => state.importData?.enabled ?? false)

  // Source locale, initialisée depuis Redux
  const [enabled, setEnabled] = useState(reduxEnabled)

  // Au montage: réhydrate depuis localStorage si présent et pousse dans Redux
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw != null) {
        const v = JSON.parse(raw) === true
        setEnabled(v)
        dispatch(setImportsEnabled(v))
      }
    } catch {
      /* ignore storage errors */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Si Redux change ailleurs, on reste synchro côté local
  useEffect(() => {
    setEnabled(reduxEnabled)
  }, [reduxEnabled])

  // Handler canonique pour Switch: on reçoit l’event, on lit target.checked
  const onSwitchClick = useCallback(
    ev => {
      const next = !!ev?.target?.checked
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(next))
      } catch {
        /* ignore storage errors */
      }
      setEnabled(next)
      dispatch(setImportsEnabled(next))
    },
    [dispatch]
  )

  return (
    <Page>
      <Typography variant="h3" gutterBottom>
        {t('ImportsView.title')}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {t('ImportsView.subtitle')}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {t('ImportsView.helper')}
      </Typography>

      <div
        style={{
          margin: '24px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}
      >
        <Switch checked={enabled} onClick={onSwitchClick} />
        <Typography variant="body1">{t('ImportsView.toggle')}</Typography>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <Button
          variant="primary"
          disabled={!enabled}
          onClick={() => navigate(routes.importsRun)}
        >
          {t('ImportsView.action_run')}
        </Button>
        <Button
          variant="secondary"
          disabled={!enabled}
          onClick={() => navigate(routes.importsHistory)}
        >
          {t('ImportsView.action_history')}
        </Button>
      </div>
    </Page>
  )
}

export { Imports }
export default Imports
