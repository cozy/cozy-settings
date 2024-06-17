import React, { useState } from 'react'

import { useClient } from 'cozy-client'
import { useBreakpoints } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'
import TextField from 'cozy-ui/transpiled/react/TextField'
import MenuItem from 'cozy-ui/transpiled/react/MenuItem'

import Page from 'components/Page'
import PageTitle from 'components/PageTitle'

const AppearanceView = ({ instance }) => {
  const { isMobile } = useBreakpoints()
  const { t } = useI18n()
  const client = useClient()
  const [value, setValue] = useState(instance?.colorScheme || 'auto')

  const options = [
    {
      value: 'light',
      label: t('AppearanceView.light')
    },
    {
      value: 'dark',
      label: t('AppearanceView.dark')
    },
    {
      value: 'auto',
      label: t('AppearanceView.auto')
    }
  ]

  const handleChange = async ev => {
    setValue(ev.target.value)

    await client.save({
      _rev: instance.meta.rev,
      ...instance,
      attributes: {
        ...instance.attributes,
        colorScheme: ev.target.value
      }
    })
  }

  return (
    <Page narrow>
      <PageTitle className={!isMobile ? 'u-mb-1' : ''}>
        {t('AppearanceView.title')}
      </PageTitle>
      <Typography variant="h5" className="u-mb-half">
        {t('AppearanceView.subtitle')}
      </Typography>
      <TextField
        variant="outlined"
        value={value}
        options={options}
        select
        fullWidth
        onChange={handleChange}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Page>
  )
}

export default AppearanceView
