import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Empty from 'cozy-ui/transpiled/react/Empty'
import { ButtonLink } from 'cozy-ui/transpiled/react/Button'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import EmptyIcon from 'assets/icons/icon-devices.svg'

export class NoDevicesMessage extends PureComponent {
  render() {
    const { t } = this.props
    return (
      <Empty
        icon={EmptyIcon}
        title={t('Empty.devices.title')}
        text={t('Empty.devices.text')}
      >
        <ButtonLink
          href={t('Empty.devices.link.href')}
          label={t('Empty.devices.link.text')}
        />
      </Empty>
    )
  }
}

NoDevicesMessage.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate()(NoDevicesMessage)
