import React from 'react'

import { isFlagshipApp } from 'cozy-device-helper'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import Select from 'components/Select'
import { useSetLang } from 'hooks/useSetLang'

const LANG_OPTIONS = ['en', 'fr', 'es']

const LanguageSection = props => {
  const { t } = useI18n()
  const { fields, onChange } = props
  const fieldProps = {
    ...fields.locale,
    title: t('ProfileView.locale.title'),
    label: t(`ProfileView.locale.label`)
  }
  const selectedLocale = fields.locale.value
  const fieldName = 'locale'

  // Flagship App side-effect to set the locale
  useSetLang(selectedLocale)

  return (
    <div>
      <Select
        name={fieldName}
        options={LANG_OPTIONS.map(lang => {
          return {
            value: lang,
            label: t(`ProfileView.locale.${lang}`)
          }
        })}
        fieldProps={fieldProps}
        value={{
          value: selectedLocale,
          label: t(`ProfileView.locale.${selectedLocale}`, { _: '' })
        }}
        onChange={sel => onChange(fieldName, sel.value)}
        isSearchable={!isFlagshipApp()}
      />
    </div>
  )
}

export default LanguageSection
