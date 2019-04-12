import React, { PureComponent } from 'react'

import { translate } from 'cozy-ui/react/I18n'

import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import Select from 'components/Select'

const LANG_OPTIONS = ['en', 'fr', 'es']

export class LanguageSection extends PureComponent {
  render() {
    const { fields, onChange, t } = this.props
    const fieldProps = {
      ...fields.locale,
      title: t('ProfileView.locale.title'),
      label: t(`ProfileView.locale.label`)
    }
    const selectedLocale = fields.locale.value
    const fieldName = 'locale'
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
        />
        <ReactMarkdownWrapper source={t('ProfileView.locale.contrib')} />
      </div>
    )
  }
}

export default translate()(LanguageSection)
