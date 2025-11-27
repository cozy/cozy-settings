import React from 'react'

import Stack from 'cozy-ui/transpiled/react/Stack'
import Typography from 'cozy-ui/transpiled/react/Typography'

const ImportErrors = ({ error, failedItems }) => {
  if (!error && (!failedItems || failedItems.length === 0)) {
    return null
  }

  return (
    <Stack spacing="xs">
      {error && (
        <Typography variant="caption" color="error">
          {String(error)}
        </Typography>
      )}

      {failedItems && failedItems.length > 0 && (
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
  )
}

export default ImportErrors
