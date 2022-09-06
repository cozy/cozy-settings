import withAllLocales from './withAllLocales'
import React from 'react'
import { render } from '@testing-library/react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

describe('withAllLocales', () => {
  it('should provide translations from CozyClient and CozySettings', () => {
    // Given
    let MyComponent = () => {
      const { t } = useI18n()
      return (
        <div>
          <p>{t('Permissions.write')}</p>
          <p>{t('CozyPermissions.Permissions.io.cozy.accounts')}</p>
        </div>
      )
    }
    const MyTranslatedComponent = withAllLocales(MyComponent)

    // When
    const { getByText } = render(<MyTranslatedComponent />)

    // Then
    expect(getByText('Write')).toBeTruthy()
    expect(getByText('Login details')).toBeTruthy()
  })
})
