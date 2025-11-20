import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useClient } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Button'
import { LinearProgress } from 'cozy-ui/transpiled/react/Progress'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import {
  createNextcloudAccount,
  listNextcloudAccounts
} from './Providers/nextcloud/accountService'
import { nextcloudProvider } from './Providers/nextcloud/provider'

import Page from '@/components/Page'
import { routes } from '@/constants/routes'

const SERVICES = [
  { label: 'Nextcloud', slug: 'nextcloud' },
  { label: 'GoogleDrive', slug: 'googledrive' },
  { label: 'Dropbox', slug: 'dropbox' }
]

const ROOT_DIR_ID = 'io.cozy.files.root-dir'

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

  const [remotePath, setRemotePath] = useState('/')

  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState(null)
  const [remotePreview, setRemotePreview] = useState([])
  const [failedItems, setFailedItems] = useState([])

  const [progress, setProgress] = useState({ total: 0, done: 0, current: '' })
  const [abortRequested, setAbortRequested] = useState(false)
  const abortRef = useRef(false)

  const [importSummary, setImportSummary] = useState('')

  const [showNcForm, setShowNcForm] = useState(false)
  const [ncLogin, setNcLogin] = useState('')
  const [ncPassword, setNcPassword] = useState('')
  const [ncUrl, setNcUrl] = useState('https://mynextcloud.example.com')
  const [ncError, setNcError] = useState(null)
  const [ncLoading, setNcLoading] = useState(false)

  const resetMsgs = useCallback(() => {
    setError(null)
    setStatus('')
    setRemotePreview([])
    setFailedItems([])
    setProgress({ total: 0, done: 0, current: '' })
    setAbortRequested(false)
    abortRef.current = false
    setImportSummary('')
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
    if (!remotePath) {
      setError('Missing remote path')
      return
    }

    abortRef.current = false
    setAbortRequested(false)
    setBusy(true)

    try {
      const accId = await pickAccountId()
      if (!accId) throw new Error('No Nextcloud account configured')

      let accDoc = accounts.find(a => a._id === accId)
      if (!accDoc) {
        const all = await nextcloudProvider.listAccounts(client)
        accDoc = all.find(a => a._id === accId)
      }
      const login = accDoc?.auth?.login || accDoc?.label || accId

      const destId = await nextcloudProvider.ensureImportsDestination(
        client,
        'Nextcloud',
        login
      )

      setStatus('Analyzing path…')

      const summary = await nextcloudProvider.importPathRecursive(
        client,
        accId,
        remotePath || '/',
        destId || ROOT_DIR_ID,
        {
          copy: true,
          maxDepth: 20,
          onDiscovered: ({ files = 0 }) =>
            setProgress(prev => ({
              ...prev,
              total: prev.total + (files || 0)
            })),
          onProcessed: ({ path }) =>
            setProgress(prev => ({
              ...prev,
              done: prev.done + 1,
              current: path
            })),
          isAborted: () => abortRef.current
        }
      )

      setImportSummary(`Successfully imported ${summary.filesCopied} files.`)

      if (abortRef.current) {
        setStatus('Import stopped by user.')
      } else {
        setStatus('Import success.')
      }

      if (summary.errors?.length) {
        setError(`Some items failed: ${summary.errors.length}`)
        setFailedItems(summary.errors)
      }
    } catch (e) {
      setError(await readError(e))
    } finally {
      setBusy(false)
      abortRef.current = false
    }
  }

  const handleCreateNcAccount = async e => {
    e.preventDefault()
    if (!isNextcloud) return
    setNcError(null)
    setNcLoading(true)
    try {
      const account = await createNextcloudAccount(client, {
        login: ncLogin,
        password: ncPassword,
        url: ncUrl
      })
      const docs = await listNextcloudAccounts(client)
      setAccounts(docs)
      const newId =
        account?._id || (docs && docs.length ? docs[0]._id : '') || ''
      if (newId) {
        setSelectedAccountId(newId)
      }
      setShowNcForm(false)
      setNcPassword('')
    } catch (e2) {
      setNcError(e2?.message || 'Error while creating Nextcloud account')
    } finally {
      setNcLoading(false)
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

      <div style={{ margin: '12px 0' }}>
        <Typography variant="subtitle1" gutterBottom>
          Accounts
        </Typography>

        {!isNextcloud ? (
          <Typography variant="caption" color="textSecondary">
            Select Nextcloud to check connection.
          </Typography>
        ) : (
          <>
            {checkingAccount ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Spinner size="small" />
                <Typography variant="caption">Checking account…</Typography>
              </div>
            ) : accounts.length ? (
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}
              >
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
                <Button
                  size="small"
                  variant="secondary"
                  onClick={() => {
                    setShowNcForm(true)
                    setNcError(null)
                  }}
                >
                  Add account
                </Button>
              </div>
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
                  onClick={() => {
                    setShowNcForm(true)
                    setNcError(null)
                  }}
                >
                  Create Nextcloud account
                </Button>
              </div>
            )}

            {showNcForm && (
              <form
                onSubmit={handleCreateNcAccount}
                style={{
                  marginTop: 12,
                  maxWidth: 420,
                  display: 'grid',
                  gap: 8
                }}
              >
                <label style={{ display: 'grid', gap: 4 }}>
                  <Typography variant="caption">Identifiant</Typography>
                  <input
                    type="text"
                    value={ncLogin}
                    onChange={e => setNcLogin(e.target.value)}
                    disabled={ncLoading}
                    style={{ padding: 8 }}
                  />
                </label>

                <label style={{ display: 'grid', gap: 4 }}>
                  <Typography variant="caption">Mot de passe</Typography>
                  <input
                    type="password"
                    value={ncPassword}
                    onChange={e => setNcPassword(e.target.value)}
                    disabled={ncLoading}
                    style={{ padding: 8 }}
                  />
                </label>

                <label style={{ display: 'grid', gap: 4 }}>
                  <Typography variant="caption">
                    Url de l&apos;instance Nextcloud
                  </Typography>
                  <input
                    type="text"
                    value={ncUrl}
                    onChange={e => setNcUrl(e.target.value)}
                    disabled={ncLoading}
                    placeholder="https://mynextcloud.example.com"
                    style={{ padding: 8 }}
                  />
                </label>

                {ncError && (
                  <Typography variant="caption" color="error">
                    {String(ncError)}
                  </Typography>
                )}

                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center',
                    marginTop: 4
                  }}
                >
                  <Button
                    type="submit"
                    variant="primary"
                    size="small"
                    disabled={
                      ncLoading || !ncLogin || !ncPassword || !ncUrl.trim()
                    }
                  >
                    {ncLoading ? 'Connecting…' : 'Save account'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    disabled={ncLoading}
                    onClick={() => {
                      setShowNcForm(false)
                      setNcError(null)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </>
        )}
      </div>

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
              disabled={busy || !remotePath}
              onClick={handleImport}
            >
              {busy ? 'Importing…' : 'Import'}
            </Button>
            {busy && progress.total > 0 && (
              <Button
                variant="secondary"
                size="small"
                disabled={abortRequested}
                onClick={() => {
                  abortRef.current = true
                  setAbortRequested(true)
                  setStatus('Stopping import…')
                }}
              >
                Stop import
              </Button>
            )}
          </div>
        </>
      )}

      {progress.total > 0 && (
        <div style={{ marginTop: 20, maxWidth: 500 }}>
          <LinearProgress
            variant="determinate"
            value={
              progress.total === 0
                ? 0
                : Math.min(100, (progress.done / progress.total) * 100)
            }
            className="u-mv-half u-w-100 u-h-half u-bdrs-6"
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 4
            }}
          >
            <Typography variant="caption">
              Processed: {progress.done}
            </Typography>
            <Typography variant="caption">Total: {progress.total}</Typography>
          </div>
          {busy && progress.current && (
            <Typography variant="caption">
              Processing: {progress.current}
            </Typography>
          )}
        </div>
      )}

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

      {status && (
        <div style={{ marginTop: 12 }}>
          <Typography variant="caption">{status}</Typography>
        </div>
      )}

      {importSummary && (
        <div style={{ marginTop: 8 }}>
          <Typography variant="caption">{importSummary}</Typography>
        </div>
      )}

      {error && (
        <div style={{ marginTop: 8 }}>
          <Typography variant="caption" color="error">
            {String(error)}
          </Typography>
        </div>
      )}

      {failedItems.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {failedItems.map((item, idx) => {
              const path = item.path || item.name || 'unknown'
              const statusCode =
                typeof item.status === 'number' ? item.status : 'n/a'
              const reason = item.reason || ''
              return (
                <li key={idx} style={{ fontSize: 11 }}>
                  {path} - {statusCode} ({reason})
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </Page>
  )
}

export default Run
