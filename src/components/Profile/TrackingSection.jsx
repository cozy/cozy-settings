import React, { PureComponent } from 'react'

import { translate } from 'cozy-ui/transpiled/react/providers/I18n'

import Input from 'components/Input'

export class TrackingSection extends PureComponent {
  render() {
    const { instance, fields, onChange, t } = this.props
    return (
      <Input
        name="tracking"
        type="checkbox"
        title={t('ProfileView.tracking.title')}
        label={t('ProfileView.tracking.label', {
          version:
            instance && instance.data.attributes.tos
              ? `-${instance.data.attributes.tos}`
              : '-201711'
        })}
        {...fields.tracking}
        onChange={onChange}
      />
    )
  }
}

export default translate()(TrackingSection)
