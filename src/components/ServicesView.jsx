// import tableStyles from '../styles/table'
import viewStyles from '../styles/view.styl'
// import classNames from 'classnames'

import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

// import Loading from './Loading'

const DevicesView = ({ t, f, devices }) => (
  <div>
    <h2 className={viewStyles['set-view-title']}>{t('ServicesView.title')}</h2>
  </div>
)

export default translate()(DevicesView)
