import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useClient } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Button'
import { LinearProgress } from 'cozy-ui/transpiled/react/Progress'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Stack from 'cozy-ui/transpiled/react/Stack'
import TextField from 'cozy-ui/transpiled/react/TextField'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import {
  createNextcloudAccount,
  listNextcloudAccounts,
  deleteNextcloudAccount
} from './Providers/nextcloud/accountService'
import { nextcloudProvider } from './Providers/nextcloud/provider'

import { useImports } from '@/components/Imports/ImportsContext'
import Page from '@/components/Page'
import Select from '@/components/Select'
import { routes } from '@/constants/routes'

const SERVICES = [
  { label: 'Nextcloud', slug: 'nextcloud' },
  { label: 'GoogleDrive', slug: 'googledrive' },
  { label: 'Dropbox', slug: 'dropbox' }
]

const ROOT_DIR_ID = 'io.cozy.files.root-dir'
const IMPORTS_RUN_STATE_KEY = 'imports.run.state'

const loadRunState = () => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(IMPORTS_RUN_STATE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

const saveRunState = state => {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(IMPORTS_RUN_STATE_KEY, JSON.stringify(state))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to save imports run state:', err)
  }
}

const clearRunState = () => {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(IMPORTS_RUN_STATE_KEY)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to clear imports run state:', err)
  }
}

