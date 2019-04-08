import React, { PureComponent } from 'react'

import { translate } from 'cozy-ui/react/I18n'

import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import Select from 'components/Select'

const LANG_OPTIONS = ['en', 'fr', 'es']

export class LanguageSection extends PureComponent {
  render() {
    const { fields, onChange, t } = this.props
    return (
      <div>
        <Select
          name="locale"
          title={t('ProfileView.locale.title')}
          label={t(`ProfileView.locale.label`)}
          options={LANG_OPTIONS.map(lang => {
            return {
              value: lang,
              text: t(`ProfileView.locale.${lang}`)
            }
          })}
          {...fields.locale}
          onChange={onChange}
        />
        <ReactMarkdownWrapper source={t('ProfileView.locale.contrib')} />
      </div>
    )
  }
}

export default translate()(LanguageSection)
