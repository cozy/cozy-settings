import React from 'react'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import SelectBox from 'cozy-ui/transpiled/react/SelectBox'

import Field from 'components/Field'

export default translate()(props => {
  const { fieldProps, ...restProps } = props
  return (
    <Field {...fieldProps}>
      <SelectBox {...restProps} fullwidth />
    </Field>
  )
})
