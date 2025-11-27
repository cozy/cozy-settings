import React from 'react'

import Button from 'cozy-ui/transpiled/react/Button'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Typography from 'cozy-ui/transpiled/react/Typography'

const NextcloudAccountDialog = ({
  open,
  login,
  password,
  url,
  loading,
  error,
  onChangeLogin,
  onChangePassword,
  onChangeUrl,
  onSubmit,
  onClose
}) => {
  const handleSubmit = event => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <ConfirmDialog
      open={open}
      title="Nextcloud account"
      content={
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'grid', gap: 4 }}>
            <Typography variant="caption">Identifiant</Typography>
            <input
              type="text"
              value={login}
              onChange={e => onChangeLogin(e.target.value)}
              disabled={loading}
              style={{ padding: 8 }}
            />
          </label>

          <label style={{ display: 'grid', gap: 4, marginTop: 8 }}>
            <Typography variant="caption">Mot de passe</Typography>
            <input
              type="password"
              value={password}
              onChange={e => onChangePassword(e.target.value)}
              disabled={loading}
              style={{ padding: 8 }}
            />
          </label>

          <label style={{ display: 'grid', gap: 4, marginTop: 8 }}>
            <Typography variant="caption">
              Url de l&apos;instance Nextcloud
            </Typography>
            <input
              type="text"
              value={url}
              onChange={e => onChangeUrl(e.target.value)}
              disabled={loading}
              placeholder="https://mynextcloud.example.com"
              style={{ padding: 8 }}
            />
          </label>

          {error && (
            <Typography
              variant="caption"
              color="error"
              style={{ marginTop: 8, display: 'block' }}
            >
              {String(error)}
            </Typography>
          )}
        </form>
      }
      actions={
        <>
          <Button
            type="button"
            variant="secondary"
            size="small"
            disabled={loading}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="small"
            disabled={loading || !login || !password || !url.trim()}
            busy={loading}
            onClick={onSubmit}
          >
            {loading ? 'Connecting…' : 'Save account'}
          </Button>
        </>
      }
      onClose={onClose}
    />
  )
}

export default NextcloudAccountDialog
