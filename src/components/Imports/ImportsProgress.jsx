import React from 'react'

import { LinearProgress } from 'cozy-ui/transpiled/react/Progress'
import Stack from 'cozy-ui/transpiled/react/Stack'
import Typography from 'cozy-ui/transpiled/react/Typography'

const ImportsProgress = ({ title, progress, busy, status, summary }) => {
  const hasProgress = progress.total > 0

  return (
    <Stack spacing="s">
      <Typography variant="h5">{title}</Typography>

      {hasProgress && (
        <div style={{ maxWidth: 500 }}>
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

      {status && <Typography variant="caption">{status}</Typography>}

      {summary && <Typography variant="caption">{summary}</Typography>}
    </Stack>
  )
}

export default ImportsProgress