const Run = () => {
  const { t } = useI18n()
  const client = useClient()
  const navigate = useNavigate()
  const { enabled } = useImports()

  const persistedRef = useRef(null)
  if (persistedRef.current === null) {
    persistedRef.current = loadRunState() || {}
  }
  const persisted = persistedRef.current

  const [serviceSlug, setServiceSlug] = useState(persisted.serviceSlug || '')
  const isNextcloud = serviceSlug === 'nextcloud'

  const [checkingAccount, setCheckingAccount] = useState(false)
  const [accounts, setAccounts] = useState([])
  const [selectedAccountId, setSelectedAccountId] = useState(
    persisted.selectedAccountId || ''
  )

  const [remotePath, setRemotePath] = useState(persisted.remotePath || '/')

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

  useEffect(() => {
    if (!enabled) {
      clearRunState()
      abortRef.current = true
      return
    }

    saveRunState({
      serviceSlug,
      selectedAccountId,
      remotePath
    })
  }, [enabled, serviceSlug, selectedAccountId, remotePath])

  useEffect(() => {
    return () => {
      abortRef.current = true
    }
  }, [])

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
      if (!accId) {
        throw new Error('No Nextcloud account configured')
      }

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

      if (abortRef.current) {
        setStatus('Import stopped by user.')
        if (summary.filesCopied > 0) {
          setImportSummary(
            `Import stopped by user after copying ${summary.filesCopied} files.`
          )
        } else {
          setImportSummary('Import stopped by user.')
        }
      } else {
        setStatus('Import success.')
        setImportSummary(`Successfully imported ${summary.filesCopied} files.`)
      }

      if (summary.errors?.length) {
        setError(`Some items failed: ${summary.errors.length}`)
        setFailedItems(summary.errors)
      }
    } catch (e) {
      if (abortRef.current) {
        setStatus('Import stopped by user.')
      } else {
        setError(await readError(e))
      }
    } finally {
      setBusy(false)
      abortRef.current = false
      setAbortRequested(false)
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

  const handleDeleteNcAccount = async () => {
    if (!isNextcloud) return
    if (!selectedAccountId) return
    const account = accounts.find(a => a._id === selectedAccountId)
    if (!account) return

    setError(null)

    try {
      await deleteNextcloudAccount(client, account)
      const nextAccounts = accounts.filter(a => a._id !== selectedAccountId)
      setAccounts(nextAccounts)
      setSelectedAccountId(nextAccounts[0]?._id || '')
      setStatus('Nextcloud account deleted.')
    } catch (e) {
      setError(e?.message || 'Error while deleting Nextcloud account')
    }
  }

  const providerOptions = SERVICES.map(s => ({
    value: s.slug,
    label: s.label
  }))
  const providerValue = serviceSlug
    ? providerOptions.find(o => o.value === serviceSlug) || null
    : null
  const providerFieldProps = {
    title: t('ImportsRun.sections.provider.title', { _: 'Service' }),
    label: t('ImportsRun.sections.provider.helper', {
      _: 'Choisissez un service à partir duquel importer vos données.'
    })
  }

  const accountOptions = accounts.map(acc => {
    const label = acc?.auth?.login || acc?.label || acc?._id
    return { value: acc._id, label }
  })
  const accountValue = selectedAccountId
    ? accountOptions.find(o => o.value === selectedAccountId) || null
    : null

  if (!enabled) {
    return (
      <Page>
        <Stack spacing="m">
          <Typography variant="h3" gutterBottom>
            {t('ImportsRun.title')}
          </Typography>
          <Typography variant="body1">
            {t('ImportsRun.disabled_helper')}
          </Typography>
          <Button variant="primary" onClick={() => navigate(routes.imports)}>
            {t('ImportsRun.back_to_settings')}
          </Button>
        </Stack>
      </Page>
    )
  }

  return (
    <Page>
      <Stack spacing="l">
        <Stack spacing="s">
          <Typography variant="h3" gutterBottom>
            {t('ImportsRun.title')}
          </Typography>
          <Typography variant="body1">{t('ImportsRun.helper')}</Typography>
        </Stack>
        <Stack spacing="m">
          <Select
            name="provider"
            options={providerOptions}
            fieldProps={providerFieldProps}
            value={providerValue}
            onChange={sel => {
              setServiceSlug(sel ? sel.value : '')
            }}
            isSearchable={false}
          />
        </Stack>
        <Stack spacing="m">
          <Stack spacing="xs">
            <Typography variant="h5">
              {t('ImportsRun.sections.account.title', {
                _: 'Compte Nextcloud'
              })}
            </Typography>
            <Typography variant="body1">
              {t('ImportsRun.sections.account.helper', {
                _: 'Sélectionnez ou créez un compte Nextcloud pour lancer un import.'
              })}
            </Typography>
          </Stack>

          {!isNextcloud ? (
            <Typography variant="caption" color="textSecondary">
              Select Nextcloud to check connection.
            </Typography>
          ) : (
            <Stack spacing="s">
              {checkingAccount ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Spinner size="small" />
                  <Typography variant="caption">Checking account…</Typography>
                </div>
              ) : accounts.length ? (
                <>
                  <Select
                    name="nextcloudAccount"
                    options={accountOptions}
                    fieldProps={{
                      title: '',
                      label: ''
                    }}
                    value={accountValue}
                    onChange={sel => {
                      setSelectedAccountId(sel ? sel.value : '')
                    }}
                    isSearchable={false}
                  />
                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                      flexWrap: 'wrap'
                    }}
                  >
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
                    <Button
                      size="small"
                      variant="secondary"
                      disabled={!selectedAccountId}
                      onClick={handleDeleteNcAccount}
                    >
                      Delete selected account
                    </Button>
                  </div>
                </>
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
                    marginTop: 8,
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
            </Stack>
          )}
        </Stack>

        {isNextcloud && accounts.length > 0 && (
          <Stack spacing="m">
            <Stack spacing="xs">
              <Typography variant="h5">
                {t('ImportsRun.sections.path.title', {
                  _: 'Chemin à importer'
                })}
              </Typography>
              <Typography variant="body1">
                {t('ImportsRun.sections.path.helper', {
                  _: 'Le contenu sera copié dans Imports/Nextcloud/<login> dans Twake Drive.'
                })}
              </Typography>
            </Stack>

            <div style={{ maxWidth: 520 }}>
              <TextField
                name="remotePath"
                fullWidth
                label="Remote path (Nextcloud)"
                placeholder="/ or /Documents or /file.pdf"
                disabled={busy}
                value={remotePath}
                onChange={e => setRemotePath(e.target.value)}
              />
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
                variant="primary"
                disabled={busy || !remotePath}
                onClick={handleImport}
              >
                {busy ? 'Importing…' : 'Import'}
              </Button>
              <Button
                variant="secondary"
                disabled={busy}
                onClick={handleListRemote}
              >
                {busy ? 'Working…' : 'List remote'}
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
          </Stack>
        )}

        {(progress.total > 0 ||
          remotePreview.length > 0 ||
          status ||
          importSummary ||
          error ||
          failedItems.length > 0) && (
          <Stack spacing="m">
            {(progress.total > 0 || status || importSummary) && (
              <Stack spacing="s">
                <Typography variant="h5">
                  {t('ImportsRun.sections.progress.title', {
                    _: 'Progression'
                  })}
                </Typography>

                {progress.total > 0 && (
                  <div style={{ maxWidth: 500 }}>
                    <LinearProgress
                      variant="determinate"
                      value={
                        progress.total === 0
                          ? 0
                          : Math.min(
                              100,
                              (progress.done / progress.total) * 100
                            )
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
                      <Typography variant="caption">
                        Total: {progress.total}
                      </Typography>
                    </div>
                    {busy && progress.current && (
                      <Typography variant="caption">
                        Processing: {progress.current}
                      </Typography>
                    )}
                  </div>
                )}

                {status && <Typography variant="caption">{status}</Typography>}

                {importSummary && (
                  <Typography variant="caption">{importSummary}</Typography>
                )}
              </Stack>
            )}

            {remotePreview.length > 0 && (
              <Stack spacing="xs">
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
              </Stack>
            )}

            {(error || failedItems.length > 0) && (
              <Stack spacing="xs">
                {error && (
                  <Typography variant="caption" color="error">
                    {String(error)}
                  </Typography>
                )}

                {failedItems.length > 0 && (
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
                )}
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
    </Page>
  )
}

export default Run
