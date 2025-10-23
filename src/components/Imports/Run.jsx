import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useClient } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Button'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { nextcloudProvider } from './Providers/nextcloud/provider'

import Page from '@/components/Page'
import { routes } from '@/constants/routes'

const SERVICES = [
  { label: 'Nextcloud', slug: 'nextcloud' },
  { label: 'GoogleDrive', slug: 'googledrive' },
  { label: 'Dropbox', slug: 'dropbox' }
]

const ROOT_DIR_ID = 'io.cozy.files.root-dir'

const computeStoreURL = slug => {
  try {
    const url = new URL(window.location.href)
    const parts = url.hostname.split('.')
    if (parts[0] === 'settings') parts[0] = 'store'
    const origin = `${url.protocol}//${parts.join('.')}${
      url.port ? ':' + url.port : ''
    }`
    return `${origin}/#/discover/${encodeURIComponent(slug)}`
  } catch {
    return `/#/discover/${encodeURIComponent(slug)}`
  }
}

const Run = () => {
  const { t } = useI18n()
  const client = useClient()
  const navigate = useNavigate()
  const enabled = useSelector(state => state.importData?.enabled ?? false)

  const [serviceSlug, setServiceSlug] = useState('')
  const isNextcloud = serviceSlug === 'nextcloud'

  const [checkingAccount, setCheckingAccount] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [selectedAccountId, setSelectedAccountId] = useState('')

  const [remotePath, setRemotePath] = useState('/') // Nextcloud source
  const [targetDirId, setTargetDirId] = useState(ROOT_DIR_ID) // Cozy target

  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState(null)
  const [remotePreview, setRemotePreview] = useState([])

  const resetMsgs = useCallback(() => {
    setError(null)
    setStatus('')
    setRemotePreview([])
  }, [])

  useEffect(() => {
    resetMsgs()
    setSelectedAccountId('')
    setAccounts([])

    if (!enabled || !isNextcloud) return

    let aborted = false
    ;(async () => {
      setCheckingAccount(true)
      try {
        const docs = await nextcloudProvider.listAccounts(client)
        if (aborted) return
        setAccounts(docs)
        if (docs.length) setSelectedAccountId(docs[0]._id)
      } catch (e) {
        if (!aborted) setError(e?.message || 'Accounts fetch failed')
      } finally {
        if (!aborted) setCheckingAccount(false)
      }
    })()
    return () => {
      aborted = true
    }
  }, [client, enabled, isNextcloud, resetMsgs])

  const readError = async e => {
    try {
      const raw = await e?.response?.text()
      if (!raw) return e?.message || String(e)
      try {
        const j = JSON.parse(raw)
        return j?.errors?.[0]?.detail || j?.error || raw
      } catch {
        return raw
      }
    } catch {
      return e?.message || 'Error'
    }
  }

  const pickAccountId = async () => {
    if (selectedAccountId) return selectedAccountId
    const all = await nextcloudProvider.listAccounts(client)
    return all?.[0]?._id
  }

  const handleListRemote = async () => {
    resetMsgs()
    if (!isNextcloud) return
    setBusy(true)
    try {
      const accId = await pickAccountId()
      if (!accId) throw new Error('No Nextcloud account configured')
      const { kind, items, name } = await nextcloudProvider.probePath(
        client,
        accId,
        remotePath || '/'
      )
      if (kind === 'file') {
        setStatus(`Remote path is a file: ${name}`)
        setRemotePreview([name])
      } else {
        setStatus(
          `Remote list: ${items.length} item(s) at ${remotePath || '/'}`
        )
        const names = (items || [])
          .slice(0, 10)
          .map(it => it?.attributes?.name || it?.name || it?.path || 'unknown')
        // eslint-disable-next-line no-console
        console.log('[Nextcloud] list preview', names)
        setRemotePreview(names)
      }
    } catch (e) {
      setError(await readError(e))
    } finally {
      setBusy(false)
    }
  }

  const handleImport = async () => {
    resetMsgs()
    if (!isNextcloud) return
    if (!remotePath || !targetDirId) {
      setError('Missing path or target dir')
      return
    }
    setBusy(true)
    try {
      const accId = await pickAccountId()
      if (!accId) throw new Error('No Nextcloud account configured')

      setStatus('Analyzing path…')
      const summary = await nextcloudProvider.importPathRecursive(
        client,
        accId,
        remotePath || '/',
        targetDirId || ROOT_DIR_ID,
        { copy: true, maxDepth: 20 }
      )
      setStatus(
        `Imported files: ${summary.filesCopied}, folders created: ${summary.foldersCreated}`
      )
      if (summary.errors?.length) {
        setError(`Some items failed: ${summary.errors.length}`)
        // eslint-disable-next-line no-console
        console.warn('[Nextcloud] import errors', summary.errors)
      }
    } catch (e) {
      setError(await readError(e))
    } finally {
      setBusy(false)
    }
  }

  if (!enabled) {
    return (
      <Page>
        <Typography variant="h3" gutterBottom>
          {t('ImportsRun.title')}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t('ImportsRun.disabled_helper')}
        </Typography>
        <Button variant="primary" onClick={() => navigate(routes.imports)}>
          {t('ImportsRun.back_to_settings')}
        </Button>
      </Page>
    )
  }

  return (
    <Page>
      <Typography variant="h3" gutterBottom>
        {t('ImportsRun.title')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t('ImportsRun.helper')}
      </Typography>

      {/* Provider */}
      <div style={{ margin: '12px 0', maxWidth: 320 }}>
        <label style={{ display: 'grid', gap: 4 }}>
          <Typography variant="caption">Provider</Typography>
          <select
            style={{ padding: 8 }}
            value={serviceSlug}
            onChange={e => setServiceSlug(e.target.value)}
          >
            <option value="" disabled>
              Select a provider…
            </option>
            {SERVICES.map(s => (
              <option key={s.slug} value={s.slug}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Accounts */}
      <div style={{ margin: '12px 0' }}>
        <Typography variant="subtitle1" gutterBottom>
          Accounts
        </Typography>

        {!isNextcloud ? (
          <Typography variant="caption" color="textSecondary">
            Select Nextcloud to check connection.
          </Typography>
        ) : checkingAccount ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Spinner size="small" />
            <Typography variant="caption">Checking account…</Typography>
          </div>
        ) : accounts.length ? (
          <select
            style={{ padding: 8, minWidth: 320 }}
            value={selectedAccountId}
            onChange={e => setSelectedAccountId(e.target.value)}
            title={selectedAccountId}
          >
            {accounts.map(acc => {
              const label = acc?.auth?.login || acc?.label || acc?._id
              return (
                <option key={acc._id} value={acc._id}>
                  {label}
                </option>
              )
            })}
          </select>
        ) : (
          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Typography variant="caption" color="textSecondary">
              No Nextcloud account configured.
            </Typography>
            <Button
              size="small"
              variant="secondary"
              onClick={() =>
                window.location.assign(computeStoreURL('nextcloud'))
              }
            >
              Open Store to connect
            </Button>
          </div>
        )}
      </div>

      {/* Params + actions */}
      {isNextcloud && accounts.length > 0 && (
        <>
          <div
            style={{ display: 'grid', gap: 8, margin: '12px 0', maxWidth: 520 }}
          >
            <label style={{ display: 'grid', gap: 4 }}>
              <Typography variant="caption">Remote path (Nextcloud)</Typography>
              <input
                type="text"
                placeholder="/ or /Documents or /file.pdf"
                value={remotePath}
                onChange={e => setRemotePath(e.target.value)}
                disabled={busy}
                style={{ padding: 8 }}
              />
            </label>

            <label style={{ display: 'grid', gap: 4 }}>
              <Typography variant="caption">
                Target Cozy directory id
              </Typography>
              <input
                type="text"
                placeholder={ROOT_DIR_ID}
                value={targetDirId}
                onChange={e => setTargetDirId(e.target.value)}
                disabled={busy}
                style={{ padding: 8 }}
              />
            </label>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              flexWrap: 'wrap'
            }}
          >
            <Button
              variant="secondary"
              disabled={busy}
              onClick={handleListRemote}
            >
              {busy ? 'Working…' : 'List remote'}
            </Button>
            <Button
              variant="primary"
              disabled={busy || !remotePath || !targetDirId}
              onClick={handleImport}
            >
              {busy ? 'Importing…' : 'Import'}
            </Button>
          </div>
        </>
      )}

      {/* Preview */}
      {remotePreview.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <Typography variant="subtitle2" gutterBottom>
            Preview (first 10)
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {remotePreview.map((name, idx) => (
              <li key={`${name}-${idx}`} style={{ fontSize: 12 }}>
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Status / errors */}
      {status ? (
        <div style={{ marginTop: 12 }}>
          <Typography variant="caption">{status}</Typography>
        </div>
      ) : null}
      {error ? (
        <div style={{ marginTop: 8 }}>
          <Typography variant="caption" color="error">
            {String(error)}
          </Typography>
        </div>
      ) : null}
    </Page>
  )
}

export default Run
