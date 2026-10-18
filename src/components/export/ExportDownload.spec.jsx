import { render, screen } from '@testing-library/react'
import React from 'react'

import ExportDownload from './ExportDownload'
import AppLike from 'test/AppLike'

describe('ExportDownload', () => {
  it('renders the download buttons of a fetched export', () => {
    render(
      <AppLike>
        <ExportDownload
          exportId="export-id"
          parent="/profile"
          fetchExportData={jest.fn()}
          exportData={{
            isFetching: false,
            data: { attributes: { parts_cursors: ['cursor-1'] } }
          }}
        />
      </AppLike>
    )

    expect(screen.getByText('Download (part 0)')).toBeInTheDocument()
    expect(screen.getByText('Download (part 1)')).toBeInTheDocument()
  })
})
