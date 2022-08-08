import { render } from '@testing-library/react'
import React from 'react'
import DataList from './DataList'
import AppLike from 'test/AppLike'

jest.mock('cozy-ui/transpiled/react', () => {
  return { useI18n: () => ({ t: x => x }) }
})

jest.mock('components/Page', () => {
  // eslint-disable-next-line react/display-name
  return ({ narrow, children }) => (
    <div data-testid="page" data-narrow={narrow}>
      {children}
    </div>
  )
})

jest.mock('components/PageTitle', () => {
  // eslint-disable-next-line react/display-name
  return ({ children }) => <div data-testid="page-title">{children}</div>
})

describe('DataList', () => {
  it('should display DataList title', () => {
    const { queryByText, container } = render(
      <AppLike>
        <DataList />
      </AppLike>
    )
    expect(container).toMatchSnapshot()
    expect(queryByText('Data')).toBeTruthy()
  })
})
