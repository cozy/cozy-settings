import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import PermissionsTab from './PermissionsTab'

jest.mock('cozy-ui/transpiled/react/I18n/withLocales', () => {
  return () => Component => {
    const t = text => text
    const match = { params: { page: 'slug' } }
    // eslint-disable-next-line react/display-name
    return () => <Component match={match} t={t} />
  }
})

jest.mock('react-router-dom', () => {
  return {
    useParams: () => ({ page: 'slug' })
  }
})

jest.mock('cozy-client')

jest.mock('cozy-ui/transpiled/react/MuiTabs', () => {
  return {
    Tabs: ({ value, onChange, children }) => (
      <button
        value={value}
        onClick={event => onChange(event, 'data')}
        data-testid="tabs"
      >
        {children}
      </button>
    ),
    Tab: ({ value, label, href, id, 'aria-controls': ariaControls }) => (
      <div
        data-testid="tab"
        value={value}
        label={label}
        href={href}
        id={id}
        aria-controls={ariaControls}
      ></div>
    )
  }
})

jest.mock('./AppList', () => {
  // eslint-disable-next-line react/display-name
  return () => <div data-testid="AppList"></div>
})

jest.mock('./DataList', () => {
  // eslint-disable-next-line react/display-name
  return () => <div data-testid="DataList"></div>
})

describe('PermissionsTab', () => {
  it('should match snapshot', () => {
    const { container } = render(<PermissionsTab />)
    expect(container).toMatchSnapshot()
  })
  it('should display AppList when Application Tab is selected', () => {
    const { getByTestId } = render(<PermissionsTab />)
    expect(getByTestId('AppList')).toBeTruthy()
  })

  it('should display DataList when Data Tab is selected', () => {
    const { getByTestId } = render(<PermissionsTab />)
    const tabs = getByTestId('tabs')
    fireEvent.click(tabs, { event: 'event' })
    expect(getByTestId('DataList')).toBeTruthy()
  })
})
